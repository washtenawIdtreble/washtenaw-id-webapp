import React, { createContext, useCallback } from "react";
import { ChildrenProps } from "../utilities/children-props";

type LoadingContextValue = {
    startLoading: () => void,
    finishLoading: () => void,
}

const defaultValue: LoadingContextValue = {
    startLoading: () => {},
    finishLoading: () => {}
};

export const LoadingContext = createContext<LoadingContextValue>(defaultValue);

type LoadingContextProviderProps = ChildrenProps & {
    setIsLoading: (value: boolean) => void
}

export const LoadingContextProvider = ({ children, setIsLoading }: LoadingContextProviderProps) => {
    const startLoading = useCallback(() => {
        setIsLoading(true);
    }, [setIsLoading]);

    const finishLoading = useCallback(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    return (
        <LoadingContext.Provider value={{ startLoading, finishLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};
