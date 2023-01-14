import { buildPostResolver, RequestCaveats } from "./post-resolver";
import { ContactFormData } from "../../pages/contact-us/ContactUs";

const descriptionMissingException: RequestCaveats<ContactFormData> = (data) => {
    if (!data.description) {
        return {
            statusCode: 400,
            body: {
                error: "FAKE SERVER SEZ: A message is required. Please ad a message and try again.",
            },
        };
    }
};

export const contactUsResolver = buildPostResolver<ContactFormData>({
    responseContent: { statusCode: 200 },
    requestCaveats: [
        descriptionMissingException,
    ],
});
