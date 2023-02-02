import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { ErrorMessageNotification } from "./ErrorMessageNotification";

describe(ErrorMessageNotification.name, () => {
    const errorMessage: string = "I am an error.";
    let errorDisplay: HTMLSpanElement;

    beforeEach(() => {
        render(<ErrorMessageNotification message={errorMessage}/>);
        errorDisplay = screen.getByText(errorMessage);
    });
    test("shows error message", () => {
        expect(errorDisplay).toBeInTheDocument();
        expect(errorDisplay.textContent).toBe(errorMessage);
    });
    test("focuses error message after a delay", async () => {
        await waitFor(() => {
            expect(errorDisplay).toHaveFocus();
        });
    });
});

