import { Validator } from "./useValidation";

export const INVALID_PHONE_MESSAGE = "This is not a valid phone number. Make sure it has 7 or 10 digits like 734-555-1234 or 555-1234";

export const validatePhone: Validator = (phoneNumber: string) => {
    if (["", undefined, null].includes(phoneNumber)) {
        return "";
    }

    const alphanumericPhone = phoneNumber.replace(/[^a-zA-Z\d]/g, "");
    const digitsOnly = alphanumericPhone.replace(/[a-z]/g, "");

    const hasALeading1WeDontNeed = digitsOnly.startsWith("1") && digitsOnly.length !== 7;
    const withoutLeadingOne = hasALeading1WeDontNeed ? digitsOnly.substring(1) : digitsOnly;

    const invalid = (withoutLeadingOne.length !== 10 && withoutLeadingOne.length !== 7)
        || digitsOnly.length < alphanumericPhone.length;

    if (invalid) {
        return INVALID_PHONE_MESSAGE;
    }

    return "";
};