import { DefaultRequestMultipartBody, ResponseResolver, rest, RestContext, RestRequest } from "msw";
import { customCategoriesResolver, TEST_CATEGORIES } from "./categories-resolver";
import { customBusinessesResolver, TEST_BUSINESSES } from "./businesses-resolver";

export type RequestResolver = ResponseResolver<RestRequest<never>, RestContext, Record<string, any> | DefaultRequestMultipartBody | string | number | boolean | null | undefined>

export const handlers = [
    rest.get("/categories", customCategoriesResolver(TEST_CATEGORIES)),
    rest.get("/businesses", customBusinessesResolver(TEST_BUSINESSES)),
];