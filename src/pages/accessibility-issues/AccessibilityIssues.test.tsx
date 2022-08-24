import { AccessibilityFormData, AccessibilityIssues } from "./AccessibilityIssues";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { rest } from "msw";
import { mockServer } from "../../mock-server/mock-server";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";
import { BASE_URL } from "../../utilities/base-url";
import { stubAccessibilityFormData } from "../../../test/test-factories";
import { axe } from "jest-axe";
import { SERVER_ENDPOINTS } from "../../utilities/server-endpoints";
import { buildPostResolver } from "../../mock-server/resolvers/post-resolver";

describe(`${AccessibilityIssues.name} form`, () => {
    const formLabelText = "Report Accessibility Issues";
    let capturedFormData: AccessibilityFormData;
    let user: UserEvent;
    let form: HTMLFormElement;
    let container: any;

    beforeEach(() => {
        user = userEvent.setup();

        const resolver = buildPostResolver<AccessibilityFormData>({
            captor: (requestBody) => capturedFormData = requestBody,
        });

        mockServer.use(rest.post(`${BASE_URL()}/${SERVER_ENDPOINTS.ACCESSIBILITY_ISSUES}`, resolver));

        ({ container } = render(<AccessibilityIssues/>));

        form = screen.getByTestId("form-component");
    });

    test("has no AxE violations", async () => {
        const page = await axe(container);
        expect(page).toHaveNoViolations();
    });

    test("has a page heading", () => {
        const pageHeading = screen.getByRole("heading", { level: 1 });
        expect(pageHeading.textContent).toEqual(formLabelText);
    });

    test("labels the form with the page heading text", () => {
        expect(screen.getByLabelText(formLabelText)).toBe(form);
    });

    test("sends form contents to the server", async () => {
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