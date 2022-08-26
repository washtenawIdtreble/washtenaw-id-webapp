import { AccessibilityIssues } from "./AccessibilityIssues";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { rest } from "msw";
import {
    AccessibilityFormData,
    accessibilityIssuesResolver,
} from "../../mock-server/resolvers/accessibility-report-resolver";
import { mockServer } from "../../mock-server/mock-server";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";
import { BASE_URL } from "../../utilities/base-url";
import { stubAccessibilityFormData } from "../../../test/test-factories";

describe(AccessibilityIssues.name, () => {
    const formLabelText = "Report Accessibility Issues";
    let capturedFormData: AccessibilityFormData;
    let user: UserEvent;

    beforeEach(() => {
        user = userEvent.setup();

        mockServer.use(
            rest.post(`${BASE_URL()}/accessibility-issues`, accessibilityIssuesResolver(200, (data: AccessibilityFormData) => {
                capturedFormData = data;
            })),
        );

        render(<AccessibilityIssues/>);
    });

    test("can send the form contents to the server", async () => {
        const form: HTMLFormElement = screen.getByRole("form");
        const nameInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Your Name (optional)" });
        const emailInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Your Email (optional)" });
        const descriptionInput: HTMLTextAreaElement = within(form).getByRole("textbox", { name: "What do you want to tell us? (required)" });
        const submit: HTMLButtonElement = within(form).getByRole("button", { name: "Submit" });

        await user.tab();
        expect(nameInput).toHaveFocus();
        const name = "Linda Cardellini";
        await user.keyboard(name);

        await user.tab();
        expect(emailInput).toHaveFocus();
        const email = "lcardellini@example.com";
        await user.keyboard(email);

        await user.tab();
        expect(descriptionInput).toHaveFocus();
        const description = "There was an input that didn't have a label";
        await user.keyboard(description);

        await user.tab();
        expect(submit).toHaveFocus();

        await user.keyboard("{Enter}");
        expect(capturedFormData).toEqual(stubAccessibilityFormData({ name, email, description }));
    });

    // TODO: Remove as much of these tests as possible
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

        test("a submit button", () => {
            const submit: HTMLButtonElement = within(form).getByRole("button", { name: "Submit" });
            expect(submit).toBeInTheDocument();
        });
    });

});