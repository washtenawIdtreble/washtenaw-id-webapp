import React, { useState } from "react";
import "../Pages.css";
import { Form } from "../../components/form/Form";
import { SERVER_ENDPOINTS } from "../../utilities/server-endpoints";
import { FormField, FormFieldType } from "../../components/form/FormField";
import { validateEmail } from "../../hooks/form-validation/validateEmail";
import { validatePhone } from "../../hooks/form-validation/validatePhone";
import { validateRequired } from "../../hooks/form-validation/validateRequired";
import { MAIN_HEADING_ID, MainHeading } from "../../components/MainHeading";

export type IdRefusedFormData = {
    name?: string;
    email?: string;
    phone?: string;
    businessName: string;
    businessStreet: string;
    businessCity?: string;
    whenRefused?: string
    ageRange?: string;
    description?: string;
};

export const ID_REFUSED_PAGE_HEADING = "Report Refusal of ID";
export const ID_REFUSED_PAGE_IDENTIFIER = "report-id-refused";

export const ReportIdRefused = () => {
    const [successMessage] = useState("Your message has been sent, thank you!");
    return (
        <>
            <MainHeading ariaLabel={ID_REFUSED_PAGE_HEADING.toLocaleLowerCase()}>
                {ID_REFUSED_PAGE_HEADING}
            </MainHeading>

            <Form
                successMessage={successMessage}
                ariaLabelledBy={MAIN_HEADING_ID}
                submitEndpoint={SERVER_ENDPOINTS.ID_REFUSED}
            >
                <label className={"form-label"}>
                    Your Name (optional)
                    <FormField
                        id={"name"}
                        pageIdentifier={ID_REFUSED_PAGE_IDENTIFIER}
                        autoComplete={"name"}
                        name={"name"}/>
                </label>
                <label htmlFor={"email"} className={"form-label"}>
                    Your email (optional)
                    <FormField
                        id={"email"}
                        pageIdentifier={ID_REFUSED_PAGE_IDENTIFIER}
                        name={"email"}
                        validator={validateEmail}
                        autoComplete={"email"}
                    />
                </label>
                <label htmlFor={"phone"} className={"form-label"}>
                    Your phone number (optional)
                    <FormField
                        id={"phone"}
                        pageIdentifier={ID_REFUSED_PAGE_IDENTIFIER}
                        name={"phone"}
                        validator={validatePhone}
                        autoComplete={"tel"}
                    />
                </label>

                <label htmlFor={"business-name"} className={"form-label"}>
                    Name of Business (required)
                    <FormField
                        id={"business-name"}
                        pageIdentifier={ID_REFUSED_PAGE_IDENTIFIER}
                        name={"businessName"}/>
                </label>
                <label htmlFor={"business-street"} className={"form-label"}>
                    What street is the business on? (required)
                    <FormField
                        id={"business-street"}
                        pageIdentifier={ID_REFUSED_PAGE_IDENTIFIER}
                        name={"businessStreet"}
                    />
                </label>
                <label htmlFor={"business-city"} className={"form-label"}>
                    What city is the business in? (required)
                    <FormField
                        id={"business-city"}
                        pageIdentifier={ID_REFUSED_PAGE_IDENTIFIER}
                        name={"businessCity"}
                    />
                </label>
                <label htmlFor={"when-refused"} className={"form-label"}>
                    When did this happen? (day and time) (optional)
                    <FormField
                        id={"when-refused"}
                        pageIdentifier={ID_REFUSED_PAGE_IDENTIFIER}
                        name={"whenRefused"}
                    />
                </label>

                <label htmlFor={"age-range"} className={"form-label"}>
                    Your age (optional)
                    <FormField
                        id={"age-range"}
                        pageIdentifier={ID_REFUSED_PAGE_IDENTIFIER}
                        name={"ageRange"}
                    />
                </label>

                <label htmlFor={"description"} className={"form-label textarea-label"}>
                    What do you want to tell us? (required)
                    <FormField
                        id={"description"}
                        pageIdentifier={ID_REFUSED_PAGE_IDENTIFIER}
                        name={"description"}
                        validator={validateRequired}
                        inputType={FormFieldType.TEXTAREA}
                    />
                </label>
            </Form>
        </>
    );
};
