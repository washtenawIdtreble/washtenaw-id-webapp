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
    validators: Validator[]
    autocomplete?: string
    inputType?: FormFieldType
}

export type FormFieldElement = HTMLInputElement | HTMLTextAreaElement;

export const FormField = ({ id, name, validators, autocomplete, inputType = FormFieldType.INPUT }: FormFieldProps) => {
    const { registerValidation } = useContext(FormContext);
    const inputRef = useRef<FormFieldElement>(null);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const errorsElements = errorMessages.map(message => {
        return <li key={message}>{message}</li>;
    });

    const validation = useValidation({ validators, inputRef, setErrorMessages });

    useEffect(() => {
        registerValidation({ validation, inputRef });
    }, [registerValidation, validation]);

    const onBlur = useCallback(() => {
        if (errorMessages.length > 0) {
            validation();
        }
    }, [validation, errorMessages]);

    const invalid = errorMessages.length > 0;
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
        {invalid &&
            <ul id={errorMessageContainerId}>
                {errorsElements}
            </ul>
        }
        {input}
    </>);
};