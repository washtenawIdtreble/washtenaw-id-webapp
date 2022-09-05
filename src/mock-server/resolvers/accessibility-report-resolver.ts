import { RequestResolver } from "../test-server-handlers";
import { AccessibilityFormData } from "../../pages/accessibility-issues/AccessibilityIssues";

export const accessibilityIssuesResolver = (statusCode?: number, captor?: (data: AccessibilityFormData) => void): RequestResolver => {
    return (request, response, context) => {
        const data = request.body as AccessibilityFormData;

        if (captor) {
            captor(data);
        }

        if (!data.description) {
            return response(context.status(400), context.json({ error: "FAKE SERVER SEZ: The issue description is required. Please describe the issue you had and try again." }));
        }

        return response(context.status(statusCode || 200));
    };
};
