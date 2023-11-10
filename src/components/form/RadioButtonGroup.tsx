import React, { ChangeEvent, useCallback, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export type RadioOption = {
    label: string;
    value?: string;
}

export type RadioButtonGroupProps = {
    legend: string;
    groupName: string;
    options: RadioOption[];
    pageIdentifier: string;
}

export const RadioButtonGroup = (
    {
        legend,
        groupName,
        options,
        pageIdentifier
    }: RadioButtonGroupProps
) => {
    const { save, clearStorage, getStoredValue } = useLocalStorage(`${pageIdentifier}-${groupName}`);
    const [selectedValue, setSelectedValue] = useState(getStoredValue());

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        save(event.target.value);
    }, [save]);

    const radioButtons = options.map((option, index) => {
        const id = `${groupName}${index}`;
        const optionValue = option.value ?? option.label;
        return (
            <label htmlFor={id} key={option.label}>
                <input id={id} type={"radio"} value={optionValue} onChange={onChange}
                       checked={selectedValue === optionValue}/>
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
