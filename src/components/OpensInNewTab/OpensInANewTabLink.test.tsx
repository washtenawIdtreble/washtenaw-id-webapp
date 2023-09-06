import { OPENS_IN_A_NEW_TAB, OpensInANewTabLink } from "./OpensInANewTabLink";
import { render, screen } from "@testing-library/react";
import React from "react";

describe(OpensInANewTabLink.name, () => {
    let link: HTMLAnchorElement;
    const linkText = "linkText";
    const href = "https://example.com/";
    beforeEach(() => {
        render(<OpensInANewTabLink href={href}>{linkText}</OpensInANewTabLink>);

        link = screen.getByRole("link", { name: `${linkText} ${OPENS_IN_A_NEW_TAB}` });
    });
    test("has the right text for opening in a new tab", () => {
        expect(OPENS_IN_A_NEW_TAB).toEqual("opens in a new tab");
    });
    test("links to the provided href", () => {
        expect(link.href).toEqual(href);
    });
    test("opens in a new tab", () => {
        expect(link.target).toEqual(`_blank`);
        expect(link.rel).toEqual(`noreferrer`);
    });
});
