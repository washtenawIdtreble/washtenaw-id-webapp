import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import App from "./App";
import { mockServer } from "../mock-server/mock-server";
import { rest } from "msw";
import { errorCategoriesResolver } from "../mock-server/categories-resolver";

describe(App.name, () => {
    test("renders the app layout", () => {
        render(<App/>);
        const layout = screen.getByTestId("app-layout");
        expect(layout).toBeInTheDocument();
    });
    test("should provide the alert context and allow children to show alert dialogs", async () => {
        const errorMessage = "Doesn't matter!";
        mockServer.use(
            rest.get("categories", errorCategoriesResolver(500, errorMessage)),
        );

        render(<App/>);

        await waitFor(() => {
            const errorDialogHeading = within(screen.getByRole("dialog")).getByRole("heading", {
                level: 1,
                name: "Error",
            });
            expect(errorDialogHeading).toBeInTheDocument();
        });
    });
});