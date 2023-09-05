import { rest } from "msw";
import { productionCategoriesResolver } from "./resolvers/categories-resolver";
import { productionBusinessesResolver } from "./businesses-resolver";
import { accessibilityReportResolver } from "./resolvers/accessibility-report-resolver";
import { SERVER_ENDPOINTS } from "../utilities/server-endpoints";
import { BASE_URL } from "../utilities/base-url";
import { contactUsResolver } from "./resolvers/contact-us-resolver";

export const handlers = [
    rest.get(`${BASE_URL()}/${SERVER_ENDPOINTS.CATEGORIES}`, productionCategoriesResolver()),
    rest.get(`${BASE_URL()}/${SERVER_ENDPOINTS.BUSINESSES}`, productionBusinessesResolver()),
    rest.post(`${BASE_URL()}/${SERVER_ENDPOINTS.CONTACT_US}`, contactUsResolver),
    rest.post(`${BASE_URL()}/${SERVER_ENDPOINTS.ACCESSIBILITY_ISSUES}`, accessibilityReportResolver),
];
