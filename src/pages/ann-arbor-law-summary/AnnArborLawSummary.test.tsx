import {
    ANN_ARBOR_LAW_SUMMARY_DOCUMENT_TITLE,
    ANN_ARBOR_LAW_SUMMARY_HEADING,
    ANN_ARBOR_LAW_SUMMARY_SECTION_1_ID,
    ANN_ARBOR_LAW_SUMMARY_SECTION_2_ID,
    ANN_ARBOR_LAW_SUMMARY_SECTION_3_ID,
    ANN_ARBOR_LAW_SUMMARY_SECTION_4_ID,
    ANN_ARBOR_LAW_SUMMARY_SECTION_5_ID,
    ANN_ARBOR_LAW_SUMMARY_SECTION_6_ID,
    AnnArborLawSummary
} from "./AnnArborLawSummary";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { axe } from "jest-axe";
import { Container } from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";

describe(AnnArborLawSummary.name, () => {
    let container: Container;
    beforeEach(() => {
        ({ container } = render(<MemoryRouter><AnnArborLawSummary/></MemoryRouter>));
    });
    test("exports its page heading", () => {
        expect(ANN_ARBOR_LAW_SUMMARY_HEADING).toBe("Accepting the Washtenaw ID is the Law in Ann Arbor");
    });
    test("exports its document title", () => {
        expect(ANN_ARBOR_LAW_SUMMARY_DOCUMENT_TITLE).toBe("Ann Arbor Law");
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
    describe("table of contents", () => {
        let navElement: HTMLDivElement;
        const headingText = "Table of Contents";
        beforeEach(() => {
            navElement = screen.getByRole("navigation", { name: headingText });
        });
        test("is a nav labelled by a heading", () => {
            expect(navElement).toBeVisible();

            const contentsHeading = within(navElement).getByRole("heading", { level: 2, name: headingText });
            expect(contentsHeading).toBeVisible();
        });
        test("has a link to each section", () => {
            const list = within(navElement).getByRole("list");
            const listItems = within(list).getAllByRole("listitem");
            const links: HTMLAnchorElement[] = listItems.map(listItem => within(listItem).getByRole("link"));
            expect(links.length).toEqual(6);

            expect(links[0].href.endsWith(`#${ANN_ARBOR_LAW_SUMMARY_SECTION_1_ID}`)).toBe(true);
            expect(links[0].textContent).toEqual("Refusing the Washtenaw ID is against the law in Ann Arbor");

            expect(links[1].href.endsWith(`#${ANN_ARBOR_LAW_SUMMARY_SECTION_2_ID}`)).toBe(true);
            expect(links[1].textContent).toEqual("The Washtenaw ID is a valid government-issued ID card");

            expect(links[2].href.endsWith(`#${ANN_ARBOR_LAW_SUMMARY_SECTION_3_ID}`)).toBe(true);
            expect(links[2].textContent).toEqual("Unfamiliarity with the Washtenaw ID is no excuse");

            expect(links[3].href.endsWith(`#${ANN_ARBOR_LAW_SUMMARY_SECTION_4_ID}`)).toBe(true);
            expect(links[3].textContent).toEqual("Alcohol can be purchased with the Washtenaw ID");

            expect(links[4].href.endsWith(`#${ANN_ARBOR_LAW_SUMMARY_SECTION_5_ID}`)).toBe(true);
            expect(links[4].textContent).toEqual("Prescription medication can be purchased with the Washtenaw ID");

            expect(links[5].href.endsWith(`#${ANN_ARBOR_LAW_SUMMARY_SECTION_6_ID}`)).toBe(true);
            expect(links[5].textContent).toEqual("Investigation by the city's Human Rights Commission");
        });
    });
    describe("Section 1 - refusing the ID is against the law", () => {
        test("has a heading", () => {
            let heading = screen.getByRole("heading", {
                level: 2,
                name: "1. Refusing the Washtenaw ID is against the law in Ann Arbor"
            });
            expect(heading).toBeVisible();
            expect(heading.id).toEqual(ANN_ARBOR_LAW_SUMMARY_SECTION_1_ID);
            expect(heading.tabIndex).toBe(-1);

        });
        test("has informational paragraphs", () => {
            const paragraph1 = screen.getByText("Ann Arbor finds the practice of denying service to otherwise eligible individuals based on the type of government-issued ID they carry, discriminatory. Municipal Code Chapter 112 makes this practice unlawful. Pursuant to the City's Non-Discrimination Ordinance: All government-issued ID cards must be accepted as valid unless a state or federal law mandates that a specific type of ID be used for a specific purpose.");
            expect(paragraph1).toBeVisible();
            const paragraph2 = screen.getByText("The relevant part of the law states that: \"(6) No person shall discriminate against individuals based on their use of a government-issued identification card and all persons shall accept a government-issued identification card as valid identification...\" absent very specific statutory mandate not present in everyday transactions.");
            expect(paragraph2).toBeVisible();
        });
        test("has a citation of the law pointing to the law online", () => {
            const link: HTMLAnchorElement = screen.getByRole("link", { name: "ANN ARBOR MUNICIPAL CODE CHAPTER 112, SECTION 9:155, SUBSECTION 6 opens in a new tab" });
            expect(link).toBeVisible();
            expect(link.href).toEqual("https://library.municode.com/mi/ann_arbor/codes/code_of_ordinances?nodeId=TITIXPORE_CH112NSC_9_155OTPRPR");
            expect(link.target).toEqual(`_blank`);
            expect(link.rel).toEqual(`noreferrer`);
        });
    });
    describe("Section 2 - The Washteanw ID is a valid ID card", () => {
        test("has a heading", () => {
            let heading = screen.getByRole("heading", {
                level: 2,
                name: "2. The Washtenaw ID is a valid government-issued ID card. By statute it is equivalent to all other state and federal issued ID"
            });
            expect(heading).toBeVisible();
            expect(heading.id).toEqual(ANN_ARBOR_LAW_SUMMARY_SECTION_2_ID);
            expect(heading.tabIndex).toBe(-1);

        });
        test("has informational paragraphs", () => {
            const paragraph1 = screen.getByText("The law, in relevant part provides that: \"A government-issued identification card is any identification document displaying an individual's photograph and identifying information issued by a federal, state, or local government (including a Washtenaw County identification card) to an individual for the purpose of identification of that individual.\"");
            expect(paragraph1).toBeVisible();
        });
        test("has a citation of the law pointing to the law online", () => {
            const link: HTMLAnchorElement = screen.getByRole("link", { name: "ANN ARBOR MUNICIPAL CODE CHAPTER 112, SECTION 9:151, SUBSECTION 15 opens in a new tab" });
            expect(link).toBeVisible();
            expect(link.href).toEqual("https://library.municode.com/mi/ann_arbor/codes/code_of_ordinances?nodeId=TITIXPORE_CH112NSC_9_151DE");
            expect(link.target).toEqual(`_blank`);
            expect(link.rel).toEqual(`noreferrer`);
        });
    });
    describe("Section 3 - Lack of Familiarity", () => {
        test("has a heading", () => {
            let heading = screen.getByRole("heading", {
                level: 2,
                name: "3. Lack of familiarity with the Washtenaw ID is not a legal justification for denying equal access to goods and services"
            });
            expect(heading).toBeVisible();
            expect(heading.id).toEqual(ANN_ARBOR_LAW_SUMMARY_SECTION_3_ID);
            expect(heading.tabIndex).toBe(-1);

        });
        test("has informational paragraphs", () => {
            const paragraph1 = screen.getByText("All persons presenting a current photo ID issued by a government of the United States, (including local government ID cards like the Washtenaw ID) are entitled to full and equal access to goods and services. Lack of familiarity with a particular government-issued ID does not constitute legitimate grounds for the human rights violation inherent in withholding access to necessary goods and services.");
            expect(paragraph1).toBeVisible();
        });
        test("has a citation of the law pointing to the law online", () => {
            const link: HTMLAnchorElement = screen.getByRole("link", { name: "ANN ARBOR MUNICIPAL CODE CHAPTER 112, SECTION 9:150 opens in a new tab" });
            expect(link).toBeVisible();
            expect(link.href).toEqual("https://library.municode.com/mi/ann_arbor/codes/code_of_ordinances?nodeId=TITIXPORE_CH112NSC_9_150IN");
            expect(link.target).toEqual(`_blank`);
            expect(link.rel).toEqual(`noreferrer`);
        });
    });
    describe("Section 4 - Alcohol", () => {
        test("has a heading", () => {
            let heading = screen.getByRole("heading", {
                level: 2,
                name: "4. Alcohol can be purchased with the Washtenaw ID"
            });
            expect(heading).toBeVisible();
            expect(heading.id).toEqual(ANN_ARBOR_LAW_SUMMARY_SECTION_4_ID);
            expect(heading.tabIndex).toBe(-1);

        });
        test("has informational paragraphs", () => {
            const paragraph1 = screen.getByText("You do not need a state ID to purchase alcohol in Michigan. MI law requires a \"...bona fide picture identification which establishes the identity and age of the person.\"");
            expect(paragraph1).toBeVisible();
            const paragraph2 = screen.getByText("A relevant part the statute requires that sellers make \"...a diligent good faith effort to determine the age of the person, which includes at least an examination of...bona fide picture identification which establishes the identity and age of the person.\"");
            expect(paragraph2).toBeVisible();
        });
        test("has citations of the laws pointing to the laws online", () => {
            const link: HTMLAnchorElement = screen.getByRole("link", { name: "MICHIGAN COMPILED LAWS 436.1701 SECTION 701 SUBSECTION 11 (B) (i) opens in a new tab" });
            expect(link).toBeVisible();
            expect(link.href).toEqual("https://www.legislature.mi.gov/(S(rvyziyt3emr4l2nydyymkrko))/mileg.aspx?page=getObject&objectName=mcl-436-1701");
            expect(link.target).toEqual(`_blank`);
            expect(link.rel).toEqual(`noreferrer`);
        });
    });
    describe("Section 5 - Prescription Medication", () => {
        test("has a heading", () => {
            let heading = screen.getByRole("heading", {
                level: 2,
                name: "5. Prescription medication and cold medicine can be purchased with the Washtenaw ID"
            });
            expect(heading).toBeVisible();
            expect(heading.id).toEqual(ANN_ARBOR_LAW_SUMMARY_SECTION_5_ID);
            expect(heading.tabIndex).toBe(-1);

        });
        test("has informational paragraphs", () => {
            const paragraph1 = screen.getByText("You do not need a state ID to purchase restricted prescribed medication nor is a state ID required for ephedrine or pseudoephedrine at adult doses in Michigan. MI law requires \"...a valid government-issued photo identification that includes the individual's name and date of birth.\" The pharmacy is required to document the type of ID used, the purchasers information, and may ask the purchaser to sign a log.");
            expect(paragraph1).toBeVisible();
        });
        test("has a citation of the law pointing to the law online", () => {
            const link: HTMLAnchorElement = screen.getByRole("link", { name: "MICHIGAN COMPILED LAWS 333.17766e SECTION 17766e SUBSECTION 2 (A) opens in a new tab" });
            expect(link).toBeVisible();
            expect(link.href).toEqual("https://www.legislature.mi.gov/(S(rvyziyt3emr4l2nydyymkrko))/mileg.aspx?page=getObject&objectName=mcl-333-17766e");
            expect(link.target).toEqual(`_blank`);
            expect(link.rel).toEqual(`noreferrer`);
        });
    });
    describe("Section 6 - Investigation by Human Rights Commission", () => {
        test("has a heading", () => {
            let heading = screen.getByRole("heading", {
                level: 2,
                name: "6. Washtenaw ID discrimination is investigated by the city's Human Rights Commission"
            });
            expect(heading).toBeVisible();
            expect(heading.id).toEqual(ANN_ARBOR_LAW_SUMMARY_SECTION_6_ID);
            expect(heading.tabIndex).toBe(-1);

        });
        test("has informational paragraphs", () => {
            const paragraph1 = screen.getByText("The City of Ann Arbor's Human Rights Commission is authorized to \"Receive and review complaints from individuals alleging violations of Ann Arbor's human rights ordinance and take appropriate action, including but not limited to referral of complaints to appropriate agencies or to the City Attorney mediation of complaints, or dismissal of complaints\"");
            expect(paragraph1).toBeVisible();
            const paragraph2 = screen.getByText("If you have questions or want to report ID discrimination, you can contact the Human Rights Commission by phone or email at the links below.");
            expect(paragraph2).toBeVisible();
            const paragraph3 = screen.getByText("You can also contact the Washtenaw ID Project directly through this website.", { exact: false });
            expect(paragraph3).toBeVisible();
        });
        test("has a citation of the law pointing to the law online", () => {
            const link: HTMLAnchorElement = screen.getByRole("link", { name: "ANN ARBOR MUNICIPAL CODE CHAPTER 8, SECTION 1:222 (a) opens in a new tab" });
            expect(link).toBeVisible();
            expect(link.href).toEqual("https://library.municode.com/mi/ann_arbor/codes/code_of_ordinances?nodeId=TITIAD_CH8ORBOCO_1_222SAUT");
            expect(link.target).toEqual(`_blank`);
            expect(link.rel).toEqual(`noreferrer`);
        });
        test("has contact information for complaining about ID discrimination", () => {
            const contactSection = screen.getByTestId("section-6");
            const list = within(contactSection).getByRole("list");
            const listItems = within(list).getAllByRole("listitem");
            const links: HTMLAnchorElement[] = listItems.map(listItem => within(listItem).getByRole("link"));
            expect(links.length).toEqual(3);

            expect(links[0].href).toEqual("tel:+1(734)794-6291");
            expect(links[0].textContent).toEqual("(734) 794-6291");

            expect(links[1].href).toEqual("mailto:hrc@a2gov.org");
            expect(links[1].textContent).toEqual("hrc@a2gov.org");

            expect(links[2].href).toEqual("mailto:kcummings@a2gov.org");
            expect(links[2].textContent).toEqual("kcummings@a2gov.org");

            const contactUsLink: HTMLAnchorElement = screen.getByRole("link", { name: "Click here to contact us." });
            expect(contactUsLink.href.endsWith(PAGE_ENDPOINTS.reportIdRefused)).toBe(true);
        });
    });
});
