import React, { useCallback, useEffect, useRef } from "react";
import { ChildrenProps } from "../utilities/children-props";
import { Observable } from "../utilities/observable";
import { Field } from "../components/form/Field";

export type FormContextValue = {
    registerField: (field: Field) => void;
}

const defaultValue: FormContextValue = { registerField: () => {} };
export const FormContext = React.createContext<FormContextValue>(defaultValue);

type FormProviderProps = {
    onSubmit: Observable,
    onClear: Observable
}

export const FormProvider = ({ onSubmit, onClear, children }: FormProviderProps & ChildrenProps) => {
    const fields = useRef<Field[]>([]);

    const registerField = useCallback((field: Field) => {
        fields.current = [...fields.current, field];
    }, []);

    const runValidations = useCallback(() => {
        let invalidFieldFound = false;
        for (const field of fields.current) {
            const errors = field.validation();
            if (errors.length && !invalidFieldFound) {
                field.focus();
                invalidFieldFound = true;
            }
        }
        return invalidFieldFound;
    }, []);

    const clearFields = useCallback(() => {
        for (const field of fields.current) {
            field.clear();
        }
    }, []);

    useEffect(() => {
        onSubmit.subscribe(runValidations);
        onClear.subscribe(clearFields);
        return () => {
            onSubmit.unsubscribe();
        };
    }, [clearFields, onClear, onSubmit, runValidations]);

    const providerValue: FormContextValue = {
        registerField,
    };
    return (
        <FormContext.Provider value={providerValue}>
            {children}
        </FormContext.Provider>
    );
};
