import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { FormContext } from "../../contexts/FormContext";
import { NO_OP_VALIDATION } from "../../hooks/form-validation/useValidation";

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
    const { registerField } = useContext(FormContext);

    const clear = useCallback(() => {
        setSelectedValue("");
        clearStorage();
    }, [clearStorage]);

    const focus = useCallback(() => {}, []);

    useEffect(() => {
        registerField({ validation: NO_OP_VALIDATION, clear, focus });
    }, [clear, focus, registerField]);

    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
        save(event.target.value);
    }, [save]);

    const radioButtons = options.map((option, index) => {
        const id = `${groupName}${index}`;
        const optionValue = option.value ?? option.label;
        return (
            <label htmlFor={id} key={option.label}>
                <input id={id} type={"radio"} value={optionValue} name={groupName}
                       onChange={onChange} checked={selectedValue === optionValue}/>
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
