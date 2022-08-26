import { DefaultRequestMultipartBody, ResponseResolver, rest, RestContext, RestRequest } from "msw";
import { customCategoriesResolver, TEST_CATEGORIES } from "./resolvers/categories-resolver";
import { accessibilityIssuesResolver } from "./resolvers/accessibility-report-resolver";
import { BASE_URL } from "../utilities/base-url";

export type RequestResolver = ResponseResolver<RestRequest<never>, RestContext, Record<string, any> | DefaultRequestMultipartBody | string | number | boolean | null | undefined>

export const handlers = [
    rest.get(`${BASE_URL()}/categories`, customCategoriesResolver(TEST_CATEGORIES)),
    rest.post(`${BASE_URL()}/accessibility-issues`, accessibilityIssuesResolver()),
];