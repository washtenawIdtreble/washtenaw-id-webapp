import { Validator } from "./useValidation";

export const MISSING_REQUIRED_MESSAGE = "You must enter something in this field";

export const validateRequired: Validator = (value: string) => {
    if (value === "") {
        return MISSING_REQUIRED_MESSAGE;
    }

    return "";
};