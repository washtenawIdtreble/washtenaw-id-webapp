import { FormField, FormFieldProps, FormFieldType } from "./FormField";
import { render, screen, waitFor } from "@testing-library/react";
import React, { useCallback, useState } from "react";
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
        const errorMessage = "error message";
        beforeEach(() => {
            render(<FormField id={id} name={name} validator={() => errorMessage} autoComplete={"tel"}/>);
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
            expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
        });
        test("passes autocomplete to the input", () => {
            expect(textBox.autocomplete).toEqual("tel");
        });
        describe("and the field is blurred with an invalid value", () => {
            beforeEach(async () => {
                textBox.focus();
                await user.tab();
            });
            test("error message container is not present", () => {
                expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
            });
        });
    });
    test("allows creating a textarea instead of an input", () => {
        render(<FormField id={id} name={name} inputType={FormFieldType.TEXTAREA}/>);
        expect(screen.getByRole("textbox")).toBeVisible();
    });
    describe("when there is a validation error", () => {
        const invalidValue = "cheese";

        beforeEach(() => {
            const validator = (value: string) => {
                if (value.includes(invalidValue)) {
                    return `Don't say ${invalidValue}`;
                }
                return "";
            };

            render(
                <FormWithField id={id} name={name} validator={validator}/>,
            );
            textBox = screen.getByRole("textbox");
        });

        test(`shows the error message`, async () => {
            await user.type(textBox, invalidValue);
            await user.click(screen.getByRole("button"));

            await waitFor(() => {
                expect(screen.getByText(`Don't say ${invalidValue}`)).toBeInTheDocument();
            });

            await waitFor(() => {
                expect(textBox).toHaveFocus();
            });

            expect(textBox.getAttribute("aria-invalid")).toEqual("true");
            expect(textBox.getAttribute("aria-errormessage")).toEqual(`error-message-container-${id}`);
            expect(textBox.getAttribute("aria-describedby")).toEqual(`error-message-container-${id}`);
        });

        describe("on blur", () => {
            test("removes error message if it has been fixed", async () => {
                // add value and validate to create multiple error messages
                await user.type(textBox, invalidValue);
                await user.click(screen.getByRole("button"));
                await waitFor(() => {
                    expect(textBox).toHaveFocus();
                });

                // change the value in the text box to something with only one error message
                await user.clear(textBox);
                await user.type(textBox, "valid value");

                // error message is still present
                await waitFor(() => {
                    expect(screen.getByText(`Don't say ${invalidValue}`)).toBeVisible();
                });

                // blur the input
                await user.tab();

                // error message is gone
                await waitFor(() => {
                    expect(screen.queryByText(`Don't say ${invalidValue}`)).not.toBeInTheDocument();
                });
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
            <FormField id={props.id} name={props.name} validator={props.validator}/>
            <button onClick={onClick}>SUBMIT</button>
        </FormProvider>
    </>);
};