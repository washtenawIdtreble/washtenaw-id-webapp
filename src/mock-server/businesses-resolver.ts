import { RequestResolver } from "./test-server-handlers";
import { Business, CategorizedBusinesses } from "../hooks/useBusinesses";
import { faker } from "@faker-js/faker";

const stubBusiness = (attributes: Partial<Business> = {}): Business => {
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

const toTitleCase = (input: string) => {
    const words = input.toLowerCase().split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
};

export const TEST_CATEGORIZED_BUSINESSES: CategorizedBusinesses[] = [
    {
        category: { displayName: "Banks", name: "banks" },
        businesses: [
            stubBusiness(),
            stubBusiness(),
            stubBusiness(),
            stubBusiness(),
            stubBusiness(),
        ],
    },
    {
        category: { displayName: "Food", name: "food" },
        businesses: [
            stubBusiness(),
            stubBusiness(),
            stubBusiness(),
        ],
    },
    {
        category: { displayName: "Jobs", name: "jobs" },
        businesses: [
            stubBusiness(),
            stubBusiness(),
        ],
    },
];

export const customBusinessesResolver = (businesses: CategorizedBusinesses[]): RequestResolver => {
    return (request, response, context) => {
        return response(context.json(businesses));
    };
};

export const errorBusinessesResolver = (statusCode: number, message?: string): RequestResolver => {
    return (request, response, context) => {
        return response(
            context.status(statusCode),
            context.json({ message: message || "Default resolver error" }),
        );
    };
};

export const productionBusinessesResolver = (statusCode?: number, errorMessage?: string): RequestResolver => {
    if (statusCode) {
        return errorBusinessesResolver(statusCode, errorMessage);
    }

    return customBusinessesResolver([
        {
            category: { displayName: "Banks", name: "banks" },
            businesses: [
                stubBusiness(),
                stubBusiness(),
                stubBusiness(),
                stubBusiness(),
                stubBusiness(),
            ],
        },
        {
            category: { displayName: "Food", name: "food" },
            businesses: [
                stubBusiness(),
                stubBusiness(),
                stubBusiness(),
            ],
        },
        {
            category: { displayName: "Jobs", name: "jobs" },
            businesses: [
                stubBusiness(),
                stubBusiness(),
            ],
        },
        {
            category: { displayName: "Mental Health", name: "mental-health" },
            businesses: [
                stubBusiness(),
                stubBusiness(),
                stubBusiness(),
            ],
        },
        {
            category: { displayName: "Pharmacies", name: "pharmacies" },
            businesses: [
                stubBusiness(),
                stubBusiness(),
                stubBusiness(),
            ],
        },
        {
            category: { displayName: "Transportation", name: "transportation" },
            businesses: [
                stubBusiness(),
                stubBusiness(),
                stubBusiness(),
            ],
        },
    ]);
};