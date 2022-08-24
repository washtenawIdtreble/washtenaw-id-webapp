import { RouterOutlet } from "./RouterOutlet";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Link, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { mockServer } from "../mock-server/mock-server";
import { rest } from "msw";
import { noOpCategoriesResolver } from "../mock-server/categories-resolver";

describe(RouterOutlet.name, () => {
    let user: UserEvent;
    beforeEach(() => {
        user = userEvent.setup();
        mockServer.use(
            rest.get("categories", noOpCategoriesResolver()),
        );
        render(
            <TestingRouterWithLinks/>,
        );
    });

    test("shows the categories page by default", () => {
        expect(screen.getByTestId("categories-page")).toBeInTheDocument();
    });

    describe("shows the correct page for each route - ", () => {
        test("businesses page", async () => {
            await user.click(screen.getByText("Businesses"));
            await waitFor(() => {
                expect(screen.getByText("This is the businesses page")).toBeInTheDocument();
            });
        });

        test("accessibility issues page", async () => {
            await user.click(screen.getByText("Accessibility Issues"));
            await waitFor(() => {
                expect(screen.getByText("Report Accessibility Issues")).toBeInTheDocument();
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
});