import React, { useCallback, useRef, useState } from "react";
import "../Pages.css";
import "./ModalIssues.css";
import { Form } from "../../components/form/Form";
import { SERVER_ENDPOINTS } from "../../utilities/server-endpoints";
import { FormField } from "../../components/form/FormField";
import { validateEmail } from "../../hooks/form-validation/validateEmail";
import { validatePhone } from "../../hooks/form-validation/validatePhone";
import { MAIN_HEADING_ID, MainHeading } from "../../components/MainHeading";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

export const ACCESSIBILITY_PAGE_HEADING = "Focus Traps Don't Work For All";
export const ACCESSIBILITY_PAGE_IDENTIFIER = "accessibility-issues";

export const ModalIssues = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const focusRef = useRef(null);

    const open = useCallback(() => {
        setModalOpen(true);

        setTimeout(() => {
            document.getElementById("root")!.ariaHidden = "false";
        }, 1000);
        // Set aria-hidden to false on the root div and add some links to the modal. Reach does this right.
        // I want to demo what would happen if you tried to trap focus using keyboard events.
    }, []);

    const close = useCallback(() => {
        setModalOpen(false);
    }, []);

    return (
        <>
            <MainHeading>{ACCESSIBILITY_PAGE_HEADING}</MainHeading>
            <button onClick={open} className={"user-button"}>User Details</button>
            <Form
                successMessage={"success message"}
                ariaLabelledBy={MAIN_HEADING_ID}
                submitEndpoint={SERVER_ENDPOINTS.ACCESSIBILITY_ISSUES}
            >
                <div className={"form-column-one-third"}>
                    <label htmlFor={"name"}>
                        Name (optional)
                        <FormField id={"name"}
                                   pageIdentifier={ACCESSIBILITY_PAGE_IDENTIFIER}
                                   autoComplete={"name"}
                                   name={"name"} />
                    </label>
                    <label htmlFor={"email"}>
                        Email (optional)
                        <FormField
                            id={"email"}
                            pageIdentifier={ACCESSIBILITY_PAGE_IDENTIFIER}
                            name={"email"}
                            validator={validateEmail}
                            autoComplete={"email"}
                        />
                    </label>
                    <label htmlFor={"phone"}>
                        Phone number (optional)
                    </label>
                    <FormField
                        id={"phone"}
                        pageIdentifier={ACCESSIBILITY_PAGE_IDENTIFIER}
                        name={"phone"}
                        validator={validatePhone}
                        autoComplete={"tel"}
                    />
                </div>
            </Form>
            <Dialog initialFocusRef={focusRef} isOpen={modalOpen} onDismiss={close}>
                <h2 tabIndex={-1} ref={focusRef}>Name: Ryan Heisler</h2>
                <p>Occupation: Artisan</p>
                <p>Favorite Color: Wouldn't you like to know?</p>
                <button onClick={close} className={"user-button"}>Dismiss</button>
            </Dialog>
        </>
    );
};
