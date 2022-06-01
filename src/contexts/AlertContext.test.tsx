import React, { useContext } from "react";
import { AlertContext, AlertProvider } from "./AlertContext";
import { fireEvent, render, screen } from "@testing-library/react";

const buttonText = "Show Alert";
const alertHeading = "ICE CRASH";
const alertText = "The glacier came alive as the climbers hiked closer.";

describe("Alert Context", () => {
    beforeEach(() => {
        render(
            <AlertProvider>
                <StubComponent/>
            </AlertProvider>,
        );
    });
    describe("when alert dialog is triggered", () => {
        beforeEach(async () => {
            const showAlertButton = screen.getByRole("button", { name: buttonText });
            fireEvent.click(showAlertButton);
        });
        test("should show an alert with the provided heading", () => {
            expect(screen.getByRole("heading", { level: 1 }).textContent).toEqual(alertHeading);
        });
        test("should show an alert with the provided message", () => {
            expect(screen.getByText(alertText)).toBeVisible();
        });
        describe("when dismissed", () => {
            beforeEach(() => {
                const okButton = screen.getByRole("button", { name: "OK" });
                fireEvent.click(okButton);
            });
            test("should close the alert dialog", () => {
                expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
                expect(screen.queryByText(alertText)).not.toBeInTheDocument();
            });
        });
    });
});

const StubComponent = () => {
    const { showAlert } = useContext(AlertContext);
    const onClick = () => {
        showAlert({ heading: alertHeading, message: alertText });
    };
    return (
        <button onClick={onClick}>{buttonText}</button>
    );
};