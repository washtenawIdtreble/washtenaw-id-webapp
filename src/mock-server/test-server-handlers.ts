import { DefaultRequestMultipartBody, ResponseResolver, rest, RestContext, RestRequest } from "msw";
import { customCategoriesResolver, TEST_CATEGORIES } from "./resolvers/categories-resolver";
import { customBusinessesResolver, TEST_BUSINESSES } from "./businesses-resolver";
import { accessibilityReportResolver } from "./resolvers/accessibility-report-resolver";
import { BASE_URL } from "../utilities/base-url";
import { SERVER_ENDPOINTS } from "../utilities/server-endpoints";

export type RequestResolver = ResponseResolver<RestRequest<never>, RestContext, Record<string, any> | DefaultRequestMultipartBody | string | number | boolean | null | undefined>

export const handlers = [
    rest.get(`${BASE_URL()}/${SERVER_ENDPOINTS.CATEGORIES}`, customCategoriesResolver(TEST_CATEGORIES)),
    rest.get(`${BASE_URL()}/${SERVER_ENDPOINTS.BUSINESSES}`, customBusinessesResolver(TEST_BUSINESSES)),
    rest.post(`${BASE_URL()}/${SERVER_ENDPOINTS.ACCESSIBILITY_ISSUES}`, accessibilityReportResolver),
];