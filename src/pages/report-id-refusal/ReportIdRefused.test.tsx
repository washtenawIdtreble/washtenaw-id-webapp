import { render, screen, waitFor, within } from "@testing-library/react";
import React from "react";
import { rest } from "msw";
import { mockServer } from "../../mock-server/mock-server";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";
import { BASE_URL } from "../../utilities/base-url";
import { stubRefusedIdData } from "../../../test/test-factories";
import { axe } from "jest-axe";
import { SERVER_ENDPOINTS } from "../../utilities/server-endpoints";
import { buildPostResolver } from "../../mock-server/resolvers/post-resolver";
import { INVALID_EMAIL_MESSAGE } from "../../hooks/form-validation/validateEmail";
import { INVALID_PHONE_MESSAGE } from "../../hooks/form-validation/validatePhone";
import { MISSING_REQUIRED_MESSAGE } from "../../hooks/form-validation/validateRequired";
import { Container } from "react-dom";
import {
    ID_REFUSED_PAGE_HEADING,
    ID_REFUSED_PAGE_IDENTIFIER,
    IdRefusedFormData,
    ReportIdRefused
} from "./ReportIdRefused";

describe(`${ReportIdRefused.name} form`, () => {
    const formLabelText = "Report Refusal of ID";
    const successMessage = "Your message has been sent, thank you!";
    let capturedFormData: IdRefusedFormData;
    let user: UserEvent;
    let form: HTMLFormElement;
    let container: Container;

    beforeEach(() => {
        user = userEvent.setup();
        capturedFormData = null as unknown as IdRefusedFormData;

        const resolver = buildPostResolver<IdRefusedFormData>({
            captor: (requestBody) => capturedFormData = requestBody,
        });

        mockServer.use(rest.post(`${BASE_URL()}/${SERVER_ENDPOINTS.ID_REFUSED}`, resolver));

        ({ container } = render(<ReportIdRefused/>));

        form = screen.getByTestId("form-component");
    });

    test("has no AxE violations", async () => {
        const page = await axe(container as Element);
        expect(page).toHaveNoViolations();
    });

    test("exports its page heading", () => {
        expect(ID_REFUSED_PAGE_HEADING).toBe("Report Refusal of ID");
    });

    test("has an h1 that can be focused programmatically", () => {
        const h1 = screen.getByRole("heading", { level: 1, name: ID_REFUSED_PAGE_HEADING.toLocaleLowerCase() });
        expect(h1).toBeVisible();
        expect(h1.hasAttribute("tabindex")).toBe(true);
        expect(h1.tabIndex).toBe(-1);
    });

    test("labels the form with the page heading text", () => {
        expect(screen.getByLabelText(formLabelText)).toBe(form);
    });
    
    describe("when the form data is valid", () => {
        test("stores values in local storage and sends form contents to the server", async () => {
            const nameInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Your Name (optional)" });
            const emailInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Your email (optional)" });
            const phoneInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Your phone number (optional)" });

            const businessNameInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Name of Business (required)" });
            const businessStreetInput: HTMLInputElement = within(form).getByRole("textbox", { name: "What street is the business on? (required)" });
            const businessCityInput: HTMLInputElement = within(form).getByRole("textbox", { name: "What city is the business in? (required)" });

            const whenRefusedInput: HTMLInputElement = within(form).getByRole("textbox", { name: "When did this happen? (day and time) (optional)" });

            // const ageInput: HTMLInputElement = within(form).getByRole("radio", { name: "Your age (optional)" });
            const ageInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Your age (optional)" });

            const descriptionInput: HTMLTextAreaElement = within(form).getByRole("textbox", { name: "What do you want to tell us? (required)" });

            const submit: HTMLButtonElement = within(form).getByRole("button", { name: "Submit" });

            await user.tab();
            expect(nameInput).toHaveFocus();
            const name = "Linda Cardellini";
            await user.keyboard(name);
            expect(window.localStorage.getItem(`${ID_REFUSED_PAGE_IDENTIFIER}-name`)).toEqual(name);

            await user.tab();
            expect(emailInput).toHaveFocus();
            const email = "lcardellini@example.com";
            await user.keyboard(email);
            expect(window.localStorage.getItem(`${ID_REFUSED_PAGE_IDENTIFIER}-email`)).toEqual(email);

            await user.tab();
            expect(phoneInput).toHaveFocus();
            const phone = "9999999999";
            await user.keyboard(phone);
            expect(window.localStorage.getItem(`${ID_REFUSED_PAGE_IDENTIFIER}-phone`)).toEqual(phone);

            await user.tab();
            expect(businessNameInput).toHaveFocus();
            const businessName = "The Store at Five Corners";
            await user.keyboard(businessName);
            expect(window.localStorage.getItem(`${ID_REFUSED_PAGE_IDENTIFIER}-business-name`)).toEqual(businessName);

            await user.tab();
            expect(businessStreetInput).toHaveFocus();
            const businessStreet = "Rte. 7";
            await user.keyboard(businessStreet);
            expect(window.localStorage.getItem(`${ID_REFUSED_PAGE_IDENTIFIER}-business-street`)).toEqual(businessStreet);

            await user.tab();
            expect(businessCityInput).toHaveFocus();
            const businessCity = "Williamstown";
            await user.keyboard(businessCity);
            expect(window.localStorage.getItem(`${ID_REFUSED_PAGE_IDENTIFIER}-business-city`)).toEqual(businessCity);

            await user.tab();
            expect(whenRefusedInput).toHaveFocus();
            const whenRefused = "Yesterday";
            await user.keyboard(whenRefused);
            expect(window.localStorage.getItem(`${ID_REFUSED_PAGE_IDENTIFIER}-when-refused`)).toEqual(whenRefused);

            await user.tab();
            expect(ageInput).toHaveFocus();
            expect(window.localStorage.getItem(`${ID_REFUSED_PAGE_IDENTIFIER}-age`)).toBeNull();

            await user.tab();
            expect(descriptionInput).toHaveFocus();
            const description = "There was an input that didn't have a label";
            await user.keyboard(description);
            expect(window.localStorage.getItem(`${ID_REFUSED_PAGE_IDENTIFIER}-description`)).toEqual(description);

            await user.tab();
            expect(submit).toHaveFocus();

            await user.keyboard("{Enter}");

            expect(capturedFormData).toEqual(stubRefusedIdData({
                name,
                email,
                phone,
                description,
                businessName,
                businessStreet,
                businessCity,
                whenRefused
            }));

            await waitFor(() => {
                expect(screen.getByText(successMessage)).toBeInTheDocument();
            });
        });
    });

    describe("when the form data is invalid", () => {
        let emailInput: HTMLInputElement;
        let phoneInput: HTMLInputElement;
        let descriptionInput: HTMLTextAreaElement;
        let submit: HTMLButtonElement;
        beforeEach(async () => {
            emailInput = within(form).getByRole("textbox", { name: "Your email (optional)" });
            phoneInput = within(form).getByRole("textbox", { name: "Your phone number (optional)" });
            descriptionInput = within(form).getByRole("textbox", { name: "What do you want to tell us? (required)" });
            submit = within(form).getByRole("button", { name: "Submit" });

            await user.type(descriptionInput, "non-empty value");
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
        test("shows error message for required description", async () => {
            await user.clear(descriptionInput);
            await user.click(submit);
            await waitFor(() => {
                expect(screen.getByText(MISSING_REQUIRED_MESSAGE)).toBeVisible();
            });
        });
        test("doesn't submit the form", async () => {
            await user.clear(descriptionInput);
            await user.click(submit);
            expect(capturedFormData).toBeNull();
        });
    });
});
