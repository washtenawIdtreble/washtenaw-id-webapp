import { useState, useCallback } from "react";

export const useLocalStorage = (storageKey : string) => {
    const [key] = useState(storageKey);

    const [currentValue, setCurrentValue] = useState(window.localStorage.getItem(key) ?? "");

    const save = useCallback((input: string) => {
        window.localStorage.setItem(key, input);
        setCurrentValue(input);
    }, [key]);

    const clearStorage = useCallback(() => {
        window.localStorage.removeItem(storageKey);
    }, [key]);

    return { save, currentValue, clearStorage };
};