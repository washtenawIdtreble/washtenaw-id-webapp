import { AccessibilityFormData } from "../src/pages/accessibility-issues/AccessibilityIssues";
import { Business, CategorizedBusinesses } from "../src/hooks/useBusinesses";
import { faker } from "@faker-js/faker";
import { Category } from "../src/hooks/useCategories";
import { IdRefusedFormData } from "../src/pages/report-id-refusal/ReportIdRefused";

export const stubAccessibilityFormData = (attributes: Partial<AccessibilityFormData> = {}): AccessibilityFormData => {
    return {
        name: attributes.name === undefined ? faker.name.fullName() : attributes.name,
        email: attributes.email === undefined ? faker.internet.email() : attributes.email,
        phone: attributes.phone === undefined ? faker.phone.number("##########") : attributes.phone,
        description: attributes.description === undefined ? faker.lorem.paragraph(3) : attributes.description,
    };
};

export const stubRefusedIdData = (attributes: Partial<IdRefusedFormData> = {}): IdRefusedFormData => {
    return {
        name: attributes.name === undefined ? faker.name.fullName() : attributes.name,
        email: attributes.email === undefined ? faker.internet.email() : attributes.email,
        phone: attributes.phone === undefined ? faker.phone.number("##########") : attributes.phone,

        businessName: attributes.businessName === undefined ? generateBusinessName() : attributes.businessName,
        businessStreet: attributes.businessStreet === undefined ? faker.address.street() : attributes.businessStreet,
        businessCity: attributes.businessCity === undefined ? faker.address.city() : attributes.businessCity,
        whenRefused: attributes.whenRefused === undefined ? faker.helpers.arrayElement(["under 18", "over 55"]) : attributes.whenRefused,
        ageRange: attributes.ageRange === undefined ? "" : attributes.ageRange,

        description: attributes.description === undefined ? faker.lorem.paragraph(3) : attributes.description,
    };
};

export const stubCategory = (attributes: Partial<Category> = {}): Category => {
    return {
        name: attributes.name === undefined ? "stub category name" : attributes.name,
        displayName: attributes.displayName === undefined ? "Stub Category Display Name" : attributes.displayName,
    };
};

export const stubBusiness = (attributes: Partial<Business> = {}): Business => {
    return {
        name: attributes.name === undefined ? generateBusinessName() : attributes.name,
        address: attributes.address === undefined ? faker.address.streetAddress() : attributes.address,
        city: attributes.city === undefined ? faker.address.city() : attributes.city,
        state: attributes.state === undefined ? faker.address.stateAbbr() : attributes.state,
        zip: attributes.zip === undefined ? faker.address.zipCode() : attributes.zip,
        website: attributes.website === undefined ? faker.internet.url() : attributes.website,
        phone: attributes.phone === undefined ? faker.phone.number().replace(/ x.*$/g, "") : attributes.phone,
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

const generateBusinessName = () => {
    return toTitleCase(`${faker.word.adjective()} ${faker.word.noun()} ${faker.company.companySuffix()}`);
};
