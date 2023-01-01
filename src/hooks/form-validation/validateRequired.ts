import { Validator } from "./useValidation";

export const MISSING_REQUIRED_MESSAGE = "You have to enter something in this box";

export const validateRequired: Validator = (value: string) => {
    if (value === "") {
        return MISSING_REQUIRED_MESSAGE;
    }

    return "";
};