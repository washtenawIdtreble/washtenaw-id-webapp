import { WELCOME_PAGE_HEADING, WelcomePage } from "./WelcomePage";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { axe } from "jest-axe";
import { Container } from "react-dom";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";
import { MemoryRouter } from "react-router-dom";

describe(WelcomePage.name, () => {
    let container: Container;

    beforeEach(() => {
        ({ container } = render(<WelcomePage/>, { wrapper: MemoryRouter }));
    });
    test("exports its page heading", () => {
        expect(WELCOME_PAGE_HEADING).toBe("Washtenaw ID in Ann Arbor");
    });
    test("has no AxE violations", async () => {
        const page = await axe(container as Element);
        expect(page).toHaveNoViolations();
    });
    test("has an h1 that can be focused programmatically", () => {
        const h1 = screen.getByRole("heading", {
            level: 1,
            name: WELCOME_PAGE_HEADING,
        });
        expect(h1).toBeVisible();
        expect(h1.hasAttribute("tabindex")).toBe(true);
        expect(h1.tabIndex).toBe(-1);
    });

    describe("information section", () => {
        let informationContainer: HTMLDivElement;
        beforeEach(() => {
            informationContainer = screen.getByTestId("information-container");
        });
        test("has information about the law in Ann Arbor", () => {
            const info = within(informationContainer).getByText("All businesses in Ann Arbor are required to accept the Washtenaw County ID as proof of identity.");
            expect(info).toBeVisible();
        });
        test("has a link to a summary of Ann Arbor's law", () => {
            const link: HTMLAnchorElement = within(informationContainer).getByRole("link", { name: "Click here to learn more about Ann Arbor's law" });
            expect(link).toBeVisible();
            expect(link.href.endsWith(PAGE_ENDPOINTS.annArborLaw)).toBe(true);
        });
        test("has a call-to-action about businesses that don't accept the ID", () => {
            const nonBreakingSpace = `\xa0`;
            const paragraphText = `If a business in Ann Arbor refused to accept your Washtenaw County ID, please tell us about your experience.${nonBreakingSpace}`;
            const paragraph = within(informationContainer).getByText((_text, element) => {
                return element?.textContent?.startsWith(paragraphText) ?? false;
            });
            expect(paragraph).toBeVisible();

            const link: HTMLAnchorElement = within(paragraph).getByRole("link", { name: "Click here to contact us." });
            expect(link).toBeVisible();
            expect(link.href).toContain(PAGE_ENDPOINTS.reportIdRefused);
        });
    });

    test("has a heading demarcating the video section", () => {
        expect(screen.getByRole("heading", { level: 2, name: "Washtenaw ID Project Info Video" })).toBeInTheDocument();
    });

    test("has a video", () => {
        let videoIFrame: HTMLIFrameElement = screen.getByTitle("Washtenaw County ID Welcome Video");

        expect(videoIFrame).toBeVisible();
        expect(videoIFrame.src).toEqual("https://www.youtube-nocookie.com/embed/d76T3dwcm3M?si=4yTPVyjYmkAhYC7W&rel=0");
    });

    describe("transcript", () => {
        let transcriptContainer: HTMLDivElement;
        beforeEach(() => {
            transcriptContainer = screen.getByTestId("transcript-container");
        });
        test("has a heading", () => {
            expect(within(transcriptContainer).getByRole("heading", {
                level: 3,
                name: "Video Transcript"
            })).toBeInTheDocument();
        });
        test("has a transcript of the video", () => {
            expect(within(transcriptContainer).getByText("The video above contains interviews with people involved in the Washtenaw ID Project. While each person is talking, we see them speaking directly to the camera.")).toBeVisible();
            expect(within(transcriptContainer).getByText("Keta Cowan - Co-Founder and Chair, The Washtenaw ID Project: \"40,000 individuals both citizens and undocumented folks lack an ID card in Washtenaw County. The Washtenaw ID Project is a local initiative to provide a government-issued ID card to those who cannot access a state ID.\"")).toBeVisible();
            expect(within(transcriptContainer).getByText("Jerry L. Clayton - Sheriff, Washtenaw County: \"My grandparents came up to live with my parents from the south. They didn't have a birth certificate. They didn't have a Social Security card.\"")).toBeVisible();
            expect(within(transcriptContainer).getByText("Yousef Rabhi - Michigan State Representative, 53rd District: \"You don't have those privileges. You don't have those advantages.\"")).toBeVisible();
            expect(within(transcriptContainer).getByText("Janelle Zini - Co-Founder, Washtenaw ID Project: \"Think about where you get asked for your ID - it's almost daily.\"")).toBeVisible();
            expect(within(transcriptContainer).getByText("Sheriff Clayton: \"Not being able to get a bank account, not being able to um sometimes secure uh a house or an apartment or a job.\"")).toBeVisible();
            expect(within(transcriptContainer).getByText("Laura Radzik - AVP, Old National Bank: \"Old National accepts the Washtenaw ID as a primary form of identification meaning it works the same as if you had a driver's license or a passport.\"")).toBeVisible();
            expect(within(transcriptContainer).getByText("Rep. Rabhi: \"This ID card is really in my opinion the most American thing that we could do. It is the most in line with our values of who we are as a country.\"")).toBeVisible();
        });
    });

});
