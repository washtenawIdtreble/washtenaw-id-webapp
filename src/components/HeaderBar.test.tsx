import { HeaderBar } from "./HeaderBar";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ChildrenProps } from "../utilities/children-props";

describe(HeaderBar.name, () => {
    test("shows the navigation", () => {
        render(<HeaderBar/>, { wrapper: HeaderBarTestWrapper });
        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
});

const HeaderBarTestWrapper = ({ children }: ChildrenProps) => {
    return (
        <main>
            <MemoryRouter>
                {children}
            </MemoryRouter>
        </main>
    );
};