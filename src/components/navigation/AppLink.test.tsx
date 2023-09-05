import { AppLink } from "./AppLink";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe(AppLink.name, () => {
    const activeRoute = "/active";
    const activeLinkText = "You Are Here";
    const inactiveRoute = "/inactive";
    const inactiveLinkText = "Click Here";
    beforeEach(() => {
        render(<MemoryRouter initialEntries={[activeRoute]}>
                <AppLink to={activeRoute}>{activeLinkText}</AppLink>
                <AppLink to={inactiveRoute}>{inactiveLinkText}</AppLink>
            </MemoryRouter>,
        );
    });
    test("assigns class and aria-current for matched route", () => {
        const activeLink = screen.getByRole("link", { name: activeLinkText, current: "page" });
        expect(activeLink.className).toContain("matched-link");
    });
    test("shows icon for matched route", () => {
        const icon = screen.getByRole("img", { hidden: true });
        expect(icon).toBeVisible();
        expect(icon.getAttribute("src")).toContain("current-page.svg");
    });
    test("doesn't assign class and aria-current for unmatched route", () => {
        const inactiveLink = screen.getByRole("link", { name: inactiveLinkText, current: undefined });
        expect(inactiveLink.className).not.toContain("matched-link");
    });
});
