import { useCallback, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DocumentStateContext } from "../../contexts/DocumentStateContext";
import { ENVIRONMENT_VARIABLES, getIntegerEnvVar } from "../../utilities/environment-variables";

export function useFocusHashOrMainHeading(loading: boolean): void {
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

    const focusSubheading = useCallback(() => {
        let count = 0;
        const timer = setInterval(() => {

            const element = document.getElementById(elementToFocus);
            if (element) {
                clearInterval(timer);
                element.scrollIntoView();
                element.focus();
            } else if (count >= getIntegerEnvVar(ENVIRONMENT_VARIABLES.REACT_APP_SUBHEADING_FOCUS_ATTEMPTS)) {
                clearInterval(timer);
                focusHeading1();
            }

            count += 1;
        }, getIntegerEnvVar(ENVIRONMENT_VARIABLES.REACT_APP_SUBHEADING_FOCUS_TIMEOUT));
        return () => {
            clearInterval(timer);
        };
    }, [elementToFocus, focusHeading1]);

    useEffect(() => {
        if (elementToFocus === "") {
            focusHeading1();
        } else {
            if (!loading) {
                return focusSubheading();
            }
        }
    }, [elementToFocus, focusHeading1, focusSubheading, loading]);
}
