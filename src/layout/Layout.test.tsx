import { Layout } from "./Layout";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe(Layout.name, () => {
    beforeEach(() => {
        render(<Layout/>, { wrapper: MemoryRouter });
    });
    test("should have a link to skip to the main landmark", () => {
        const skipNav: HTMLLinkElement = screen.getByRole("link", { name: "Skip to content" });
        const main = screen.getByRole("main");

        expect(skipNav.href).toContain("#main-content");
        expect(main.id).toEqual("main-content");
    });
    test("skip-nav link should be the first focusable element", () => {
        const skipNav = screen.getByRole("link", { name: "Skip to content" });

        userEvent.tab();
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