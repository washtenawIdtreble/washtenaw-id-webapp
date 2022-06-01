import { RequestResolver } from "../test-server-handlers";

export const TEST_CATEGORIES = [
        {displayName: "Banks", category: "banks"}, 
        {displayName: "Pharmacies", category: "pharmacies"}, 
        {displayName: "Food", category: "food"},
    ];

export const customCategoriesResolver = (categories: {displayName: string, category: string}[]): RequestResolver => {
    return (request, response, context) => {
        return response(context.json(categories));
    };
};

export const errorCategoriesResolver = (statusCode: number, message?: string): RequestResolver => {
    return (request, response, context) => {
        return response(
            context.status(statusCode),
            context.json({ message: message || "Default resolver error" }),
        );
    };
};

export const productionCategoriesResolver = (statusCode?: number, errorMessage?: string): RequestResolver => {
    if (statusCode) {
        return errorCategoriesResolver(statusCode, errorMessage);
    }

    return customCategoriesResolver([
        { displayName: "Banks", category: "banks" },
        { displayName: "Food", category: "food" },
        { displayName: "Jobs", category: "jobs" },
        { displayName: "Mental Health", category: "mental-health" },
        { displayName: "Pharmacies", category: "pharmacies" }, 
        { displayName: "Transportation", category: "transportation" },
    ]);
};
