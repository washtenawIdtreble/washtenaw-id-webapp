import React from "react";
import { MainHeading } from "../../components/MainHeading";
import { OpensInANewTabLink } from "../../components/OpensInNewTab/OpensInANewTabLink";

export const ANN_ARBOR_LAW_SUMMARY_HEADING = "Summary of Ann Arbor's Law";

export const AnnArborLawSummary = () => {
    return (
        <div className={"text-page-container"}>
            <MainHeading>{ANN_ARBOR_LAW_SUMMARY_HEADING}</MainHeading>
            <p className={"text-page-paragraph"}>
                The City of Ann Arbor’s Non-discrimination law makes it illegal to discriminate against someone based on
                their government-issued ID card. That means a business must accept a Washtenaw County ID card as proof
                of
                identity just like they will accept a State of Michigan driver’s license.
            </p>
            <p className={"text-page-paragraph"}>
                They cannot deny you service only because you want to use a Washtenaw County ID card as proof of your
                identity. It’s their responsibility to recognize the ID - they cannot refuse to accept it because
                they’ve
                never seen it before. It is issued by Washtenaw County in Ann Arbor, and mentioned by name in Ann
                Arbor’s
                law.
            </p>
            <p className={"text-page-paragraph"}>
                The law allows you to use the Washtenaw County ID card to prove your identity for housing, employment,
                buying age-restricted goods like cigarettes and alcohol, and other public accommodations.
            </p>
            <p className={"text-page-paragraph"}>
                The full text of Ann Arbor’s non-discrimination law is in Title IX, Chapter 112, Section 9:150 - 9:164.
            </p>
            <p className={"text-page-paragraph"}>
                <OpensInANewTabLink
                    href={"https://library.municode.com/mi/ann_arbor/codes/code_of_ordinances?nodeId=TITIXPORE_CH112NSC_9_150IN"}>
                    Click here to see the full text of the law on Municode.
                </OpensInANewTabLink>
            </p>
        </div>
    );
};
