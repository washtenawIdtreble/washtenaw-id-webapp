import { RefObject, useCallback } from "react";

type FocusElement = (element: RefObject<HTMLElement>) => void;

export const useFocusElement = (): FocusElement => {
    return useCallback((element) => {
        setTimeout(() => {
            element.current?.focus();
        }, parseInt(process.env.FOCUS_TIMEOUT ?? "2000"));
    }, []);
};