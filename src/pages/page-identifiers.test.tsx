import { ACCESSIBILITY_PAGE_IDENTIFIER } from "./accessibility-issues/AccessibilityIssues";
import { CONTACT_PAGE_IDENTIFIER } from "./contact-us/ContactUs";
import { ID_REFUSED_PAGE_IDENTIFIER } from "./report-id-refusal/ReportIdRefused";

describe("page identifiers", () => {
    test("are not equal", () => {
        expect(ACCESSIBILITY_PAGE_IDENTIFIER).not.toEqual(CONTACT_PAGE_IDENTIFIER);
        expect(ACCESSIBILITY_PAGE_IDENTIFIER).not.toEqual(ID_REFUSED_PAGE_IDENTIFIER);

        expect(CONTACT_PAGE_IDENTIFIER).not.toEqual(ID_REFUSED_PAGE_IDENTIFIER);
    });
});
