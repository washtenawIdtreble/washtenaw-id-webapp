import React, { RefObject, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useValidation, Validator } from "../../hooks/form-validation/useValidation";
import { FormContext } from "../../contexts/FormContext";

export enum FormFieldType {
    INPUT,
    TEXTAREA
}

export type FormFieldProps = {
    id: string
    name: string
    validator?: Validator
    autocomplete?: string
    inputType?: FormFieldType
}

export type FormFieldElement = HTMLInputElement | HTMLTextAreaElement;

export const FormField = ({ id, name, validator, autocomplete, inputType = FormFieldType.INPUT }: FormFieldProps) => {
    const { registerValidation } = useContext(FormContext);
    const inputRef = useRef<FormFieldElement>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const validation = useValidation({ validator, inputRef, setErrorMessage });

    useEffect(() => {
        registerValidation({ validation, inputRef });
    }, [registerValidation, validation]);

    const onBlur = useCallback(() => {
        if (errorMessage !== "") {
            validation();
        }
    }, [validation, errorMessage]);

    const invalid = errorMessage !== "";
    const errorMessageContainerId = invalid ? `error-message-container-${id}` : "";

    const input = inputType === FormFieldType.INPUT
        ? <input id={id} name={name} ref={inputRef as RefObject<HTMLInputElement>}
                 aria-describedby={errorMessageContainerId}
                 aria-invalid={invalid} aria-errormessage={errorMessageContainerId}
                 onBlur={onBlur} autoComplete={autocomplete}
        />
        : <textarea id={id} name={name} ref={inputRef as RefObject<HTMLTextAreaElement>}
                    aria-describedby={errorMessageContainerId}
                    aria-invalid={invalid} aria-errormessage={errorMessageContainerId}
                    onBlur={onBlur} autoComplete={autocomplete}
        />;

    return (<>
        {invalid && <span>{errorMessage}</span>}
        {input}
    </>);
};