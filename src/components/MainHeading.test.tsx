import { MainHeading } from "./MainHeading";
import { render, screen } from "@testing-library/react";
import React from "react";

describe(MainHeading.name, () => {
    const headingId = "1234";
    const headingText = "Hello";
    const ariaLabelText = "HeLlOooo";

    test("renders the children in an h1", () => {
        render(<MainHeading>{headingText}</MainHeading>);
        expect(screen.getByRole("heading", { level: 1, name: headingText })).toBeVisible();
    });
    test("gives the h1 a tabindex of -1", () => {
        render(<MainHeading>{headingText}</MainHeading>);
        const heading = screen.getByRole("heading", { level: 1, name: headingText });
        expect(heading.hasAttribute("tabindex")).toBe(true);
        expect(heading.tabIndex).toBe(-1);
    });
    test("passes the optional ID to the h1 element", () => {
        render(<MainHeading id={headingId}>{headingText}</MainHeading>);
        const heading = screen.getByRole("heading", { level: 1, name: headingText });
        expect(heading.id).toBe(headingId);
    });
    test("passes the optional aria-label to the h1 element", () => {
        render(<MainHeading id={headingId} ariaLabel={ariaLabelText}>{headingText}</MainHeading>);
        const heading = screen.getByRole("heading", { level: 1, name: ariaLabelText });
        expect(heading.textContent).toBe(headingText);
    });
});