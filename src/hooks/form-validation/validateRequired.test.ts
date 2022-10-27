import { MISSING_REQUIRED_MESSAGE, validateRequired } from "./validateRequired";

describe(validateRequired.name, () => {
    test("default error message is correct", () => {
        expect(MISSING_REQUIRED_MESSAGE).toEqual("You must enter something in this field");
    });
    test("returns empty error message for a non-empty value", () => {
        expect(validateRequired("x")).toEqual("");
    });
    test("returns error message for an empty value", () => {
        expect(validateRequired("")).toEqual(MISSING_REQUIRED_MESSAGE);
    });
});