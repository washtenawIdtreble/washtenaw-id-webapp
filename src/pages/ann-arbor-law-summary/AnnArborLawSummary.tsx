import React from "react";
import { MainHeading } from "../../components/MainHeading";
import { OpensInANewTabLink } from "../../components/OpensInNewTab/OpensInANewTabLink";
import "./AnnArborLawSummary.css";
import { AppLink } from "../../components/navigation/AppLink";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";

export const ANN_ARBOR_LAW_SUMMARY_HEADING = "Accepting the Washtenaw ID is the Law in Ann Arbor";
export const ANN_ARBOR_LAW_SUMMARY_DOCUMENT_TITLE = "Ann Arbor Law";

export const ANN_ARBOR_LAW_SUMMARY_SECTION_1_ID = "section-1";
export const ANN_ARBOR_LAW_SUMMARY_SECTION_2_ID = "section-2";
export const ANN_ARBOR_LAW_SUMMARY_SECTION_3_ID = "section-3";
export const ANN_ARBOR_LAW_SUMMARY_SECTION_4_ID = "section-4";
export const ANN_ARBOR_LAW_SUMMARY_SECTION_5_ID = "section-5";
export const ANN_ARBOR_LAW_SUMMARY_SECTION_6_ID = "section-6";

export const AnnArborLawSummary = () => {
    return (<>
            <MainHeading>{ANN_ARBOR_LAW_SUMMARY_HEADING}</MainHeading>
            <div className={"text-page-container"}>

                <nav aria-labelledby={"table-of-contents-heading"}>
                    <h2 className={"table-of-contents-heading"} id={"table-of-contents-heading"}>Table of Contents</h2>
                    <ol type={"I"} className={"table-of-contents-list"}>
                        <li className={"table-of-contents-list-item"}>
                            <a href={`#${ANN_ARBOR_LAW_SUMMARY_SECTION_1_ID}`}>
                                Refusing the Washtenaw ID is against the law in Ann Arbor
                            </a>
                        </li>
                        <li className={"table-of-contents-list-item"}>
                            <a href={`#${ANN_ARBOR_LAW_SUMMARY_SECTION_2_ID}`}>
                                The Washtenaw ID is a valid government-issued ID card
                            </a>
                        </li>
                        <li className={"table-of-contents-list-item"}>
                            <a href={`#${ANN_ARBOR_LAW_SUMMARY_SECTION_3_ID}`}>
                                Unfamiliarity with the Washtenaw ID is no excuse
                            </a>
                        </li>
                        <li className={"table-of-contents-list-item"}>
                            <a href={`#${ANN_ARBOR_LAW_SUMMARY_SECTION_4_ID}`}>
                                Alcohol can be purchased with the Washtenaw ID
                            </a>
                        </li>
                        <li className={"table-of-contents-list-item"}>
                            <a href={`#${ANN_ARBOR_LAW_SUMMARY_SECTION_5_ID}`}>
                                Prescription medication can be purchased with the Washtenaw ID
                            </a>
                        </li>
                        <li className={"table-of-contents-list-item"}>
                            <a href={`#${ANN_ARBOR_LAW_SUMMARY_SECTION_6_ID}`}>
                                Investigation by the city's Human Rights Commission
                            </a>
                        </li>
                    </ol>
                </nav>

                <div className={"law-page-section"}>
                    <h2 id={ANN_ARBOR_LAW_SUMMARY_SECTION_1_ID} className={"law-page-section-heading"} tabIndex={-1}>
                        I. Refusing the Washtenaw ID is against the law in Ann Arbor
                    </h2>

                    <p className={"text-page-paragraph"}>
                        Ann Arbor finds the practice of denying service to otherwise eligible individuals based on the
                        type of government-issued ID they carry, discriminatory. Municipal Code Chapter 112 makes this
                        practice unlawful. Pursuant to the City's Non-Discrimination Ordinance: All government-issued ID
                        cards must be accepted as valid unless a state or federal law mandates that a specific type of
                        ID be used for a specific purpose.
                    </p>
                    <p className={"text-page-paragraph"}>
                        The relevant part of the law states that: "(6) No person shall discriminate against individuals
                        based on their use of a government-issued identification card and all persons shall accept a
                        government-issued identification card as valid identification..." absent very specific statutory
                        mandate not present in everyday transactions.
                        <span className={"citation-link-container"}>
                            <OpensInANewTabLink
                                href={"https://library.municode.com/mi/ann_arbor/codes/code_of_ordinances?nodeId=TITIXPORE_CH112NSC_9_155OTPRPR"}
                                className={"citation-link"}
                            >
                                ANN ARBOR MUNICIPAL CODE CHAPTER 112, SECTION 9:155, SUBSECTION 6
                            </OpensInANewTabLink>
                        </span>
                    </p>
                </div>

                <div className={"law-page-section"}>
                    <h2 id={ANN_ARBOR_LAW_SUMMARY_SECTION_2_ID} className={"law-page-section-heading"} tabIndex={-1}>
                        II. The Washtenaw ID is a valid government-issued ID card. By statute it is equivalent to all
                        other state and federal issued ID
                    </h2>
                    <p className={"text-page-paragraph"}>
                        The law, in relevant part provides that: "A government-issued identification card is any
                        identification document displaying an individual's photograph and identifying information issued
                        by a federal, state, or local government (including a Washtenaw County identification card) to
                        an individual for the purpose of identification of that individual."
                        <span className={"citation-link-container"}>
                            <OpensInANewTabLink
                                href={"https://library.municode.com/mi/ann_arbor/codes/code_of_ordinances?nodeId=TITIXPORE_CH112NSC_9_151DE"}
                                className={"citation-link"}
                            >
                                ANN ARBOR MUNICIPAL CODE CHAPTER 112, SECTION 9:151, SUBSECTION 15
                            </OpensInANewTabLink>
                        </span>
                    </p>
                </div>

                <div className={"law-page-section"}>
                    <h2 id={ANN_ARBOR_LAW_SUMMARY_SECTION_3_ID} className={"law-page-section-heading"} tabIndex={-1}>
                        III. Lack of familiarity with the Washtenaw ID is not a legal justification for denying equal
                        access to goods and services
                    </h2>
                    <p className={"text-page-paragraph"}>
                        All persons presenting a current photo ID issued by a government of the United States,
                        (including local government ID cards like the Washtenaw ID) are entitled to full and equal
                        access to goods and services. Lack of familiarity with a particular government-issued ID does
                        not constitute legitimate grounds for the human rights violation inherent in withholding access
                        to necessary goods and services.
                        <span className={"citation-link-container"}>
                            <OpensInANewTabLink
                                href={"https://library.municode.com/mi/ann_arbor/codes/code_of_ordinances?nodeId=TITIXPORE_CH112NSC_9_150IN"}
                                className={"citation-link"}
                            >
                                ANN ARBOR MUNICIPAL CODE CHAPTER 112, SECTION 9:150
                            </OpensInANewTabLink>
                        </span>
                    </p>
                </div>

                <div className={"law-page-section"}>
                    <h2 id={ANN_ARBOR_LAW_SUMMARY_SECTION_4_ID} className={"law-page-section-heading"} tabIndex={-1}>
                        IV. Alcohol can be purchased with the Washtenaw ID
                    </h2>
                    <p className={"text-page-paragraph"}>
                        You do not need a state ID to purchase alcohol in Michigan. MI law requires a "...bona fide
                        picture identification which establishes the identity and age of the person."
                    </p>
                    <p className={"text-page-paragraph"}
                    >
                        A relevant part the statute requires that sellers make "...a diligent good faith effort to
                        determine the age of the person, which includes at least an examination of...bona fide picture
                        identification which establishes the identity and age of the person."
                        <span className={"citation-link-container"}>
                            <OpensInANewTabLink
                                href={"https://www.legislature.mi.gov/(S(rvyziyt3emr4l2nydyymkrko))/mileg.aspx?page=getObject&objectName=mcl-436-1701"}
                                className={"citation-link"}
                            >
                                MICHIGAN COMPILED LAWS 436.1701 SECTION 701 SUBSECTION 11 (B) (i)
                            </OpensInANewTabLink>
                        </span>
                    </p>
                </div>

                <div className={"law-page-section"}>
                    <h2 id={ANN_ARBOR_LAW_SUMMARY_SECTION_5_ID} className={"law-page-section-heading"} tabIndex={-1}>
                        V. Prescription medication and cold medicine can be purchased with the Washtenaw ID
                    </h2>
                    <p className={"text-page-paragraph"}>
                        You do not need a state ID to purchase restricted prescribed medication nor is a state ID
                        required for ephedrine or pseudoephedrine at adult doses in Michigan. MI law requires "...a
                        valid government-issued photo identification that includes the individual's name and date of
                        birth." The pharmacy is required to document the type of ID used, the purchasers information,
                        and may ask the purchaser to sign a log.
                        <span className={"citation-link-container"}>
                            <OpensInANewTabLink
                                href={"https://www.legislature.mi.gov/(S(rvyziyt3emr4l2nydyymkrko))/mileg.aspx?page=getObject&objectName=mcl-333-17766e"}
                                className={"citation-link"}
                            >
                                MICHIGAN COMPILED LAWS 333.17766e SECTION 17766e SUBSECTION 2 (A)
                            </OpensInANewTabLink>
                        </span>
                    </p>
                </div>

                <div className={"law-page-section"} data-testid={"section-6"}>
                    <h2 id={ANN_ARBOR_LAW_SUMMARY_SECTION_6_ID} className={"law-page-section-heading"} tabIndex={-1}>
                        VI. Washtenaw ID discrimination is investigated by the city's Human Rights Commission
                    </h2>
                    <p className={"text-page-paragraph"}>
                        The City of Ann Arbor's Human Rights Commission is authorized to "Receive and review complaints
                        from individuals alleging violations of Ann Arbor's human rights ordinance and take appropriate
                        action, including but not limited to referral of complaints to appropriate agencies or to the
                        City Attorney mediation of complaints, or dismissal of complaints"
                        <span className={"citation-link-container"}>
                            <OpensInANewTabLink
                                href={"https://library.municode.com/mi/ann_arbor/codes/code_of_ordinances?nodeId=TITIAD_CH8ORBOCO_1_222SAUT"}
                                className={"citation-link"}
                            >
                                ANN ARBOR MUNICIPAL CODE CHAPTER 8, SECTION 1:222 (a)
                            </OpensInANewTabLink>
                        </span>
                    </p>
                    <p className={"text-page-paragraph"}>
                        If you have questions or want to report ID discrimination, you can contact the Human Rights
                        Commission by phone or email at the links below.
                    </p>
                    <ul className={"contact-list"}>
                        <li className={"contact-list-item"}>Office Phone:&nbsp;<a href={"tel:+1(734)794-6291"}>(734)
                            794-6291</a></li>
                        <li className={"contact-list-item"}>Email:&nbsp;<a
                            href={"mailto:hrc@a2gov.org"}>hrc@a2gov.org</a></li>
                        <li className={"contact-list-item"}>Ann Arbor city staff liaison Kennedi Blair
                            Cummings: &nbsp;<a
                                href={"mailto:kcummings@a2gov.org"}>kcummings@a2gov.org</a></li>
                    </ul>
                    <p className={"text-page-paragraph"}>
                        You can also contact the Washtenaw ID Project directly through this website.&nbsp;
                        <AppLink to={PAGE_ENDPOINTS.reportIdRefused} className={"inline-link"}>
                            Click here to contact us.
                        </AppLink>
                    </p>
                </div>
            </div>
        </>
    );
};
