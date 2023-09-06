import { Layout } from "./Layout";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { DocumentStateContext } from "../contexts/DocumentStateContext";
import { MAIN_HEADING_ID } from "../components/MainHeading";

describe(Layout.name, () => {
    let user: UserEvent;
    beforeEach(() => {
        user = userEvent.setup();
        render(<TestingLayout/>);
    });
    test("should have a link to skip to the main landmark", () => {
        const skipNav: HTMLLinkElement = screen.getByRole("link", { name: "Skip to content" });

        expect(skipNav.href).toContain(`#${MAIN_HEADING_ID}`);
    });
    test("skip-nav link should be the first focusable element", async () => {
        const skipNav = screen.getByRole("link", { name: "Skip to content" });

        await user.tab();
        expect(skipNav).toHaveFocus();
    });
    test("should render the header bar component in the header", () => {
        const header = screen.getByRole("banner");
        const headerBar = within(header).getByTestId("header-bar");
        expect(headerBar).toBeInTheDocument();
    });
    test("should render the router outlet within the main element", () => {
        let main = screen.getByRole("main");
        const routerOutlet = within(main).getByTestId("router-outlet");
        expect(routerOutlet).toBeInTheDocument();
    });
});

const TestingLayout = () => {
    return (
        <MemoryRouter>
            <DocumentStateContext.Provider value={{ documentIsNew: true, documentHasBeenLoaded: () => {} }}>
                <Layout/>
            </DocumentStateContext.Provider>
        </MemoryRouter>
    );
};
