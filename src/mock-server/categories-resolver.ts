import { RequestResolver } from "./test-server-handlers";

export const TEST_CATEGORIES = ["banks", "pharmacies", "food"];
export const testCategoriesResolver: RequestResolver = (request, response, context) => {
    return response(context.json(TEST_CATEGORIES));
};

export const customCategoriesResolver = (categories: string[]): RequestResolver => {
    return (request, response, context) => {
        return response(context.json(categories));
    };
};

export const productionCategoriesResolver: RequestResolver = (request, response, context) => {
    return response(context.json([
        "banks",
        "food",
        "jobs",
        "mental health",
        "pharmacies",
        "transportation",
    ]));
};
