import { AlertContextValue, AlertData } from "../src/contexts/AlertContext";
import { AccessibilityFormData } from "../src/pages/accessibility-issues/AccessibilityIssues";
import { FetchResult } from "../src/hooks/fetch/fetch";

export const FAKE_FETCH_RESULT: FetchResult = {
    responsePromise: Promise.resolve({ ok: true } as Response),
    abort: () => {},
};

export const buildMockAlertContext = (attributes?: Partial<AlertContextValue>): AlertContextValue => {
    attributes = attributes || {};
    return {
        showAlert: attributes.showAlert || jest.fn().mockName("mockShowAlert"),
    };
};

export const stubAlertData = (attributes?: Partial<AlertData>): AlertData => {
    attributes = attributes || {};
    return {
        heading: attributes.heading === undefined ? "Stub Alert Heading" : attributes.heading,
        message: attributes.message === undefined ? "Stub Alert Message" : attributes.message,
    };
};

export const stubAccessibilityFormData = (attributes: Partial<AccessibilityFormData> = {}): AccessibilityFormData => {
    return {
        name: attributes.name === undefined ? "Stub Name" : attributes.name,
        email: attributes.email === undefined ? "stub_email@example.com" : attributes.email,
        phone: attributes.phone === undefined ? "9999999999" : attributes.phone,
        description: attributes.description === undefined ? "Stub Description" : attributes.description,
    };
};