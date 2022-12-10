import { Layout } from "./Layout";
import { render, screen, waitFor, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

describe(Layout.name, () => {
    let user: UserEvent;
    beforeEach(() => {
        user = userEvent.setup();
        render(<Layout/>, { wrapper: MemoryRouter });
    });
    afterEach(async () => {
        await waitFor(() => {
            screen.getByText("Banks"); // Wait for API call on Categories page to resolve
        });
    });
    test("should have a link to skip to the main landmark", () => {
        const skipNav: HTMLLinkElement = screen.getByRole("link", { name: "Skip to content" });
        const main = screen.getByRole("main");

        expect(skipNav.href).toContain("#main-content");
        expect(main.id).toEqual("main-content");
    });
    test("skip-nav link should be the first focusable element", async () => {
        const skipNav = screen.getByRole("link", { name: "Skip to content" });

        await user.tab();
        expect(skipNav).toHaveFocus();
    });
    test("main content should be focusable for Safari so skip nav link works", () => {
        const main = screen.getByRole("main");
        expect(main.tabIndex).toEqual(-1);
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