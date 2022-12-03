import React, { useCallback, useEffect, useRef } from "react";
import { Field } from "../hooks/form-validation/useValidation";
import { ChildrenProps } from "../utilities/children-props";
import { Observable } from "../utilities/observable";
import { useFocusElement } from "../hooks/useFocusElement";

export type FormContextValue = {
    registerValidation: (field: Field) => void;
}

const defaultValue = { registerValidation: () => {} };
export const FormContext = React.createContext<FormContextValue>(defaultValue);

type FormProviderProps = {
    onSubmit: Observable
}

export const FormProvider = ({ onSubmit, children }: FormProviderProps & ChildrenProps) => {
    const fields = useRef<Field[]>([]);

    const registerValidation = useCallback((field: Field) => {
        fields.current = [...fields.current, field];
    }, []);

    const focusElement = useFocusElement();

    const runValidations = useCallback(() => {
        let invalidFieldFound = false;
        for (const field of fields.current) {
            const errors = field.validation();
            if (errors.length && !invalidFieldFound) {
                focusElement(field.inputRef);
                invalidFieldFound = true;
            }
        }
        return invalidFieldFound;
    }, [focusElement]);

    useEffect(() => {
        onSubmit.subscribe(runValidations);
        return () => {
            onSubmit.unsubscribe();
        };
    }, [onSubmit, runValidations]);

    const providerValue: FormContextValue = {
        registerValidation,
    };
    return (
        <FormContext.Provider value={providerValue}>
            {children}
        </FormContext.Provider>
    );
};