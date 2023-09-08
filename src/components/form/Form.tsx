import { ChildrenProps } from "../../utilities/children-props";
import React, { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import "./Form.css";
import "../userMessage/UserMessageNotification.css";
import { usePOST } from "../../hooks/fetch/usePost";
import { UserMessageNotification } from "../userMessage/UserMessageNotification";
import { FormProvider } from "../../contexts/FormContext";
import { Observable } from "../../utilities/observable";
import { SubmitLoadingIcon } from "./SubmitLoadingIcon";
import { useLiveRegionText } from "../../hooks/useLiveRegionText";

type FormProps = ChildrenProps & {
    ariaLabelledBy: string
    submitEndpoint: string
    successMessage: string
}

export const Form = ({ children, ariaLabelledBy, submitEndpoint, successMessage }: FormProps) => {
    const responseMessage = useRef<HTMLSpanElement>(null);

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [serverResponded, setServerResponded] = useState<boolean>(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [liveRegionText, setLiveRegionText] = useLiveRegionText("");

    const postFormData = usePOST(submitEndpoint);

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

    const [onSubmitObservable] = useState(new Observable());
    const [onClearObservable] = useState(new Observable());

    const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const foundInvalidFields = onSubmitObservable.notify();

        if (!foundInvalidFields) {

            const form = event.target as HTMLFormElement;
            setSubmitting(true);
            setLiveRegionText("submitting");

            const formData = extractFormData(form);

            postFormData(formData, (ok, _, error) => {
                setSubmitting(false);
                setServerResponded(true);

                if (ok) {
                    onClearObservable.notify();
                    setShowSuccessMessage(true);
                } else {
                    setErrorMessage(error);
                }
            });
        }
    }, [onSubmitObservable, setLiveRegionText, postFormData, onClearObservable]);

    return (<div className={"form-container"}>
            {showSuccessMessage &&
                <UserMessageNotification message={successMessage} clearMessage={removeResponseMessage}
                                         ref={responseMessage} className={"success"}/>
            }

            {errorMessage && <UserMessageNotification message={errorMessage} clearMessage={removeResponseMessage}
                                                      ref={responseMessage} className={"error"}/>
            }
            <form onSubmit={onSubmit} aria-labelledby={ariaLabelledBy} className={"form"}
                  data-testid={"form-component"}>
                <FormProvider onSubmit={onSubmitObservable} onClear={onClearObservable}>
                    {children}
                </FormProvider>
                <button type={"submit"}
                        className={`form-submit light-focus-outline ${submitting ? "disabled-form-submit" : ""}`}
                        aria-disabled={submitting}>
                    Submit
                    {submitting && <SubmitLoadingIcon/>}
                </button>
                <div aria-live={"polite"} data-testid={"form-live-region"} className={"visually-hidden"}>
                    {liveRegionText}
                </div>
            </form>
        </div>
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
