import { render, screen, waitFor, within } from "@testing-library/react";
import React from "react";
import { rest } from "msw";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Form } from "./Form";
import { AccessibilityFormData } from "../../pages/accessibility-issues/AccessibilityIssues";
import { mockServer } from "../../mock-server/mock-server";
import { BASE_URL } from "../../utilities/base-url";
import { buildPostResolver, ResponseContent } from "../../mock-server/resolvers/post-resolver";
import { FormField } from "./FormField";
import { Validator } from "../../hooks/form-validation/useValidation";
import { RadioButtonGroup, RadioOption } from "./RadioButtonGroup";
import { USER_EVENT_KEYS_FOR_TESTING_ONLY } from "../../../test/user-event-keys";
import { now } from "../../utilities/date-utilities";
import mocked = jest.mocked;

const submitEndpoint = "form-submit-endpoint";
const formLabelText = "Short information about the form";

const successMessage = "Your issue has been reported, thank you!";
const pageIdentifier = "test-page";

jest.mock("../../utilities/date-utilities");

describe(Form.name, () => {
    let capturedFormData: AccessibilityFormData;
    let user: UserEvent;
    let form: HTMLFormElement;
    let liveRegion: HTMLDivElement;
    let resolveRequest: (response: ResponseContent) => void;

    beforeEach(() => {
        user = userEvent.setup();

        const delayPromise = new Promise<ResponseContent>((resolve) => {
            resolveRequest = resolve;
        });

        mockServer.use(
            rest.post(`${BASE_URL()}/${submitEndpoint}`, buildPostResolver<AccessibilityFormData>({
                captor: (requestBody) => capturedFormData = requestBody,
                delayUntil: delayPromise,
            })),
        );
    });

    afterEach(() => {
        window.localStorage.clear();
    });

    describe("before submitting the form", () => {
        let container: any;
        beforeEach(() => {
            ({ container } = render(<FormWithInputs/>));

            form = screen.getByRole("form");
            liveRegion = screen.getByTestId("form-live-region");
        });

        test("has no AxE violations", async () => {
            const page = await axe(container);
            expect(page).toHaveNoViolations();
        });

        test("has an accessible name", () => {
            expect(screen.getByLabelText(formLabelText)).toBe(form);
        });

        test("does not show a success message on load", () => {
            expect(screen.queryByText(successMessage)).not.toBeInTheDocument();
        });

        test("does not show an error message on load", () => {
            expect(screen.queryByText("Error:", { exact: false })).not.toBeInTheDocument();
        });

        test("has an empty live-region on load", () => {
            expect(liveRegion).toHaveAttribute("aria-live", "polite");
            expect(liveRegion.textContent).toBe("");
        });
    });

    describe("when the user submits the form", () => {
        let nameInput: HTMLInputElement;
        let ageInput: HTMLInputElement;
        let submitButton: HTMLButtonElement;
        const name = "Martin Starr";
        const age = "47";
        const color = "yellow";

        describe("with errors", () => {
            const nameErrorMessage = "name is incorrect";
            beforeEach(async () => {
                render(<FormWithInputs validator={() => nameErrorMessage}/>);

                form = screen.getByRole("form");
                liveRegion = screen.getByTestId("form-live-region");

                nameInput = within(form).getByRole("textbox", { name: "Name" });
                ageInput = within(form).getByRole("textbox", { name: "Age" });
                submitButton = within(form).getByRole("button", { name: "Submit" });

                await user.type(nameInput, name);
                await user.type(ageInput, age);

                submitButton.focus();
                await user.keyboard(USER_EVENT_KEYS_FOR_TESTING_ONLY.enter);
            });
            test("the error message is shown", async () => {
                await waitFor(() => {
                    expect(screen.getByText(nameErrorMessage)).toBeVisible();
                });
            });
            test("the invalid field is focused", async () => {
                await waitFor(() => {
                    expect(nameInput).toHaveFocus();
                });
            });
            test("the submit button is NOT disabled", async () => {
                await waitFor(() => {
                    expect(nameInput).toHaveFocus();
                });
                expect(submitButton).not.toBeDisabled();
            });

            test("the live region remains empty", async () => {
                await waitFor(() => {
                    expect(nameInput).toHaveFocus();
                });
                expect(liveRegion.textContent).toEqual("");
            });

            test("the form's data is NOT sent to the server", async () => {
                await waitFor(() => {
                    expect(nameInput).toHaveFocus();
                });
                expect(capturedFormData).toBeUndefined();
            });
        });

        describe("without errors", () => {
            let honeypotContainer: HTMLDivElement;
            let honeypotInput: HTMLInputElement;
            const honeypotValue = "I'm a robot";

            const timeFormWasRendered = 42892453216246;
            const timeFormWasSubmitted = 42892453641411;

            beforeEach(async () => {
                mocked(now)
                    .mockName("now")
                    .mockReturnValueOnce(timeFormWasRendered)
                    .mockReturnValueOnce(timeFormWasSubmitted);
                render(<FormWithInputs/>);

                form = screen.getByRole("form");
                liveRegion = screen.getByTestId("form-live-region");

                nameInput = within(form).getByRole("textbox", { name: "Name" });
                ageInput = within(form).getByRole("textbox", { name: "Age" });
                honeypotContainer = within(form).getByTestId("honeypot");
                honeypotInput = within(honeypotContainer).getByRole("textbox", { name: "Robot Input" });
                const radioButton: HTMLInputElement = within(form).getByRole("radio", { name: color });
                submitButton = within(form).getByRole("button", { name: "Submit" });

                await user.type(nameInput, name);
                await user.type(ageInput, age);
                await user.click(radioButton);
                honeypotInput.value = honeypotValue;

                submitButton.focus();
                await user.keyboard(USER_EVENT_KEYS_FOR_TESTING_ONLY.enter);
            });

            test("has a hidden honeypot input with a description in case someone finds it", () => {
                expect(honeypotContainer.className).toContain("display-none");

                let honeypotDescriptionId = "honeypot-description";
                expect(honeypotInput.getAttribute("aria-describedby")).toEqual(honeypotDescriptionId);

                const honeypotDescription = within(honeypotContainer).getByText("This field is a trap for robots to prevent spam. Please don't fill it out.");
                expect(honeypotDescription.id).toEqual(honeypotDescriptionId);
            });

            test("the submit button is aria-disabled", async () => {
                await waitFor(() => {
                    expect(submitButton.className).toContain("disabled-form-submit");
                });
            });

            test("the submit button is focused while submitting", async () => {
                await waitFor(() => {
                    expect(submitButton.className).toContain("disabled-form-submit");
                });
                expect(submitButton).toHaveFocus();
            });

            test("an announcement appears in the live region and disappears after a timeout", async () => {
                await waitFor(() => {
                    expect(liveRegion.textContent).toEqual("submitting");
                });

                await waitFor(() => {
                    expect(liveRegion.textContent).toEqual("");
                });
            });

            test("the form's data is sent to the server", async () => {
                expect(capturedFormData).toEqual({
                    name,
                    age,
                    color,
                    honeypotValue,
                    timeToFillForm: `${timeFormWasSubmitted - timeFormWasRendered} milliseconds`
                });
            });

            describe("when form submission succeeds", () => {
                let successElement: HTMLSpanElement;
                beforeEach(async () => {
                    resolveRequest({ statusCode: 200 });
                    await waitFor(() => {
                        successElement = screen.getByText(successMessage);
                    });
                });

                test("the button is enabled", async () => {
                    expect(submitButton.className).not.toContain("disabled-form-submit");
                });

                test("the form is cleared", async () => {
                    expect(nameInput.value).toBe("");
                    expect(ageInput.value).toBe("");
                });

                test("the local storage for fields is cleared", async () => {
                    expect(window.localStorage.getItem(`${pageIdentifier}-name`)).toBe(null);
                    expect(window.localStorage.getItem(`${pageIdentifier}-age`)).toBe(null);
                });

                test("the success message is focused", async () => {
                    await waitFor(() => {
                        expect(successElement).toHaveFocus();
                    });
                });

                describe("when the user moves focus from the success message", () => {
                    beforeEach(async () => {
                        await waitFor(() => {
                            expect(successElement).toHaveFocus();
                        });
                        await user.tab();
                    });

                    test("the success message disappears", () => {
                        expect(successElement).not.toBeInTheDocument();
                    });

                    test("the user's focus is at the top of the form", () => {
                        expect(nameInput).toHaveFocus();
                    });
                });
            });

            describe("when form submission fails", () => {
                let errorMessage: HTMLSpanElement;
                const errorMessageText = "Your request was terrible!";
                beforeEach(async () => {
                    resolveRequest({ statusCode: 400, body: { "error": errorMessageText } });
                    await waitFor(() => {
                        errorMessage = screen.getByText(errorMessageText);
                    });
                });

                test("the button is enabled", async () => {
                    expect(submitButton).not.toBeDisabled();
                });

                test("the form is NOT cleared", async () => {
                    expect(nameInput.value).toBe(name);
                    expect(ageInput.value).toBe(age);
                });

                test("the error message is focused", async () => {
                    await waitFor(() => {
                        expect(errorMessage).toHaveFocus();
                    });
                });

                describe("when the user moves focus from the error message", () => {
                    beforeEach(async () => {
                        await waitFor(() => {
                            expect(errorMessage).toHaveFocus();
                        });
                        await user.tab();
                    });

                    test("the error message disappears", () => {
                        expect(errorMessage).not.toBeInTheDocument();
                    });

                    test("the user's focus is at the top of the form", () => {
                        expect(nameInput).toHaveFocus();
                    });
                });
            });
        });
    });
});

const FormWithInputs = (props: { validator?: Validator }) => {
    const radioOptions: RadioOption[] = [{ label: "yellow" }];
    return (
        <>
            <span id="form-label">{formLabelText}</span>
            <Form successMessage={successMessage} ariaLabelledBy={"form-label"} submitEndpoint={submitEndpoint}>
                <label htmlFor={"name"}>Name</label>
                <FormField id={"name"} name={"name"} validator={props.validator} pageIdentifier={pageIdentifier}/>
                <label htmlFor={"age"}>Age</label>
                <FormField id={"age"} name={"age"} pageIdentifier={pageIdentifier}/>
                <RadioButtonGroup legend={"What's your favorite color?"} groupName={"color"} options={radioOptions}
                                  pageIdentifier={pageIdentifier}/>
            </Form>
        </>
    );
};
