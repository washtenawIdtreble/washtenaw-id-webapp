import { INVALID_EMAIL_MESSAGE, validateEmail } from "./validateEmail";

describe(validateEmail.name, () => {
    test("default error message is correct", () => {
        expect(INVALID_EMAIL_MESSAGE).toEqual("This is not a valid email address. Make sure it has an \"at\" symbol (@) and a period (.) like abc@xyz.com");
    });
    const validEmailTestCases = [
        "anything@domain.org",
        "",
        undefined,
        null,
    ];
    validEmailTestCases.forEach(email => {
        test(`returns empty string for a valid email - "${email}"`, () => {
            expect(validateEmail(email as string)).toEqual("");
        });
    });
    const invalidEmailTestCases = [
        { email: "anything.com", testCondition: "missing an @ symbol" },
        { email: "someone@yahoo", testCondition: "missing a period" },
        { email: "any@th@ing.com", testCondition: "has multiple @ symbols" },
        { email: "someone@yahoo.com.org", testCondition: "has multiple periods" },
        { email: "domain.com@henry", testCondition: "with @ symbol before period" },
        { email: "@domain.com", testCondition: "with no name" },
        { email: "bernice@.com", testCondition: "with no domain" },
        { email: "sally@domain.", testCondition: "with no top-level domain" },
    ];
    invalidEmailTestCases.forEach(testCase => {
        test(`returns error message for email address ${testCase.testCondition}`, () => {
            const errorMessage = validateEmail(testCase.email);
            expect(errorMessage).toEqual(INVALID_EMAIL_MESSAGE);
        });
    });
});