import React from "react";
import "../Pages.css";
import { Form } from "../../components/form/Form";
import { SERVER_ENDPOINTS } from "../../utilities/server-endpoints";
import { FormField, FormFieldType } from "../../components/form/FormField";
import { validateEmail } from "../../hooks/form-validation/validateEmail";
import { validatePhone } from "../../hooks/form-validation/validatePhone";
import { validateRequired } from "../../hooks/form-validation/validateRequired";
import { MAIN_HEADING_ID, MainHeading } from "../../components/MainHeading";

export const ACCESSIBILITY_PAGE_HEADING = "Doubled Labels";
export const ACCESSIBILITY_PAGE_IDENTIFIER = "accessibility-issues";

export const LabelIssues = () => {
    return (
        <>
            <MainHeading>{ACCESSIBILITY_PAGE_HEADING}</MainHeading>
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
                <div className={"form-column-two-thirds"}>
                    <label htmlFor={"comments"}>
                        Questions/Comments (required)
                        <FormField
                            id={"comments"}
                            pageIdentifier={ACCESSIBILITY_PAGE_IDENTIFIER}
                            name={"comments"}
                            validator={validateRequired}
                            inputType={FormFieldType.TEXTAREA}
                        />
                    </label>
                </div>
            </Form>
        </>
    );
};
