import { AccessibilityFormData, AccessibilityIssues } from "./AccessibilityIssues";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { rest } from "msw";
import { accessibilityIssuesResolver } from "../../mock-server/resolvers/accessibility-report-resolver";
import { mockServer } from "../../mock-server/mock-server";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";
import { BASE_URL } from "../../utilities/base-url";
import { stubAccessibilityFormData } from "../../../test/test-factories";
import { axe } from "jest-axe";

describe(`${AccessibilityIssues.name} form`, () => {
    const formLabelText = "Report Accessibility Issues";
    let capturedFormData: AccessibilityFormData;
    let user: UserEvent;
    let form: HTMLFormElement;
    let container: any;

    beforeEach(() => {
        user = userEvent.setup();

        mockServer.use(
            rest.post(`${BASE_URL()}/accessibility-issues`, accessibilityIssuesResolver(200, (data: AccessibilityFormData) => {
                capturedFormData = data;
            })),
        );

        ({ container } = render(<AccessibilityIssues/>));

        form = screen.getByRole("form");
    });

    test("has no AxE violations", async () => {
        const page = await axe(container);
        expect(page).toHaveNoViolations();
    });

    test("has an accessible name", () => {
        expect(screen.getByLabelText(formLabelText)).toBe(form);
    });

    test("has a page heading", () => {
        const formLabel = within(form).getByRole("heading", { level: 1 });
        expect(formLabel.textContent).toEqual(formLabelText);
    });

    test("can send the form contents to the server", async () => {
        const nameInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Your Name (optional)" });
        const emailInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Your email (optional)" });
        const phoneInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Your phone number (optional)" });
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
        expect(phoneInput).toHaveFocus();
        const phone = "9999999999";
        await user.keyboard(phone);

        await user.tab();
        expect(descriptionInput).toHaveFocus();
        const description = "There was an input that didn't have a label";
        await user.keyboard(description);

        await user.tab();
        expect(submit).toHaveFocus();

        await user.keyboard("{Enter}");
        expect(capturedFormData).toEqual(stubAccessibilityFormData({ name, email, phone, description }));
    });
});