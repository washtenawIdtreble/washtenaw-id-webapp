import React from "react";
import { MainHeading } from "../../components/MainHeading";
import { OpensInANewTabLink } from "../../components/OpensInNewTab/OpensInANewTabLink";
import { AppLink } from "../../components/navigation/AppLink";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";
import "./WelcomePage.css";

export const WELCOME_PAGE_HEADING = "Washtenaw ID in Ann Arbor";

export const WelcomePage = () => {
    return (<>
        <MainHeading>{WELCOME_PAGE_HEADING}</MainHeading>
        <div className={"welcome-page-container"}>
            <p className={"welcome-page-paragraph"}>All businesses in Ann Arbor are required to accept the Washtenaw
                County
                ID as proof of identity.</p>
            <p className={"welcome-page-paragraph"}><OpensInANewTabLink className={"inline-link"}
                                                                        href={"https://library.municode.com/mi/ann_arbor/codes/code_of_ordinances?nodeId=TITIXPORE_CH112NSC_9_150IN"}>See
                the law on Municode</OpensInANewTabLink></p>
            <p className={"welcome-page-paragraph"}>
                If a business in Ann Arbor refused to accept your Washtenaw County ID, please tell us about your
                experience.&nbsp;
                <AppLink to={PAGE_ENDPOINTS.reportIdRefused} className={"inline-link"}>
                    Click here to contact us.
                </AppLink>
            </p>
        </div>
    </>);
};
