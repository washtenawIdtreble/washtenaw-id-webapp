import { useCallback, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DocumentStateContext } from "../../contexts/DocumentStateContext";

export function useFocusHashOrMainHeading(): void {
    const { documentIsNew } = useContext(DocumentStateContext);

    const { hash } = useLocation();
    const elementToFocus = hash.replace("#", "");

    const focusHeading1 = useCallback(() => {
        if (!documentIsNew) {
            const heading1 = document.querySelector("h1");
            heading1?.focus();
        }

        /**
         * This useEffect is a rare exception to the exhaustive-dependencies rule. We want this to run one time when the
         * component is mounted to store the state of `documentIsNew`. If it reran when documentIsNew changed
         * from true to false, it would focus the h1 even when the document was freshly loaded
         */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const focusSubHeading = useCallback((element: HTMLElement) => {
        element.scrollIntoView();
        element.focus();
    }, []);

    useEffect(() => {
        if (elementToFocus === "") {
            focusHeading1();
        } else {
            let count = 0;
            const timer = setInterval(() => {

                const element = document.getElementById(elementToFocus);
                if (element) {
                    clearInterval(timer);
                    focusSubHeading(element);
                } else if (count >= 60) { // TODO: Figure out a good number for this
                    clearInterval(timer);
                    focusHeading1();
                }

                count += 1;
            }, 5);
            return () => {
                clearInterval(timer);
            };
        }
    }, [elementToFocus, focusHeading1, focusSubHeading]);
}
