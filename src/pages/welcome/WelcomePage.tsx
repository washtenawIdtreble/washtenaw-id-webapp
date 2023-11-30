import React from "react";
import { MainHeading } from "../../components/MainHeading";
import { AppLink } from "../../components/navigation/AppLink";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";

export const WELCOME_PAGE_HEADING = "Washtenaw ID in Ann Arbor";

export const WelcomePage = () => {
    return (<>
        <MainHeading>{WELCOME_PAGE_HEADING}</MainHeading>
        <div className={"text-page-container"}>
            <p className={"text-page-paragraph"}>All businesses in Ann Arbor are required to accept the Washtenaw
                County
                ID as proof of identity.</p>
            <p className={"text-page-paragraph"}>
                <AppLink className={"inline-link"} to={PAGE_ENDPOINTS.annArborLaw}>
                    Click here to learn more about Ann Arbor's law
                </AppLink>
            </p>
            <p className={"text-page-paragraph"}>
                If a business in Ann Arbor refused to accept your Washtenaw County ID, please tell us about your
                experience.&nbsp;
                <AppLink to={PAGE_ENDPOINTS.reportIdRefused} className={"inline-link"}>
                    Click here to contact us.
                </AppLink>
            </p>
        </div>
    </>);
};
