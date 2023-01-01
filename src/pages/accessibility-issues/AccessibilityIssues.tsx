import React, { useState } from "react";
import "../Pages.css";
import { Form } from "../../components/form/Form";
import { SERVER_ENDPOINTS } from "../../utilities/server-endpoints";
import { FormField, FormFieldType } from "../../components/form/FormField";
import { validateEmail } from "../../hooks/form-validation/validateEmail";
import { validatePhone } from "../../hooks/form-validation/validatePhone";
import { validateRequired } from "../../hooks/form-validation/validateRequired";

export type AccessibilityFormData = {
    name?: string
    email?: string
    phone?: string
    description: string
}

export const AccessibilityIssues = () => {
    const [successMessage] = useState("Your issue has been reported, thank you!");
    return (
        <div className={"page-container"}>
            <h1 id={"form-label"} className={"page-heading"}>Report Accessibility Issues</h1>

            <Form successMessage={successMessage} ariaLabelledBy={"form-label"}
                  submitEndpoint={SERVER_ENDPOINTS.ACCESSIBILITY_ISSUES}>
                <label htmlFor={"name"}>Your Name (optional)</label>
                <input id={"name"} autoComplete={"name"} name={"name"}/>
                <label htmlFor={"email"}>Your email (optional)</label>
                <FormField id={"email"} name={"email"} validator={validateEmail} autocomplete={"email"}/>
                <label htmlFor={"phone"}>Your phone number (optional)</label>
                <FormField id={"phone"} name={"phone"} validator={validatePhone} autocomplete={"tel"}/>
                <label htmlFor={"description"}>What do you want to tell us? (required)</label>
                <FormField id={"description"} name={"description"} validator={validateRequired}
                           inputType={FormFieldType.TEXTAREA}/>
            </Form>
        </div>
    );
};