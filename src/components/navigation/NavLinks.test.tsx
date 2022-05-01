import { NavLinks } from "./NavLinks";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe(NavLinks.name, () => {
    beforeEach(() => {
        render(<NavLinks/>, { wrapper: MemoryRouter });
    });
    test("should display all links in an unordered list", () => {
        const list = screen.getByRole("list");
        const listItems = within(list).getAllByRole("listitem");
        const links = listItems.map(listItem => within(listItem).getByRole("link"));
        expect(links.length).toEqual(2);
    });
    test("has a link to the all businesses page", () => {
        const link: HTMLAnchorElement = screen.getByRole("link", { name: "All Businesses" });
        expect(link.href).toContain("/businesses");
    });
    test("has a link to the categories page", () => {
        const link: HTMLAnchorElement = screen.getByRole("link", { name: "Business Categories" });
        expect(link.href).toContain("/");
    });
});