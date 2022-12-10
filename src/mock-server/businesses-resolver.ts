import { RequestResolver } from "./test-server-handlers";
import { CategorizedBusinesses } from "../hooks/useBusinesses";

export const TEST_BUSINESSES: CategorizedBusinesses[] = [
    {
        category: { displayName: "Banks", name: "banks" },
        businesses: [
            "business 1",
            "business 2",
            "business 3",
            "business 4",
            "business 5",
        ],
    },
    {
        category: { displayName: "Food", name: "food" },
        businesses: [
            "business 1",
            "business 2",
            "business 3",
        ],
    },
    {
        category: { displayName: "Jobs", name: "jobs" },
        businesses: [
            "business 1",
            "business 2",
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
                "business 1",
                "business 2",
                "business 3",
                "business 4",
                "business 5",
            ],
        },
        {
            category: { displayName: "Food", name: "food" },
            businesses: [
                "business 1",
                "business 2",
                "business 3",
            ],
        },
        {
            category: { displayName: "Jobs", name: "jobs" },
            businesses: [
                "business 1",
                "business 2",
            ],
        },
        {
            category: { displayName: "Mental Health", name: "mental-health" },
            businesses: [
                "business 1",
                "business 2",
                "business 3",
            ],
        },
        {
            category: { displayName: "Pharmacies", name: "pharmacies" },
            businesses: [
                "business 1",
                "business 2",
                "business 3",
            ],
        },
        {
            category: { displayName: "Transportation", name: "transportation" },
            businesses: [
                "business 1",
                "business 2",
                "business 3",
            ],
        },
    ]);
};
