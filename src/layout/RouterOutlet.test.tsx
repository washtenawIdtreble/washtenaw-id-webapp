import { RouterOutlet } from "./RouterOutlet";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { Link, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { GET } from "../utilities/fetch";
import { FAKE_FETCH_RESULT } from "../../test/test-factories";
import mocked = jest.mocked;

jest.mock("../utilities/fetch");

describe(RouterOutlet.name, () => {
    let user: UserEvent;
    beforeEach(() => {
        user = userEvent.setup();
        mocked(GET).mockReturnValue(FAKE_FETCH_RESULT);
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