import { AlertContextValue, AlertData } from "../src/contexts/AlertContext";

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