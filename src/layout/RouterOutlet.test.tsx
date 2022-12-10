import { RouterOutlet } from "./RouterOutlet";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Link, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

describe(RouterOutlet.name, () => {
    let user: UserEvent;
    beforeEach(() => {
        user = userEvent.setup();
        render(
            <TestingRouterWithLinks/>,
        );
    });

    test("shows the categories page by default", async () => {
        expect(screen.getByTestId("categories-page")).toBeInTheDocument();
    });

    describe("shows the correct page for each route - ", () => {
        beforeEach(async () => {
            await waitFor(() => {
                screen.getByText("Banks"); // wait for API request to resolve
            });
        });
        test("businesses page", async () => {
            await user.click(screen.getByText("Businesses"));
            await waitFor(() => {
                expect(screen.getByRole("heading", {
                    level: 1,
                    name: "Businesses that accept the ID",
                })).toBeInTheDocument();
            });
            await waitFor(() => {
                screen.getAllByRole("heading", { level: 2 }); // wait for API request to resolve
            });
        });

        test("accessibility issues page", async () => {
            await user.click(screen.getByText("Accessibility Issues"));
            await waitFor(() => {
                expect(screen.getByText("Report Accessibility Issues")).toBeInTheDocument();
            });
        });
    });
});

const TestingRouterWithLinks = () => {
    return (
        <MemoryRouter initialEntries={["/"]}>
            <RouterOutlet/>
            <Link to={"/businesses"}>Businesses</Link>
            <Link to={"/accessibility-issues"}>Accessibility Issues</Link>
        </MemoryRouter>
    );
};
