import React from "react";

export type RadioOption = {
    label: string,
    value?: string
}

export type RadioButtonGroupProps = {
    legend: string,
    groupName: string
    options: RadioOption[]
}

export const RadioButtonGroup = (
    { legend, groupName, options }: RadioButtonGroupProps
) => {

    const radioButtons = options.map((option, index) => {
        const id = `${groupName}${index}`;
        return (
            <label htmlFor={id} key={option.label}>
                <input id={id} type={"radio"}/>
                {option.label}
            </label>
        );
    });

    return (<>
        <fieldset>
            <legend>{legend}</legend>
            {radioButtons}
        </fieldset>
    </>);
};
