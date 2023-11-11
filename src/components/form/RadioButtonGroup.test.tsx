import { RadioButtonGroup, RadioButtonGroupProps, RadioOption } from "./RadioButtonGroup";
import { render, screen, within } from "@testing-library/react";
import React, { useCallback, useRef, useState } from "react";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";
import { Observable } from "../../utilities/observable";
import { FormProvider } from "../../contexts/FormContext";

const groupName = "color";
describe(RadioButtonGroup.name, () => {
    const legend = "What is your favorite color?";
    const pageIdentifier = "radio-page";
    let options: RadioOption[];
    let fieldset: HTMLFieldSetElement;
    let user: UserEvent;

    beforeEach(() => {
        user = userEvent.setup();

        options = [
            { label: "yellow" },
            { label: "BLUE", value: "blue" },
            { label: "Greeeeeeen", value: "green" }
        ];
    });

    afterEach(() => {
        window.localStorage.clear();
    });

    describe("under normal conditions", () => {
        beforeEach(() => {
            render(
                <ShowsRadioButtonGroup
                    legend={legend}
                    groupName={groupName}
                    options={options}
                    pageIdentifier={pageIdentifier}
                />
            );

            fieldset = screen.getByRole("group");
        });
        test("displays legend in the fieldset", () => {
            const legendElement = within(fieldset).getByText(legend);
            expect(legendElement).toBeVisible();
            expect(legendElement.nodeName).toEqual("LEGEND");
        });
        test("displays an input in the fieldset for each option passed in", () => {
            const inputs = within(fieldset).getAllByRole("radio");
            expect(inputs.length).toEqual(options.length);
        });
        test("inputs are each labelled by passed-in label", () => {
            expect(screen.getByLabelText(options[0].label)).toBeVisible();
            expect(screen.getByLabelText(options[1].label)).toBeVisible();
        });
        test("writes option value (or label if value is missing) to local storage when input changes", async () => {
            await user.click(screen.getByLabelText(options[0].label));

            expect(window.localStorage.getItem(`${pageIdentifier}-${groupName}`)).toEqual(options[0].label);

            await user.click(screen.getByLabelText(options[1].label));

            expect(window.localStorage.getItem(`${pageIdentifier}-${groupName}`)).toEqual(options[1].value);
        });
        test("form can extract value from selected radio button", async () => {
            await user.click(screen.getByLabelText(options[0].label));
            await user.click(screen.getByRole("button", { name: "SUBMIT" }));

            expect(await screen.findByText(`submitted color: ${options[0].label}`)).toBeInTheDocument();
        });
        test("clears value and local storage when the form context tells it to", async () => {
            await user.click(screen.getByLabelText(options[0].label));

            const clearButton = screen.getByRole("button", { name: "CLEAR" });
            await user.click(clearButton);

            const inputs: HTMLInputElement[] = screen.getAllByRole("radio");
            const anyRadioButtonChecked = inputs.some((element) => element.checked);
            expect(anyRadioButtonChecked).toBe(false);

            expect(window.localStorage.getItem(`${pageIdentifier}-${groupName}`)).toBe(null);
        });
    });

    describe("when there's a value already in local storage", () => {
        test("starts with valid value selected", () => {
            window.localStorage.setItem(`${pageIdentifier}-${groupName}`, options[2].value!);

            render(
                <ShowsRadioButtonGroup
                    legend={legend}
                    groupName={groupName}
                    options={options}
                    pageIdentifier={pageIdentifier}
                />
            );

            expect((screen.getByLabelText(options[2].label) as HTMLInputElement).checked).toBe(true);
        });

        test("ignores invalid value", () => {
            window.localStorage.setItem(`${pageIdentifier}-${groupName}`, "purple");

            render(
                <ShowsRadioButtonGroup
                    legend={legend}
                    groupName={groupName}
                    options={options}
                    pageIdentifier={pageIdentifier}
                />
            );

            const inputs: HTMLInputElement[] = screen.getAllByRole("radio");
            const anyRadioButtonChecked = inputs.some((element) => element.checked);
            expect(anyRadioButtonChecked).toBe(false);
        });
    });
});

const ShowsRadioButtonGroup = (props: RadioButtonGroupProps) => {
    const valueRef = useRef<string>(null);
    const [onClearObservable] = useState(new Observable());
    const [onSubmitObservable] = useState(new Observable());
    const [submittedColor, setSubmittedColor] = useState("");

    const onClear = useCallback(() => {
        onClearObservable.notify();
    }, [onClearObservable]);

    const onSubmit = useCallback(() => {
        const form: HTMLFormElement = document.getElementById("form") as HTMLFormElement;
        const formData = new FormData(form);

        setSubmittedColor(formData.get(groupName) as string ?? "");
    }, []);

    return (<>
        <FormProvider onSubmit={onSubmitObservable} onClear={onClearObservable}>
            <form id={"form"}>
                <p>selected value: {valueRef!.current}</p>
                <RadioButtonGroup {...props}/>
                <button type={"button"} onClick={onClear}>CLEAR</button>
                <button type={"button"} onClick={onSubmit}>SUBMIT</button>
            </form>
            <span>submitted color: {submittedColor}</span>
        </FormProvider>
    </>);
};
