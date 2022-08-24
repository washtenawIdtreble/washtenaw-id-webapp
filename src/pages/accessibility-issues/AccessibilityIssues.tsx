import React from "react";
import "./AccessibilityIssues.css";
import { Form } from "../../components/Form";
import { SERVER_ENDPOINTS } from "../../utilities/server-endpoints";

export type AccessibilityFormData = {
    name?: string
    email?: string
    phone?: string
    description: string
}

export const AccessibilityIssues = () => {
    return (<>
            <h1 id={"form-label"} className={"heading"}>Report Accessibility Issues</h1>
            <Form ariaLabelledBy={"form-label"} submitEndpoint={SERVER_ENDPOINTS.ACCESSIBILITY_ISSUES}>
                <label htmlFor={"name"}>Your Name (optional)</label>
                <input id={"name"} autoComplete={"name"} name={"name"}/>
                <label htmlFor={"email"}>Your email (optional)</label>
                <input id={"email"} autoComplete={"email"} name={"email"}/>
                <label htmlFor={"phone"}>Your phone number (optional)</label>
                <input id={"phone"} autoComplete={"tel"} name={"phone"}/>
                <label htmlFor={"description"}>What do you want to tell us? (required)</label>
                <textarea id={"description"} name={"description"}/>
            </Form>
        </>
    );
};