import React from "react";
import { MainHeading } from "../../components/MainHeading";
import { AppLink } from "../../components/navigation/AppLink";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";
import { idRefusalUpdates } from "../../data/idRefusalUpdates";
import "../Pages.css";

export const ID_REFUSAL_UPDATES_HEADING = "ID Refusal Updates";
export const ID_REFUSAL_UPDATES_DOCUMENT_TITLE = "ID Refusal Updates";

export const IdRefusalUpdates = () => {
    return (
        <>
            <MainHeading>{ID_REFUSAL_UPDATES_HEADING}</MainHeading>
            <h2 className={"heading-container"}>ID Refusal Updates</h2>
            <div className={"text-page-container"}>
                {idRefusalUpdates.map((update, index) => (
                    <div key={index} className={"text-page-paragraph"}>
                        <p>
                            A user reported that the {update.businessName} at {update.businessAddress} refused to accept
                            their ID. {update.outcome.followedUpBy} spoke with the {update.businessName} manager
                            on {update.outcome.date} and {update.outcome.result}.
                        </p>
                        <p>
                            <AppLink to={PAGE_ENDPOINTS.reportIdRefused} className={"inline-link"}> Please tell us if
                                this business refused to accept your ID. </AppLink> If they refused your ID after
                            January 15, 2024, please tell us what day and time they refused it so we can help them train
                            their staff
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};
