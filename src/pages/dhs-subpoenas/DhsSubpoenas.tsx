import React from "react";
import { MainHeading } from "../../components/MainHeading";
import "./DhsSubpoenas.css";
import { OpensInANewTabLink } from "../../components/OpensInNewTab/OpensInANewTabLink";

export const DHS_SUBPOENAS_HEADING = "DHS Subpoenas Washtenaw County";
export const DHS_SUBPOENAS_DOCUMENT_TITLE = "DHS Subpoenas Washtenaw County";

export const DhsSubpoenas = () => {
    return (
        <>
            <MainHeading>{DHS_SUBPOENAS_HEADING}</MainHeading>
            <div className={"text-page-container"}>
                <div className={"text-page-section"}>
                    <h2 className={"text-page-section-heading"}>What happened?</h2>
                    <p className={"text-page-paragraph"}> The U.S. Department of Homeland Security (DHS) sent Washtenaw
                        County a legal demand (called a subpoena) on April 10, 2025. The subpoena asked for records on
                        everyone who applied for a County ID between May 2019 and April 2025.</p>
                    <p className={"text-page-paragraph"}>The county refused. On May 6, 2025, the county's attorney sent
                        DHS a letter saying the county will not hand over any records unless a court orders them to. The
                        county has hired a law firm to defend this position if DHS pushes back.</p>
                </div>
                <div className={"text-page-section"}>
                    <h2 className={"text-page-section-heading"}>What does this mean for you?</h2>
                    <p className={"text-page-paragraph"}>The county only keeps records for one year, so information on
                        people who applied for the ID from 2019 through 2024 has been erased and cannot be handed over
                        to the DHS.</p>
                    <p className={"text-page-paragraph"}>As of the most recent reporting, your information has not been
                        given to DHS. The county is protecting your records. If a federal court orders the county to
                        comply, it may have to turn over records. The county says it will fight any such order. Its
                        legal team is prepared to go to court if needed.
                    </p>
                </div>
                <div className={"text-page-section"}>
                    <h2 className={"text-page-section-heading"}>Citations</h2>
                    <ul className={"citations-list"}>
                        <li>
                            <OpensInANewTabLink
                                href={"https://www.mlive.com/news/ann-arbor/2025/04/feds-demand-info-on-washtenaw-county-program-giving-ids-to-immigrants-homeless-and-others.html"}
                            > MLive: "Feds demand info on Washtenaw County program giving IDs to immigrants, homeless
                                and others" <time
                                    dateTime="2025-04-14">April 14, 2025</time>
                            </OpensInANewTabLink>
                        </li>
                        <li>
                            <OpensInANewTabLink
                                href={"https://www.mlive.com/news/ann-arbor/2025/05/washtenaw-county-refuses-to-hand-over-county-id-records-to-feds-amid-immigration-probe.html"}
                            > MLive: "Washtenaw County refuses to hand over county ID records to feds amid immigration
                                probe" <time
                                    dateTime="2025-05-14">May 14, 2025</time>
                            </OpensInANewTabLink>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
