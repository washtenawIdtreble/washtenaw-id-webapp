import React, { useState } from "react";
import "../Pages.css";
import { Form } from "../../components/form/Form";
import { SERVER_ENDPOINTS } from "../../utilities/server-endpoints";
import { FormField, FormFieldType } from "../../components/form/FormField";
import { validateEmail } from "../../hooks/form-validation/validateEmail";
import { validatePhone } from "../../hooks/form-validation/validatePhone";
import { validateRequired } from "../../hooks/form-validation/validateRequired";
import { MainHeading } from "../../components/MainHeading";

export type ContactFormData = {
    name?: string
    email?: string
    phone?: string
    description: string
}

export const CONTACT_PAGE_HEADING = "Contact Us";

export const ContactUs = () => {
    const [successMessage] = useState("Your message has been sent, thank you!");
    return (
        <>
            <MainHeading id={"form-label"} ariaLabel={CONTACT_PAGE_HEADING.toLocaleLowerCase()}>
                {CONTACT_PAGE_HEADING}
            </MainHeading>

            <Form successMessage={successMessage} ariaLabelledBy={"form-label"}
                  submitEndpoint={SERVER_ENDPOINTS.CONTACT_US}>
                <label htmlFor={"name"} className={"form-label"}>Your Name (optional)</label>
                <FormField id={"name"} autoComplete={"name"} name={"name"}/>
                <label htmlFor={"email"} className={"form-label"}>Your email (optional)</label>
                <FormField id={"email"} name={"email"} validator={validateEmail} autoComplete={"email"}/>
                <label htmlFor={"phone"} className={"form-label"}>Your phone number (optional)</label>
                <FormField id={"phone"} name={"phone"} validator={validatePhone} autoComplete={"tel"}/>
                <label htmlFor={"description"} className={"form-label"}>What do you want to tell us? (required)</label>
                <FormField id={"description"} name={"description"} validator={validateRequired}
                           inputType={FormFieldType.TEXTAREA}/>
            </Form>
        </>
    );
};