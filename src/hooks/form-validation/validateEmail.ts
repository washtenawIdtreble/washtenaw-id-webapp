import { Validator } from "./useValidation";

export const INVALID_EMAIL_MESSAGE = "This is not a valid email address. Make sure it has an \"at\" symbol (@) and a period (.) like abc@xyz.com";

export const validateEmail: Validator = (emailAddress: string) => {
    if (["", undefined, null].includes(emailAddress)) {
        return "";
    }

    const atIndex = emailAddress.indexOf("@");
    const atCount = (emailAddress.match(/@/g) || []).length;

    const periodIndex = emailAddress.indexOf(".");
    const periodCount = (emailAddress.match(/\./g) || []).length;

    const invalid = atCount === 0
        || periodCount === 0
        || atCount > 1
        || periodCount > 1
        || periodIndex < atIndex
        || atIndex === 0
        || atIndex === periodIndex - 1
        || periodIndex === emailAddress.length - 1;

    if (invalid) {
        return INVALID_EMAIL_MESSAGE;
    }

    return "";
};