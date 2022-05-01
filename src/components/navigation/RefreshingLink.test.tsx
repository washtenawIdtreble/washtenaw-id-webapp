import { RefreshingLink } from "./RefreshingLink";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe(RefreshingLink.name, () => {
    const activeRoute = "/active";
    const activeLinkText = "You Are Here";
    const inactiveRoute = "/inactive";
    const inactiveLinkText = "Click Here";
    beforeEach(() => {
        render(<MemoryRouter initialEntries={[activeRoute]}>
                <RefreshingLink to={activeRoute}>{activeLinkText}</RefreshingLink>
                <RefreshingLink to={inactiveRoute}>{inactiveLinkText}</RefreshingLink>
            </MemoryRouter>,
        );
    });
    test("assigns class and aria-current for matched route", () => {
        let activeLink = screen.getByRole("link", { name: activeLinkText, current: "page" });
        expect(activeLink.className).toContain("matched-link");
    });
    test("doesn't assign class and aria-current for unmatched route", () => {
        let inactiveLink = screen.getByRole("link", { name: inactiveLinkText, current: undefined });
        expect(inactiveLink.className).not.toContain("matched-link");
    });
});