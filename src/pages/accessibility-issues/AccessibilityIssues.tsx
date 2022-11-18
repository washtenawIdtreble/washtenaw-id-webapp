import React, { useState } from "react";
import "../Pages.css";
import { Form } from "../../components/form/Form";
import { SERVER_ENDPOINTS } from "../../utilities/server-endpoints";

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
                <input id={"email"} autoComplete={"email"} name={"email"}/>
                <label htmlFor={"phone"}>Your phone number (optional)</label>
                <input id={"phone"} autoComplete={"tel"} name={"phone"}/>
                <label htmlFor={"description"}>What do you want to tell us? (required)</label>
                <textarea id={"description"} name={"description"}/>
            </Form>
        </div>
    );
};