import { AlertContextValue, AlertData } from "../src/contexts/AlertContext";
import { AccessibilityFormData } from "../src/pages/accessibility-issues/AccessibilityIssues";
import { Business, CategorizedBusinesses } from "../src/hooks/useBusinesses";
import { faker } from "@faker-js/faker";
import { Category } from "../src/hooks/useCategories";

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

export const stubCategory = (attributes: Partial<Category> = {}): Category => {
    return {
        name: attributes.name === undefined ? "stub category name" : attributes.name,
        displayName: attributes.displayName === undefined ? "Stub Category Display Name" : attributes.displayName,
    };
};

export const stubBusiness = (attributes: Partial<Business> = {}): Business => {
    const name = toTitleCase(`${faker.word.adjective()} ${faker.word.noun()}`);
    return {
        name: attributes.name === undefined ? `${name} ${faker.company.companySuffix()}` : attributes.name,
        address: attributes.address === undefined ? faker.address.streetAddress() : attributes.address,
        city: attributes.city === undefined ? faker.address.city() : attributes.city,
        state: attributes.state === undefined ? faker.address.stateAbbr() : attributes.state,
        zip: attributes.zip === undefined ? faker.address.zipCode() : attributes.zip,
        website: attributes.website === undefined ? faker.internet.url() : attributes.website,
        phone: attributes.phone === undefined ? faker.phone.number() : attributes.phone,
        description: attributes.description === undefined ? faker.lorem.paragraph(4) : attributes.description,
    };
};

export const stubCategorizedBusinesses = (attributes: Partial<CategorizedBusinesses> = {}): CategorizedBusinesses => {
    return {
        category: attributes.category ?? stubCategory(),
        businesses: attributes.businesses ?? [stubBusiness()],
    };
};

const toTitleCase = (input: string) => {
    const words = input.toLowerCase().split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
};