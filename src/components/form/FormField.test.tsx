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
    const pageIdentifier = "my-page";
    let textBox: HTMLInputElement;
    let user: UserEvent;

    beforeEach(() => {
        user = userEvent.setup();
    });

    afterEach(() => {
        window.localStorage.clear();
    });

    describe("under normal circumstances - input", () => {
        const errorMessage = "error message";
        beforeEach(() => {
            render(<FormField id={id} name={name} validator={() => errorMessage} autoComplete={"tel"} pageIdentifier={pageIdentifier}/>);
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
        test("writes to local storage when input changes", async() => {
            const typedInValue = "AB";
            await user.type(textBox, typedInValue);

            expect(window.localStorage.getItem(`${pageIdentifier}-${id}`)).toEqual(typedInValue);

            await user.type(textBox, "C");

            expect(window.localStorage.getItem(`${pageIdentifier}-${id}`)).toEqual("ABC");
        });
        describe("when the field is blurred with an invalid value", () => {
            beforeEach(async () => {
                textBox.focus();
                await user.tab();
            });
            test("error message container is not present", () => {
                expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
            });
        });
    });

    describe("under normal circumstances - textarea", () => {
        const errorMessage = "error message";
        beforeEach(() => {
            render(<FormField id={id} name={name} validator={() => errorMessage} inputType={FormFieldType.TEXTAREA} autoComplete={"tel"} pageIdentifier={pageIdentifier}/>);
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
        test("writes to local storage when input changes", async() => {
            const typedInValue = "AB";
            await user.type(textBox, typedInValue);

            expect(window.localStorage.getItem(`${pageIdentifier}-${id}`)).toEqual(typedInValue);

            await user.type(textBox, "C");

            expect(window.localStorage.getItem(`${pageIdentifier}-${id}`)).toEqual("ABC");
        });
        describe("when the field is blurred with an invalid value", () => {
            beforeEach(async () => {
                textBox.focus();
                await user.tab();
            });
            test("error message container is not present", () => {
                expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
            });
        });
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
                <FormWithField id={id} name={name} validator={validator} pageIdentifier={pageIdentifier}/>,
            );
            textBox = screen.getByRole("textbox");
        });

        test(`shows the error message`, async () => {
            await user.type(textBox, invalidValue);
            await user.click(screen.getByRole("button"));
            let errorMessage: HTMLSpanElement;

            await waitFor(() => {
                errorMessage = screen.getByText(`Don't say ${invalidValue}`);
                expect(errorMessage).toBeVisible();
            });

            await waitFor(() => {
                expect(textBox).toHaveFocus();
            });

            expect(textBox.getAttribute("aria-invalid")).toEqual("true");

            const errorMessageID = `form-error-message-for-${id}`;
            expect(errorMessage!.id).toEqual(errorMessageID);
            expect(textBox.getAttribute("aria-errormessage")).toEqual(errorMessageID);
            expect(textBox.getAttribute("aria-describedby")).toEqual(errorMessageID);
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
            <FormField id={props.id} name={props.name} validator={props.validator} pageIdentifier={props.pageIdentifier}/>
            <button onClick={onClick}>SUBMIT</button>
        </FormProvider>
    </>);
};