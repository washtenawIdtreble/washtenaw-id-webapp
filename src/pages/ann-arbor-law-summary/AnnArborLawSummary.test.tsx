import { ANN_ARBOR_LAW_SUMMARY_HEADING, AnnArborLawSummary } from "./AnnArborLawSummary";
import { render, screen } from "@testing-library/react";
import React from "react";
import { axe } from "jest-axe";
import { Container } from "react-dom";
import { OPENS_IN_A_NEW_TAB } from "../../components/OpensInNewTab/OpensInANewTabLink";

describe(AnnArborLawSummary.name, () => {
    let container: Container;
    beforeEach(() => {
        ({ container } = render(<AnnArborLawSummary/>));
    });
    test("exports its page heading", () => {
        expect(ANN_ARBOR_LAW_SUMMARY_HEADING).toBe("Summary of Ann Arbor's Law");
    });
    test("has no AxE violations", async () => {
        const page = await axe(container as Element);
        expect(page).toHaveNoViolations();
    });
    test("has an h1 that can be focused programmatically", () => {
        const h1: HTMLHeadingElement = screen.getByRole("heading", {
            level: 1,
            name: ANN_ARBOR_LAW_SUMMARY_HEADING,
        });
        expect(h1).toBeVisible();
        expect(h1.hasAttribute("tabindex")).toBe(true);
        expect(h1.tabIndex).toBe(-1);
    });
    test("has information about the law in Ann Arbor", () => {
        const paragrah1 = screen.getByText("The City of Ann Arbor’s Non-discrimination law makes it illegal to discriminate against someone based on their government-issued ID card. That means a business must accept a Washtenaw County ID card as proof of identity just like they will accept a State of Michigan driver’s license.");
        const paragrah2 = screen.getByText("They cannot deny you service only because you want to use a Washtenaw County ID card as proof of your identity. It’s their responsibility to recognize the ID - they cannot refuse to accept it because they’ve never seen it before. It is issued by Washtenaw County in Ann Arbor, and mentioned by name in Ann Arbor’s law.");
        const paragrah3 = screen.getByText("The law allows you to use the Washtenaw County ID card to prove your identity for housing, employment, buying age-restricted goods like cigarettes and alcohol, and other public accommodations.");
        const paragrah4 = screen.getByText("The full text of Ann Arbor’s non-discrimination law is in Title IX, Chapter 112, Section 9:150 - 9:164.", { exact: false });

        expect(paragrah1).toBeVisible();
        expect(paragrah2).toBeVisible();
        expect(paragrah3).toBeVisible();
        expect(paragrah4).toBeVisible();
    });
    test("has a link to Ann Arbor's law", () => {
        const link: HTMLAnchorElement = screen.getByRole("link", { name: `Click here to see the full text of the law on Municode. ${OPENS_IN_A_NEW_TAB}` });
        expect(link).toBeVisible();
        expect(link.href).toEqual("https://library.municode.com/mi/ann_arbor/codes/code_of_ordinances?nodeId=TITIXPORE_CH112NSC_9_150IN");
    });
});
