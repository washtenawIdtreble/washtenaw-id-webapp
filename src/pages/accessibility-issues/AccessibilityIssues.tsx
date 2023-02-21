import React, { useState } from "react";
import "../Pages.css";
import { Form } from "../../components/form/Form";
import { SERVER_ENDPOINTS } from "../../utilities/server-endpoints";
import { FormField, FormFieldType } from "../../components/form/FormField";
import { validateEmail } from "../../hooks/form-validation/validateEmail";
import { validatePhone } from "../../hooks/form-validation/validatePhone";
import { validateRequired } from "../../hooks/form-validation/validateRequired";
import { MainHeading } from "../../components/MainHeading";

export type AccessibilityFormData = {
    name?: string
    email?: string
    phone?: string
    description: string
}

export const ACCESSIBILITY_PAGE_HEADING = "Report Accessibility Issues";

export const AccessibilityIssues = () => {
    const [successMessage] = useState("Your issue has been reported, thank you!");
    return (
        <>
            <MainHeading id={"form-label"}>{ACCESSIBILITY_PAGE_HEADING}</MainHeading>

            <Form successMessage={successMessage} ariaLabelledBy={"form-label"}
                  submitEndpoint={SERVER_ENDPOINTS.ACCESSIBILITY_ISSUES}>
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