import React, { FormEvent } from "react";
import { POST } from "../../utilities/fetch";
import { AccessibilityFormData } from "../../mock-server/resolvers/accessibility-report-resolver";
import { BASE_URL } from "../../utilities/base-url";

export const AccessibilityIssues = () => {
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = extractFormData<AccessibilityFormData>(event.target as HTMLFormElement);

        POST(`${BASE_URL()}/accessibility-issues`, formData);
    };

    return (
        <form onSubmit={onSubmit} aria-labelledby={"form-label"}>
            <h1 id={"form-label"}>Report Accessibility Issues</h1>
            <label htmlFor={"name"}>Your Name (optional)</label>
            <input id={"name"} autoComplete={"name"} name={"name"}/>
            <label htmlFor={"email"}>Your Email (optional)</label>
            <input id={"email"} autoComplete={"email"} name={"email"}/>
            <label htmlFor={"description"}>What do you want to tell us? (required)</label>
            <textarea id={"description"} name={"description"}/>
            <button type={"submit"}>Submit</button>
        </form>
    );
};

//TODO: move this mess (into a hook that takes an onsubmit?) and clean up types
function extractFormData<T>(form: HTMLFormElement): T {
    const formData = new FormData(form);

    const output: T = {} as T;

    for (const formDatum of formData) {
        // @ts-ignore
        output[formDatum[0]] = formDatum[1];
    }

    return output;
}