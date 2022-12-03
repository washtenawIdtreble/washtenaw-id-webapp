import { Validator } from "./useValidation";

export const INVALID_PHONE_MESSAGE = "This is not a valid phone number. Make sure it contains 7 or 10 digits excluding a 1 at the beginning";

export const validatePhone: Validator = (phoneNumber: string) => {
    const alphanumericPhone = phoneNumber.replace(/[^a-zA-Z\d]/g, "");
    const digitsOnly = alphanumericPhone.replace(/[a-z]/g, "");
    const withoutLeadingOne = digitsOnly.startsWith("1") ? digitsOnly.substring(1) : digitsOnly;

    const invalid = (withoutLeadingOne.length !== 10 && withoutLeadingOne.length !== 7)
        || digitsOnly.length < alphanumericPhone.length;

    if (invalid) {
        return INVALID_PHONE_MESSAGE;
    }

    return "";
};