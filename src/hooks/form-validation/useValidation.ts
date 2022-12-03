import { Dispatch, RefObject, SetStateAction, useCallback } from "react";
import { FormFieldElement } from "../../components/form/FormField";

export type Validator = (value: string) => string;
export type Validation = () => string[];
export type Field = {
    inputRef: RefObject<FormFieldElement>
    validation: Validation,
}

type UseValidationInput = {
    validators: Validator[]
    inputRef: RefObject<FormFieldElement>
    setErrorMessages: Dispatch<SetStateAction<string[]>>
}

export const useValidation = ({ validators, inputRef, setErrorMessages }: UseValidationInput): Validation => {
    return useCallback(() => {
        if (inputRef.current === null || inputRef.current.value === null || inputRef.current.value === undefined) {
            return [];
        }

        let errorMessages: string [] = [];
        for (const validator of validators) {
            const message = validator(inputRef.current.value);
            if (message) {
                errorMessages.push(message);
            }
        }

        setErrorMessages(errorMessages);
        return errorMessages;
    }, [validators, inputRef, setErrorMessages]);
};