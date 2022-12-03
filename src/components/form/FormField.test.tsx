import { FormField, FormFieldProps, FormFieldType } from "./FormField";
import { render, screen, waitFor } from "@testing-library/react";
import React, { useCallback, useState } from "react";
import { Validator } from "../../hooks/form-validation/useValidation";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";
import { FormProvider } from "../../contexts/FormContext";
import { Observable } from "../../utilities/observable";

describe(FormField.name, () => {
    const id = "id";
    const name = "name";
    let textBox: HTMLInputElement;
    let user: UserEvent;

    beforeEach(() => {
        user = userEvent.setup();
    });

    describe("when there is no validation error", () => {
        beforeEach(() => {
            render(<FormField id={id} name={name} validators={[]} autocomplete={"tel"}/>);
            textBox = screen.getByRole("textbox");
        });
        test("shows an input", () => {
            expect(textBox).toBeVisible();
        });
        test("passes id to input", () => {
            expect(textBox.id).toEqual(id);
        });
        test("passes name to input", () => {
            expect(textBox.name).toEqual(name);
        });
        test("error message container is not present", () => {
            expect(screen.queryByRole("list")).not.toBeInTheDocument();
        });
        test("passes autocomplete to the input", () => {
            expect(textBox.autocomplete).toEqual("tel");
        });
    });
    test("allows creating a textarea instead of an input", () => {
        render(<FormField id={id} name={name} validators={[]} inputType={FormFieldType.TEXTAREA}/>);
        expect(screen.getByRole("textbox")).toBeVisible();
    });
    describe("when there is a validation error", () => {
        const invalidValue1 = "cheese";
        const invalidValue2 = "eggs";

        beforeEach(() => {
            const makeValidator = (invalidValue: string): Validator => {
                return (value: string) => {
                    if (value.includes(invalidValue)) {
                        return `Don't say ${invalidValue}`;
                    }
                    return "";
                };
            };
            render(
                <FormWithField
                    id={id}
                    name={name}
                    validators={[makeValidator(invalidValue1), makeValidator(invalidValue2)]}/>,
            );
            textBox = screen.getByRole("textbox");
        });

        const errorMessageTestCases = [
            { value: invalidValue1, expectedMessages: [`Don't say ${invalidValue1}`] },
            { value: invalidValue2, expectedMessages: [`Don't say ${invalidValue2}`] },
            {
                value: `${invalidValue1}${invalidValue2}`,
                expectedMessages: [`Don't say ${invalidValue1}`, `Don't say ${invalidValue2}`],
            },
        ];
        errorMessageTestCases.forEach(testCase => {
            test(`shows the error with all error messages - ${testCase.value}`, async () => {
                await user.type(textBox, testCase.value);
                await user.click(screen.getByRole("button"));

                for (const expectedMessage of testCase.expectedMessages) {
                    await waitFor(() => {
                        expect(screen.getByText(expectedMessage)).toBeInTheDocument();
                    });
                }

                await waitFor(() => {
                    expect(textBox).toHaveFocus();
                });

                expect(textBox.getAttribute("aria-invalid")).toEqual("true");
                expect(textBox.getAttribute("aria-errormessage")).toEqual(`error-message-container-${id}`);
                expect(textBox.getAttribute("aria-describedby")).toEqual(`error-message-container-${id}`);
            });
        });
        describe("on blur", () => {
            test("removes error messages that have been fixed", async () => {
                // add value and validate to create multiple error messages
                await user.type(textBox, `${invalidValue1}${invalidValue2}`);
                await user.click(screen.getByRole("button"));
                await waitFor(() => {
                    expect(textBox).toHaveFocus();
                });

                // change the value in the text box to something with only one error message
                await user.clear(textBox);
                await user.type(textBox, invalidValue1);

                // both error messages are still present
                await waitFor(() => {
                    expect(screen.getByText(`Don't say ${invalidValue1}`)).toBeVisible();
                });
                expect(screen.getByText(`Don't say ${invalidValue2}`)).toBeVisible();

                // blur the input
                await user.tab();

                // only one error message remains
                await waitFor(() => {
                    expect(screen.getByText(`Don't say ${invalidValue1}`)).toBeVisible();
                });

                expect(screen.queryByText(`Don't say ${invalidValue2}`)).not.toBeInTheDocument();
            });
        });
    });
});

const FormWithField = (props: FormFieldProps) => {
    const [onSubmit] = useState(new Observable());

    const onClick = useCallback(() => {
        onSubmit.notify();
    }, [onSubmit]);

    return (<>
        <FormProvider onSubmit={onSubmit}>
            <FormField id={props.id} name={props.name} validators={props.validators}/>
            <button onClick={onClick}>SUBMIT</button>
        </FormProvider>
    </>);
};