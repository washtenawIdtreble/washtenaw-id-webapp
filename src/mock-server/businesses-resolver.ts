import { RequestResolver } from "./test-server-handlers";

export const TEST_BUSINESSES = [
    {
        category: "banks", businesses: [
            "business 1",
            "business 2",
            "business 3",
            "business 4",
            "business 5"
        ],
    },
    {
        category: "food", businesses: [
            "business 1",
            "business 2",
            "business 3"
        ],
    },
    {
        category: "jobs", businesses: [
            "business 1",
            "business 2"
        ],
    },
];

export const customBusinessesResolver = (businesses: any): RequestResolver => {
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
            category: "banks", businesses: [
                "business 1",
                "business 2",
                "business 3",
                "business 4",
                "business 5"
            ],
        },
        {
            category: "food", businesses: [
                "business 1",
                "business 2",
                "business 3"
            ],
        },
        {
            category: "jobs", businesses: [
                "business 1",
                "business 2"
            ],
        },
        {
            category: "mental health", businesses: [
                "business 1",
                "business 2",
                "business 3"
            ],
        },
        {
            category: "pharmacies", businesses: [
                "business 1",
                "business 2",
                "business 3"
            ],
        },
        {
            category: "transportation", businesses: [
                "business 1",
                "business 2",
                "business 3"
            ],
        },
    ]);
};
