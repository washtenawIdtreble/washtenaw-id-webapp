import { RadioButtonGroup, RadioButtonGroupProps, RadioOption } from "./RadioButtonGroup";
import { render, screen, within } from "@testing-library/react";
import React, { useRef } from "react";

describe(RadioButtonGroup.name, () => {
    const legend = "What is your favorite color?";
    let options: RadioOption[];
    let fieldset: HTMLFieldSetElement;

    beforeEach(() => {
        options = [
            { label: "yellow" },
            { label: "BLUE", value: "blue" }
        ];

        render(
            <ShowsRadioButtonGroup
                legend={legend}
                groupName={"color"}
                options={options}
            />
        );

        fieldset = screen.getByRole("group");
    });
    test("displays legend in the fieldset", () => {
        const legendElement = within(fieldset).getByText(legend);
        expect(legendElement).toBeVisible();
        expect(legendElement.nodeName).toEqual("LEGEND");
    });
    test("displays input for each option passed in", () => {
        const inputs = screen.getAllByRole("radio");
        expect(inputs.length).toEqual(options.length);
    });
    test("inputs are each labelled by passed in label", () => {
        expect(screen.getByLabelText(options[0].label)).toBeVisible();
        expect(screen.getByLabelText(options[1].label)).toBeVisible();
    });
});

const ShowsRadioButtonGroup = (props: RadioButtonGroupProps) => {
    const valueRef = useRef<string>(null);

    return (<>
        <p>selected value: {valueRef!.current}</p>
        <RadioButtonGroup {...props}/>
    </>);
};
