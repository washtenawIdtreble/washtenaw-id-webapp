import { AccessibilityFormData } from "../../pages/accessibility-issues/AccessibilityIssues";
import { buildPostResolver, RequestCaveats } from "./post-resolver";

const descriptionMissingException: RequestCaveats<AccessibilityFormData> = (data) => {
    if (!data.comments) {
        return {
            statusCode: 400,
            body: {
                error: "FAKE SERVER SEZ: The issue description is required. Please describe the issue you had and try again.",
            },
        };
    }
};

export const accessibilityReportResolver = buildPostResolver<AccessibilityFormData>({
    responseContent: { statusCode: 200 },
    requestCaveats: [
        descriptionMissingException,
    ],
});
