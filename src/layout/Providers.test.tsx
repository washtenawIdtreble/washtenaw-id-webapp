import { Providers } from "./Providers";
import { render, screen, waitFor, within } from "@testing-library/react";
import React, { useContext } from "react";
import { AlertContext } from "../contexts/AlertContext";
import { mockServer } from "../mock-server/mock-server";
import { rest } from "msw";
import { errorCategoriesResolver } from "../mock-server/categories-resolver";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

const ALERT_HEADING = "Alert Heading";
const ALERT_TEXT = "Something went wrong";
const ALERT_BUTTON_TEXT = "Trigger Alert";

describe(Providers.name, () => {
    let user: UserEvent;
    beforeEach(() => {
        user = userEvent.setup();
    });
    test("should provide the alert context and allow children to show alert dialogs", async () => {
        const errorMessage = "Doesn't matter!";
        mockServer.use(
            rest.get("categories", errorCategoriesResolver(500, errorMessage)),
        );

        render(<ProvidersConsumer/>, { wrapper: Providers });

        await user.click(screen.getByRole("button", { name: ALERT_BUTTON_TEXT }));

        let dialog: HTMLElement;
        await waitFor(() => {
            dialog = screen.getByRole("dialog");
        });

        const errorDialogHeading = within(dialog!).getByRole("heading", {
            level: 1,
            name: ALERT_HEADING,
        });
        expect(errorDialogHeading).toBeInTheDocument();

        expect(screen.getByText(ALERT_TEXT)).toBeInTheDocument();
    });
});

const ProvidersConsumer = () => {
    const { showAlert } = useContext(AlertContext);
    const onClick = () => {
        showAlert({ heading: ALERT_HEADING, message: ALERT_TEXT });
    };

    return (<>
            <button onClick={onClick}>{ALERT_BUTTON_TEXT}</button>
        </>
    );
};