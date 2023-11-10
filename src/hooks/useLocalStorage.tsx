import { useCallback } from "react";

export const useLocalStorage = (storageKey: string) => {
    const save = useCallback((input: string) => {
        window.localStorage.setItem(storageKey, input);
    }, [storageKey]);

    const clearStorage = useCallback(() => {
        window.localStorage.removeItem(storageKey);
    }, [storageKey]);

    const getStoredValue = useCallback(() => {
        return window.localStorage.getItem(storageKey) ?? "";
    }, [storageKey]);

    return { save, getStoredValue, clearStorage };
};
