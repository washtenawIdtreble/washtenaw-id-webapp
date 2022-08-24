import React from "react";

export const AccessibilityIssues = () => {
    return (
        <form aria-labelledby={"form-label"}>
            <h1 id={"form-label"}>Report Accessibility Issues</h1>
            <label htmlFor={"name"}>Your Name (optional)</label>
            <input id={"name"} autoComplete={"name"}/>
            <label htmlFor={"email"}>Your Email (optional)</label>
            <input id={"email"} autoComplete={"email"}/>
            <label htmlFor={"description"}>What do you want to tell us? (required)</label>
            <textarea id={"description"}/>
        </form>
    );
};