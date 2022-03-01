import { DefaultRequestMultipartBody, PathParams, ResponseResolver, rest, RestContext, RestRequest } from "msw";
import { productionCategoriesResolver } from "./categories-resolver";

export type RequestResolver = ResponseResolver<RestRequest<never, PathParams>, RestContext, Record<string, any> | DefaultRequestMultipartBody | string | number | boolean | null | undefined>

export const handlers = [
    rest.get("/categories", productionCategoriesResolver),
];