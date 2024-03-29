import React, { useState } from "react";
import "../Pages.css";
import { Form } from "../../components/form/Form";
import { SERVER_ENDPOINTS } from "../../utilities/server-endpoints";
import { FormField, FormFieldType } from "../../components/form/FormField";
import { validateEmail } from "../../hooks/form-validation/validateEmail";
import { validatePhone } from "../../hooks/form-validation/validatePhone";
import { validateRequired } from "../../hooks/form-validation/validateRequired";
import { MAIN_HEADING_ID, MainHeading } from "../../components/MainHeading";

export type ContactFormData = {
    name?: string;
    email?: string;
    phone?: string;
    comments: string;
};

export const CONTACT_PAGE_HEADING = "General Contact";
export const CONTACT_PAGE_IDENTIFIER = "general-contact";

export const ContactUs = () => {
    const [successMessage] = useState("Your message has been sent, thank you!");
    return (
        <>
            <MainHeading ariaLabel={CONTACT_PAGE_HEADING.toLocaleLowerCase()}>
                {CONTACT_PAGE_HEADING}
            </MainHeading>

            <Form
                successMessage={successMessage}
                ariaLabelledBy={MAIN_HEADING_ID}
                submitEndpoint={SERVER_ENDPOINTS.CONTACT_US}
            >
                <div className={"form-column-two-thirds"}>
                    <label htmlFor={"comments"}>
                        Questions/Comments (required)
                        <FormField
                            id={"comments"}
                            pageIdentifier={CONTACT_PAGE_IDENTIFIER}
                            name={"comments"}
                            validator={validateRequired}
                            inputType={FormFieldType.TEXTAREA}
                        />
                    </label>
                </div>
                
                <div className={"form-column-one-third"}>
                    <label>
                        Your Name (optional)
                        <FormField
                            id={"name"}
                            pageIdentifier={CONTACT_PAGE_IDENTIFIER}
                            autoComplete={"name"}
                            name={"name"}/>
                    </label>
                    <label htmlFor={"email"}>
                        Your email (optional)
                        <FormField
                            id={"email"}
                            pageIdentifier={CONTACT_PAGE_IDENTIFIER}
                            name={"email"}
                            validator={validateEmail}
                            autoComplete={"email"}
                        />
                    </label>
                    <label htmlFor={"phone"}>
                        Your phone number (optional)
                        <FormField
                            id={"phone"}
                            pageIdentifier={CONTACT_PAGE_IDENTIFIER}
                            name={"phone"}
                            validator={validatePhone}
                            autoComplete={"tel"}
                        />
                    </label>
                </div>
            </Form>
        </>
    );
};
