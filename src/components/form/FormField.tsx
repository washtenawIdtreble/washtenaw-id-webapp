import React, { RefObject, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useValidation, Validator } from "../../hooks/form-validation/useValidation";
import { FormContext } from "../../contexts/FormContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export enum FormFieldType {
    INPUT,
    TEXTAREA
}

export type FormFieldProps = {
    id: string
    name: string
    validator?: Validator
    autoComplete?: string
    inputType?: FormFieldType
    pageIdentifier: string
}

export type FormFieldElement = HTMLInputElement | HTMLTextAreaElement;

export const FormField = ({ id, name, validator, autoComplete, pageIdentifier, inputType = FormFieldType.INPUT }: FormFieldProps) => {
    const { registerValidation } = useContext(FormContext);
    const inputRef = useRef<FormFieldElement>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { save } = useLocalStorage(`${pageIdentifier}-${id}`);

    const validation = useValidation({ validator, inputRef, setErrorMessage });

    useEffect(() => {
        registerValidation({ validation, inputRef });
    }, [registerValidation, validation]);

    const onBlur = useCallback(() => {
        if (errorMessage !== "") {
            validation();
        }
    }, [validation, errorMessage]);

    const onChange = useCallback((event) => {
        save(event.target.value);
    }, []);

    const invalid = errorMessage !== "";
    const errorMessageId = invalid ? `form-error-message-for-${id}` : "";

    const input = inputType === FormFieldType.INPUT
        ? <input id={id} name={name} ref={inputRef as RefObject<HTMLInputElement>}
                 aria-describedby={errorMessageId}
                 aria-invalid={invalid} aria-errormessage={errorMessageId}
                 onBlur={onBlur} onChange={onChange} autoComplete={autoComplete} className={"form-input"}
        />
        : <textarea id={id} name={name} ref={inputRef as RefObject<HTMLTextAreaElement>}
                    aria-describedby={errorMessageId}
                    aria-invalid={invalid} aria-errormessage={errorMessageId}
                    onBlur={onBlur} onChange={onChange} autoComplete={autoComplete} className={"form-textarea"}
        />;

    const errorClass = invalid ? "invalid-form-field" : "";
    const containerClass = inputType === FormFieldType.TEXTAREA ? "flex-grow-field" : "";

    return (<div className={`form-field ${containerClass} ${errorClass}`}>
        {invalid && <span id={errorMessageId} className={"form-field-error-message"}>{errorMessage}</span>}
        {input}
    </div>);
};