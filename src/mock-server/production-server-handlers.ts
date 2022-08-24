import { rest } from "msw";
import { productionCategoriesResolver } from "./resolvers/categories-resolver";
import { accessibilityReportResolver } from "./resolvers/accessibility-report-resolver";
import { SERVER_ENDPOINTS } from "../utilities/server-endpoints";

export const handlers = [
    rest.get(`/${SERVER_ENDPOINTS.CATEGORIES}`, productionCategoriesResolver()),
    rest.post(`/${SERVER_ENDPOINTS.ACCESSIBILITY_ISSUES}`, accessibilityReportResolver),
];