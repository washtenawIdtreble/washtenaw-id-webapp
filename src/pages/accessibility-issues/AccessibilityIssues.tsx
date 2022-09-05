import React from "react";
import { useForm } from "../../hooks/useForm";
import "./AccessibilityIssues.css";

export type AccessibilityFormData = {
    name?: string
    email?: string
    phone?: string
    description: string
}

export const AccessibilityIssues = () => {
    const { onSubmit } = useForm("accessibility-issues");

    return (
        <form onSubmit={onSubmit} aria-labelledby={"form-label"} className={"container"}>
            <h1 id={"form-label"} className={"heading"}>Report Accessibility Issues</h1>
            <label htmlFor={"name"}>Your Name (optional)</label>
            <input id={"name"} autoComplete={"name"} name={"name"}/>
            <label htmlFor={"email"}>Your email (optional)</label>
            <input id={"email"} autoComplete={"email"} name={"email"}/>
            <label htmlFor={"phone"}>Your phone number (optional)</label>
            <input id={"phone"} autoComplete={"tel"} name={"phone"}/>
            <label htmlFor={"description"}>What do you want to tell us? (required)</label>
            <textarea id={"description"} name={"description"}/>
            <button type={"submit"} className={"submit"}>Submit</button>
        </form>
    );
};