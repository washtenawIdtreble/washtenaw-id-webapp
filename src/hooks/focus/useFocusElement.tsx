import { RefObject, useCallback } from "react";
import { ENVIRONMENT_VARIABLES, getIntegerEnvVar } from "../../utilities/environment-variables";

type FocusElement = (element: RefObject<HTMLElement>) => void;

export const useFocusElement = (): FocusElement => {
    return useCallback((element) => {
        setTimeout(() => {
            element.current?.focus();
        }, getIntegerEnvVar(ENVIRONMENT_VARIABLES.REACT_APP_FOCUS_TIMEOUT));
    }, []);
};
