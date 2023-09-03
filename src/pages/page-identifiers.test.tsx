import { ACCESSIBILITY_PAGE_IDENTIFIER } from "./accessibility-issues/AccessibilityIssues";
import { CONTACT_PAGE_IDENTIFIER } from "./contact-us/ContactUs";

describe("page identifiers", () => {
    test("are not equal", () => {
        expect(ACCESSIBILITY_PAGE_IDENTIFIER).not.toEqual(CONTACT_PAGE_IDENTIFIER);
    });
});