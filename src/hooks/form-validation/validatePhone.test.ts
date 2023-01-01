import { INVALID_PHONE_MESSAGE, validatePhone } from "./validatePhone";

describe(validatePhone.name, () => {
    test("default error message is correct", () => {
        expect(INVALID_PHONE_MESSAGE).toEqual("This is not a valid phone number. Make sure it has 7 or 10 digits like 734-555-1234 or 555-1234");
    });
    const validPhoneTestCases = [
        { phone: "", testCondition: "empty" },
        { phone: undefined, testCondition: "undefined" },
        { phone: null, testCondition: "null" },
        { phone: "4642145", testCondition: "7 digits" },
        { phone: "464-2145", testCondition: "hyphenated" },
        { phone: "464 2145", testCondition: "spaces" },
        { phone: "464.2145", testCondition: "periods" },
        { phone: "(810) 464-2145", testCondition: "10 digits" },
        { phone: "+1 (810) 464-2145", testCondition: "10 digits leading +1" },
        {
            phone: "!@#$%^&*()~-=_8104^&*()~-=_6421+[]{};':\",./<>/45",
            testCondition: "containing other non alpha-numeric characters",
        },
    ];
    validPhoneTestCases.forEach(testCase => {
        test(`returns empty string for a valid phone - ${testCase.testCondition}`, () => {
            expect(validatePhone(testCase.phone as string)).toEqual("");
        });
    });
    const invalidPhoneTestCases = [
        { phone: "464-Gb-2145", testCondition: "containing any letters" },
        { phone: "464-214", testCondition: "with less than 7 digits" },
        { phone: "464-2145-9", testCondition: "with between 7 and 10 digits" },
        { phone: "(810) 464-2145-9", testCondition: "with more than 10 digits" },
    ];
    invalidPhoneTestCases.forEach(testCase => {
        test(`returns error message for phone ${testCase.testCondition}`, () => {
            const errorMessage = validatePhone(testCase.phone);
            expect(errorMessage).toEqual(INVALID_PHONE_MESSAGE);
        });
    });
});