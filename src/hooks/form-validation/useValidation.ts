import { Dispatch, RefObject, SetStateAction, useCallback } from "react";
import { FormFieldElement } from "../../components/form/FormField";

export type Validator = (value: string) => string;
export type Validation = () => string;

type UseValidationInput = {
    validator?: Validator
    inputRef: RefObject<FormFieldElement>
    setErrorMessage: Dispatch<SetStateAction<string>>
}

export const useValidation = ({ validator, inputRef, setErrorMessage }: UseValidationInput): Validation => {
    return useCallback(() => {
        if (!validator || inputRef.current === null || inputRef.current.value === null || inputRef.current.value === undefined) {
            return "";
        }

        const message = validator(inputRef.current.value);

        setErrorMessage(message);
        return message;
    }, [validator, inputRef, setErrorMessage]);
};