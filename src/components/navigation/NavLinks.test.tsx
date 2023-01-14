import { NavLinks } from "./NavLinks";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";

describe(NavLinks.name, () => {
    beforeEach(() => {
        render(<NavLinks/>, { wrapper: MemoryRouter });
    });
    test("displays all links in an unordered list", () => {
        const list = screen.getByRole("list");
        const listItems = within(list).getAllByRole("listitem");
        const links = listItems.map(listItem => within(listItem).getByRole("link"));
        expect(links.length).toEqual(4);
    });
    test("has a link to the all businesses page", () => {
        const link: HTMLAnchorElement = screen.getByRole("link", { name: "All Businesses" });
        expect(link.href).toContain(PAGE_ENDPOINTS.businesses);
    });
    test("has a link to the categories page", () => {
        const link: HTMLAnchorElement = screen.getByRole("link", { name: "Business Categories" });
        expect(link.href).toContain(PAGE_ENDPOINTS.categories);
    });
    test("has a link to the contact us page", () => {
        const link: HTMLAnchorElement = screen.getByRole("link", { name: "Contact Us" });
        expect(link.href).toContain(PAGE_ENDPOINTS.contactUs);
    });
    test("has a link to the accessibility issues form page", () => {
        const link: HTMLAnchorElement = screen.getByRole("link", { name: "Accessibility Issues" });
        expect(link.href).toContain(PAGE_ENDPOINTS.accessibilityIssues);
    });
});