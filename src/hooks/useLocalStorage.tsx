import { useCallback, useState } from "react";

export const useLocalStorage = (storageKey: string) => {
    const [currentValue, setCurrentValue] = useState(window.localStorage.getItem(storageKey) ?? "");

    const save = useCallback((input: string) => {
        window.localStorage.setItem(storageKey, input);
        setCurrentValue(input);
    }, [storageKey]);

    const clearStorage = useCallback(() => {
        window.localStorage.removeItem(storageKey);
    }, [storageKey]);

    return { save, currentValue, clearStorage };
};
