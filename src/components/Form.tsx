import { ChildrenProps } from "../utilities/children-props";
import React, { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { POST } from "../utilities/fetch";
import { BASE_URL } from "../utilities/base-url";
import "./Form.css";

type FormProps = ChildrenProps & {
    ariaLabelledBy: string
    submitEndpoint: string
}

export const Form = ({ children, ariaLabelledBy, submitEndpoint }: FormProps) => {
    const unmounted = useRef(false);
    const responseMessage = useRef<HTMLSpanElement>(null);

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [serverResponded, setServerResponded] = useState<boolean>(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const liveRegion = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        return () => {
            unmounted.current = true;
        };
    }, []);

    useEffect(() => {
        if (serverResponded) {
            setTimeout(() => {
                responseMessage.current?.focus();
            }, 500);
            setServerResponded(false);
        }
    }, [serverResponded]);

    const removeResponseMessage = useCallback(() => {
        setShowSuccessMessage(false);
        setErrorMessage("");
    }, []);

    const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        setSubmitting(true);

        const formData = extractFormData(form);
        const { responsePromise, abort } = POST(`${BASE_URL()}/${submitEndpoint}`, formData);

        const response = await responsePromise;

        if (!unmounted.current) {
            setSubmitting(false);
            setServerResponded(true);
            if (response.ok) {
                form.reset();
                setShowSuccessMessage(true);
            } else {
                const body = await response.json();
                setErrorMessage(body.error);
            }
        }
    }, [submitEndpoint]);

    return (<>
            {showSuccessMessage &&
                <span tabIndex={-1} onBlur={removeResponseMessage} ref={responseMessage}>Your issue has been reported, thank you!</span>}
            {errorMessage &&
                <span tabIndex={-1} onBlur={removeResponseMessage} ref={responseMessage}>{errorMessage}</span>}
            <form onSubmit={onSubmit} aria-labelledby={ariaLabelledBy} className={"container"}
                  data-testid={"form-component"}>
                {children}
                <button type={"submit"} className={"submit"} disabled={submitting}>Submit</button>
                <div aria-live={"polite"} ref={liveRegion} data-testid={"live-region"}>
                    {submitting && <span>Submitting...</span>}
                </div>
            </form>
        </>
    );
};

function extractFormData(form: HTMLFormElement) {
    const formData = new FormData(form);

    const output: any = {};

    for (const formEntry of formData) {
        output[formEntry[0]] = formEntry[1];
    }

    return output;
}