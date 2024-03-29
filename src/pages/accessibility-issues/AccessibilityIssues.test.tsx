import {
    ACCESSIBILITY_PAGE_HEADING,
    ACCESSIBILITY_PAGE_IDENTIFIER,
    AccessibilityFormData,
    AccessibilityIssues
} from "./AccessibilityIssues";
import { render, screen, waitFor, within } from "@testing-library/react";
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
import { INVALID_EMAIL_MESSAGE } from "../../hooks/form-validation/validateEmail";
import { INVALID_PHONE_MESSAGE } from "../../hooks/form-validation/validatePhone";
import { MISSING_REQUIRED_MESSAGE } from "../../hooks/form-validation/validateRequired";
import { Container } from "react-dom";
import { USER_EVENT_KEYS_FOR_TESTING_ONLY } from "../../../test/user-event-keys";
import { HoneypotFormData } from "../../components/form/Form";

describe(`${AccessibilityIssues.name} form`, () => {
    const successMessage = "Your issue has been reported, thank you!";
    let capturedFormData: AccessibilityFormData & HoneypotFormData;
    let user: UserEvent;
    let form: HTMLFormElement;
    let container: Container;

    beforeEach(() => {
        user = userEvent.setup();
        capturedFormData = null as unknown as AccessibilityFormData & HoneypotFormData;

        const resolver = buildPostResolver<AccessibilityFormData & HoneypotFormData>({
            captor: (requestBody) => capturedFormData = requestBody,
        });

        mockServer.use(rest.post(`${BASE_URL()}/${SERVER_ENDPOINTS.ACCESSIBILITY_ISSUES}`, resolver));

        ({ container } = render(<AccessibilityIssues/>));

        form = screen.getByTestId("form-component");
    });

    test("has no AxE violations", async () => {
        const page = await axe(container as Element);
        expect(page).toHaveNoViolations();
    });

    test("exports its page heading", () => {
        expect(ACCESSIBILITY_PAGE_HEADING).toBe("Report Accessibility Issues");
    });

    test("has an h1 that can be focused programmatically", () => {
        const h1 = screen.getByRole("heading", { level: 1, name: ACCESSIBILITY_PAGE_HEADING });
        expect(h1).toBeVisible();
        expect(h1.hasAttribute("tabindex")).toBe(true);
        expect(h1.tabIndex).toBe(-1);
    });

    test("labels the form with the page heading text", () => {
        expect(screen.getByLabelText(ACCESSIBILITY_PAGE_HEADING)).toBe(form);
    });

    test("saves to local storage with correct key", async () => {
        const nameInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Your Name (optional)" });
        const input: string = "Seth";
        await user.type(nameInput, input);

        expect(window.localStorage.getItem(`${ACCESSIBILITY_PAGE_IDENTIFIER}-name`)).toEqual(input);
    });

    describe("when the form data is valid", () => {
        test("sends form contents to the server", async () => {
            const nameInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Your Name (optional)" });
            const emailInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Your email (optional)" });
            const phoneInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Your phone number (optional)" });
            const commentsInput: HTMLTextAreaElement = within(form).getByRole("textbox", { name: "Questions/Comments (required)" });
            const submit: HTMLButtonElement = within(form).getByRole("button", { name: "Submit" });

            await user.tab();
            expect(commentsInput).toHaveFocus();
            const comments = "There was an input that didn't have a label";
            await user.keyboard(comments);

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
            expect(submit).toHaveFocus();

            await user.keyboard(USER_EVENT_KEYS_FOR_TESTING_ONLY.enter);

            const { honeypotValue, timeToFillForm, ...userInputtedFormData } = capturedFormData;

            expect(userInputtedFormData).toEqual(stubAccessibilityFormData({ name, email, phone, comments }));

            await waitFor(() => {
                expect(screen.getByText(successMessage)).toBeInTheDocument();
            });
        });
    });

    describe("when the form data is invalid", () => {
        let emailInput: HTMLInputElement;
        let phoneInput: HTMLInputElement;
        let commentsInput: HTMLTextAreaElement;
        let submit: HTMLButtonElement;
        beforeEach(async () => {
            emailInput = within(form).getByRole("textbox", { name: "Your email (optional)" });
            phoneInput = within(form).getByRole("textbox", { name: "Your phone number (optional)" });
            commentsInput = within(form).getByRole("textbox", { name: "Questions/Comments (required)" });
            submit = within(form).getByRole("button", { name: "Submit" });

            await user.type(commentsInput, "non-empty value");
        });
        test("shows error message for required comments", async () => {
            await user.clear(commentsInput);
            await user.click(submit);
            await waitFor(() => {
                expect(screen.getByText(MISSING_REQUIRED_MESSAGE)).toBeVisible();
            });
        });
        test("shows error message for email", async () => {
            await user.type(emailInput, "invalid@email");
            await user.click(submit);
            await waitFor(() => {
                expect(screen.getByText(INVALID_EMAIL_MESSAGE)).toBeVisible();
            });
        });
        test("shows error message for phone number", async () => {
            await user.type(phoneInput, "1");
            await user.click(submit);
            await waitFor(() => {
                expect(screen.getByText(INVALID_PHONE_MESSAGE)).toBeVisible();
            });
        });
        test("doesn't submit the form", async () => {
            await user.clear(commentsInput);
            await user.click(submit);
            expect(capturedFormData).toBeNull();
        });
    });
});
