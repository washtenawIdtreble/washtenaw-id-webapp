import { AlertContextValue, AlertData } from "../src/contexts/AlertContext";
import { AccessibilityFormData } from "../src/mock-server/resolvers/accessibility-report-resolver";

export const FAKE_FETCH_RESULT = {
    response: Promise.resolve({ ok: true } as Response),
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
        email: attributes.email === undefined ? "Stub Email" : attributes.email,
        description: attributes.description === undefined ? "Stub Description" : attributes.description,
    };
};