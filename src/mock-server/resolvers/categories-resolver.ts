import { RequestResolver } from "../test-server-handlers";
import { Category } from "../../hooks/useCategories";

export const TEST_CATEGORIES: Category[] = [
    { displayName: "Banks", name: "banks" },
    { displayName: "Pharmacies", name: "pharmacies" },
    { displayName: "Food", name: "food" },
];

export const customCategoriesResolver = (categories: Category[]): RequestResolver => {
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
        { displayName: "Banks", name: "banks" },
        { displayName: "Food", name: "food" },
        { displayName: "Jobs", name: "jobs" },
        { displayName: "Mental Health", name: "mental-health" },
        { displayName: "Pharmacies", name: "pharmacies" },
        { displayName: "Transportation", name: "transportation" },
    ]);
};
