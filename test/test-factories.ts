import { AccessibilityFormData } from "../src/pages/accessibility-issues/AccessibilityIssues";
import { faker } from "@faker-js/faker";
import { IdRefusedFormData } from "../src/pages/report-id-refusal/ReportIdRefused";

export const stubAccessibilityFormData = (attributes: Partial<AccessibilityFormData> = {}): AccessibilityFormData => {
    return {
        name: attributes.name === undefined ? faker.name.fullName() : attributes.name,
        email: attributes.email === undefined ? faker.internet.email() : attributes.email,
        phone: attributes.phone === undefined ? faker.phone.number("##########") : attributes.phone,
        comments: attributes.comments === undefined ? faker.lorem.paragraph(3) : attributes.comments,
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
        whenRefused: attributes.whenRefused === undefined ? faker.lorem.word() : attributes.whenRefused,
        ageRange: attributes.ageRange === undefined ? faker.helpers.arrayElement(["Under 18", "Over 55"]) : attributes.ageRange,

        description: attributes.description === undefined ? faker.lorem.paragraph(3) : attributes.description,
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
