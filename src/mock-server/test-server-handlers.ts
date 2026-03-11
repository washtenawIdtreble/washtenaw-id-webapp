import { DefaultRequestMultipartBody, ResponseResolver, rest, RestContext, RestRequest } from "msw";
import { accessibilityReportResolver } from "./resolvers/accessibility-report-resolver";
import { BASE_URL } from "../utilities/base-url";
import { SERVER_ENDPOINTS } from "../utilities/server-endpoints";
import { contactUsResolver } from "./resolvers/contact-us-resolver";

export type RequestResolver = ResponseResolver<RestRequest<never>, RestContext, Record<string, any> | DefaultRequestMultipartBody | string | number | boolean | null | undefined>

export const handlers = [
    rest.post(`${BASE_URL()}/${SERVER_ENDPOINTS.CONTACT_US}`, contactUsResolver),
    rest.post(`${BASE_URL()}/${SERVER_ENDPOINTS.ACCESSIBILITY_ISSUES}`, accessibilityReportResolver),
];
