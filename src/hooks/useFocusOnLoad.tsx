import { useEffect, useCallback } from "react";

export function useFocusOnLoad(elementIdToFocus: string): void  {
    const focus = useCallback((element: HTMLElement) => {
        element.scrollIntoView();
        element.focus();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            const element = document.getElementById(elementIdToFocus);
            if (element) {
                clearInterval(timer);
                focus(element);
            }
        }, 5);
        return () => {
            clearInterval(timer);
        };
    }, [elementIdToFocus, focus]);
}