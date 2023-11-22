import { WELCOME_PAGE_HEADING, WelcomePage } from "./WelcomePage";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { axe } from "jest-axe";
import { Container } from "react-dom";
import { OPENS_IN_A_NEW_TAB } from "../../components/OpensInNewTab/OpensInANewTabLink";
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
    test("has information about the law in Ann Arbor", () => {
        const info = screen.getByText("All businesses in Ann Arbor are required to accept the Washtenaw County ID as proof of identity.");
        expect(info).toBeVisible();
    });
    test("has a link to Ann Arbor's law", () => {
        const link: HTMLAnchorElement = screen.getByRole("link", { name: `See the law on Municode ${OPENS_IN_A_NEW_TAB}` });
        expect(link).toBeVisible();
        expect(link.href).toEqual("https://library.municode.com/mi/ann_arbor/codes/code_of_ordinances?nodeId=TITIXPORE_CH112NSC_9_150IN");
    });
    test("has a call-to-action about businesses that don't accept the ID", () => {
        const nonBreakingSpace = `\xa0`;
        const paragraphText = `If a business in Ann Arbor refused to accept your Washtenaw County ID, please tell us about your experience.${nonBreakingSpace}`;
        const paragraph = screen.getByText((text, element) => {
            return element?.textContent?.startsWith(paragraphText) ?? false;
        });
        expect(paragraph).toBeVisible();

        const link: HTMLAnchorElement = within(paragraph).getByRole("link", { name: "Click here to contact us." });
        expect(link).toBeVisible();
        expect(link.href).toContain(PAGE_ENDPOINTS.reportIdRefused);
    });
});
