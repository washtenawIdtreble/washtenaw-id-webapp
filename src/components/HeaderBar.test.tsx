import { HeaderBar } from "./HeaderBar";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe(HeaderBar.name, () => {
    beforeEach(() => {
        render(<HeaderBar/>, { wrapper: HeaderBarTestWrapper });
    });
    test("shows the nav menu within a nav element", () => {
        let nav = screen.getByRole("navigation");
        const navMenu = within(nav).getByTestId("nav-menu");
        expect(navMenu).toBeInTheDocument();
    });
});

const HeaderBarTestWrapper = (props: { children: React.ReactNode }) => {
    return (
        <main>
            <MemoryRouter>
                {props.children}
            </MemoryRouter>
        </main>
    );
};