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

    test("reads from local storage on mount", () => {
        const inputId = "input";
        const textAreaId = "text-area";
        window.localStorage.setItem(`${pageIdentifier}-${inputId}`, "input Value Saved Earlier");
        window.localStorage.setItem(`${pageIdentifier}-${textAreaId}`, "textarea Value Saved Earlier");

        render(<>
            <FormField id={inputId} name={name} pageIdentifier={pageIdentifier}/>
            <FormField id={textAreaId} name={name} inputType={FormFieldType.TEXTAREA} pageIdentifier={pageIdentifier}/>
        </>);

        const fields = screen.getAllByRole("textbox") as HTMLInputElement[];

        expect(fields[0].value).toEqual("input Value Saved Earlier");
        expect(fields[1].value).toEqual("textarea Value Saved Earlier");
    });

    describe("under normal circumstances - input", () => {
        const errorMessage = "error message";
        beforeEach(() => {
            render(<FormWithField id={id} name={name} validator={() => errorMessage} autoComplete={"tel"} pageIdentifier={pageIdentifier}/>);
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
        test("error message container is not present", async () => {
            textBox.focus();
            await user.tab();
            expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
        });
        test("clears value and local storage when onClear observable fires", async() => {
            await user.type(textBox, "some email");
            const clearButton = screen.getByRole("button", {name: "CLEAR"});
            await user.click(clearButton);
            
            expect(textBox.value).toBe("");
            expect(window.localStorage.getItem(`${pageIdentifier}-${id}`)).toBe(null);
        });
    });

    describe("under normal circumstances - textarea", () => {
        const errorMessage = "error message";
        beforeEach(() => {
            render(<FormWithField id={id} name={name} validator={() => errorMessage} inputType={FormFieldType.TEXTAREA} autoComplete={"tel"} pageIdentifier={pageIdentifier}/>);
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
        test("error message container is not present", async () => {
            textBox.focus();
            await user.tab();
            expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
        });
        test("clears value and local storage when onClear observable fires", async() => {
            await user.type(textBox, "some email");
            const clearButton = screen.getByRole("button", {name: "CLEAR"});
            await user.click(clearButton);
            
            expect(textBox.value).toBe("");
            expect(window.localStorage.getItem(`${pageIdentifier}-${id}`)).toBe(null);
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
            await user.click(screen.getByRole("button", {name: "SUBMIT"}));
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
                await user.click(screen.getByRole("button", {name: "SUBMIT"}));
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
    const [onSubmitObservable] = useState(new Observable());
    const [onClearObservable] = useState(new Observable());

    const onSubmit = useCallback(() => {
        onSubmitObservable.notify();
    }, [onSubmitObservable]);
    
    const onClear = useCallback(()=> {
        onClearObservable.notify();
    },[]);

    return (<>
        <FormProvider onSubmit={onSubmitObservable} onClear={onClearObservable}>
            <FormField {...props}/>
            <button onClick={onSubmit}>SUBMIT</button>
            <button onClick={onClear}>CLEAR</button>
        </FormProvider>
    </>);
};