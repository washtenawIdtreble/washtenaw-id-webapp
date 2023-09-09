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
    description: string;
};

export const CONTACT_PAGE_HEADING = "Contact Us";
export const CONTACT_PAGE_IDENTIFIER = "contact-us";

export const ContactUs = () => {
    const [successMessage] = useState('Your message has been sent, thank you!');
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
                <label className={"form-label"}>
                    Your Name (optional)
                    <FormField
                        id={"name"}
                        pageIdentifier={CONTACT_PAGE_IDENTIFIER}
                        autoComplete={"name"}
                        name={"name"}/>
                </label>
                <label htmlFor={"email"} className={"form-label"}>
                    Your email (optional)
                    <FormField
                        id={"email"}
                        pageIdentifier={CONTACT_PAGE_IDENTIFIER}
                        name={"email"}
                        validator={validateEmail}
                        autoComplete={"email"}
                    />
                </label>
                <label htmlFor={"phone"} className={"form-label"}>
                    Your phone number (optional)
                    <FormField
                        id={"phone"}
                        pageIdentifier={CONTACT_PAGE_IDENTIFIER}
                        name={"phone"}
                        validator={validatePhone}
                        autoComplete={"tel"}
                    />
                </label>
                <label htmlFor={"description"} className={"form-label textarea-label"}>
                    What do you want to tell us? (required)
                    <FormField
                        id={"description"}
                        pageIdentifier={CONTACT_PAGE_IDENTIFIER}
                        name={"description"}
                        validator={validateRequired}
                        inputType={FormFieldType.TEXTAREA}
                    />
                </label>
            </Form>
        </>
    );
};
