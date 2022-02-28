import { RequestResolver } from "./server-handlers";

export const MOCK_CATEGORIES = ["banks", "pharmacies", "food"];

export const categoriesResolver: RequestResolver = (request, response, context) => {
    return response(context.json(MOCK_CATEGORIES));
}

export const customCategoriesResolver = (categories: string[]): RequestResolver => {
    return (request, response, context) => {
        return response(context.json(categories));
    }
}


