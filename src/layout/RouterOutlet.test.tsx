import { RouterOutlet } from "./RouterOutlet";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Link, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe(RouterOutlet.name, () => {
    beforeEach(() => {
        render(
            <TestingRouterWithLinks/>,
        );
    });

    test("shows the categories page by default", () => {
        expect(screen.getByTestId("categories-page")).toBeInTheDocument();
    });

    test("shows the correct page for each route", async () => {
        userEvent.click(screen.getByText("Businesses"));
        await waitFor(() => {
            expect(screen.getByText("This is the businesses page")).toBeInTheDocument();
        });
    });
});

const TestingRouterWithLinks = () => {
    return (
        <MemoryRouter initialEntries={["/"]}>
            <RouterOutlet/>
            <Link to={"/businesses"}>Businesses</Link>
        </MemoryRouter>
    );
};