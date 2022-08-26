import { RequestResolver } from "../test-server-handlers";

export const TEST_CATEGORIES = ["banks", "pharmacies", "food"];

export const customCategoriesResolver = (categories: string[]): RequestResolver => {
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

export const noOpCategoriesResolver = (): RequestResolver => {
    return errorCategoriesResolver(500);
};

export const productionCategoriesResolver = (statusCode?: number, errorMessage?: string): RequestResolver => {
    if (statusCode) {
        return errorCategoriesResolver(statusCode, errorMessage);
    }

    return customCategoriesResolver([
        "banks",
        "food",
        "jobs",
        "mental health",
        "pharmacies",
        "transportation",
    ]);
};
