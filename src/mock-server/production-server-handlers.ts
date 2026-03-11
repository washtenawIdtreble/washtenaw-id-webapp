import { rest } from "msw";
import { accessibilityReportResolver } from "./resolvers/accessibility-report-resolver";
import { SERVER_ENDPOINTS } from "../utilities/server-endpoints";
import { BASE_URL } from "../utilities/base-url";
import { contactUsResolver } from "./resolvers/contact-us-resolver";

export const handlers = [
    rest.post(`${BASE_URL()}/${SERVER_ENDPOINTS.CONTACT_US}`, contactUsResolver),
    rest.post(`${BASE_URL()}/${SERVER_ENDPOINTS.ACCESSIBILITY_ISSUES}`, accessibilityReportResolver),
];
