import { Layout } from "./Layout";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe(Layout.name, () => {
    beforeEach(() => {
        render(<Layout/>, { wrapper: MemoryRouter });
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