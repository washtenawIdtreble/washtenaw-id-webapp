import { AccessibilityIssues } from "./AccessibilityIssues";
import { render, screen, within } from "@testing-library/react";
import React from "react";

describe(AccessibilityIssues.name, () => {

    const formLabelText = "Report Accessibility Issues";

    beforeEach(() => {
        render(<AccessibilityIssues/>);
    });

    describe("has a form containing", () => {
        let form: HTMLFormElement;
        beforeEach(() => {
            form = screen.getByRole("form");
        });

        test("an accessible name", () => {
            expect(screen.getByLabelText(formLabelText)).toBe(form);
        });

        test("a page heading", () => {
            const formLabel = within(form).getByRole("heading", { level: 1 });
            expect(formLabel.textContent).toEqual(formLabelText);
        });

        test("a name field", () => {
            const nameInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Your Name (optional)" });
            expect(nameInput.type).toEqual("text");
            expect(nameInput.autocomplete).toEqual("name");
        });

        test("an email field", () => {
            const emailInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Your Email (optional)" });
            expect(emailInput.type).toEqual("text");
            expect(emailInput.autocomplete).toEqual("email");
        });

        test("a textarea to enter their issue", () => {
            const descriptionInput: HTMLTextAreaElement = within(form).getByRole("textbox", { name: "What do you want to tell us? (required)" });
            expect(descriptionInput.type).toEqual("textarea");
        });
    });

});