import { LINK_TEXT, NavLinks } from "./NavLinks";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";
import { OPENS_IN_A_NEW_TAB } from "../OpensInNewTab/OpensInANewTabLink";

describe(NavLinks.name, () => {
    beforeEach(() => {
        render(<NavLinks/>, { wrapper: MemoryRouter });
    });
    test("exports link text", () => {
        expect(LINK_TEXT.aboutTheId).toEqual("About the ID");
        expect(LINK_TEXT.annArborOrdinance).toEqual("Washtenaw ID in Ann Arbor");
        expect(LINK_TEXT.businesses).toEqual("All Businesses");
        expect(LINK_TEXT.categories).toEqual("Business Categories");
        expect(LINK_TEXT.reportIdRefused).toEqual("My ID was Refused");
        expect(LINK_TEXT.contactUs).toEqual("Contact Us");
        expect(LINK_TEXT.accessibilityIssues).toEqual("Accessibility Issues");
    });
    test("displays all links in an unordered list", () => {
        const list = screen.getByRole("list");
        const listItems = within(list).getAllByRole("listitem");
        const links = listItems.map(listItem => within(listItem).getByRole("link"));
        expect(links.length).toEqual(5);
    });
    test("has a link to the washtenaw ID website", () => {
        const link: HTMLAnchorElement = screen.getByRole("link", { name: `${LINK_TEXT.aboutTheId} ${OPENS_IN_A_NEW_TAB}` });
        expect(link.href).toEqual("https://washtenawid.com/");
    });
    test("has a link to the Ann Arbor Ordinance Page", () => {
        const link: HTMLAnchorElement = screen.getByRole("link", { name: LINK_TEXT.annArborOrdinance });
        expect(link.href.endsWith(PAGE_ENDPOINTS.annArborOrdinance)).toBe(true);
    });
    test("has a link to the id refused form page", () => {
        const link: HTMLAnchorElement = screen.getByRole("link", { name: LINK_TEXT.reportIdRefused });
        expect(link.href.endsWith(PAGE_ENDPOINTS.reportIdRefused)).toBe(true);
    });
    test("has a link to the contact us page", () => {
        const link: HTMLAnchorElement = screen.getByRole("link", { name: "contact us" });
        expect(link.href.endsWith(PAGE_ENDPOINTS.contactUs)).toBe(true);
        expect(link.textContent).toEqual(LINK_TEXT.contactUs);
    });
    test("has a link to the accessibility issues form page", () => {
        const link: HTMLAnchorElement = screen.getByRole("link", { name: LINK_TEXT.accessibilityIssues });
        expect(link.href.endsWith(PAGE_ENDPOINTS.accessibilityIssues)).toBe(true);
    });
});
