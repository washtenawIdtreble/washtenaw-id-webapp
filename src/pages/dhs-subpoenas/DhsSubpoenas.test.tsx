import { DHS_SUBPOENAS_DOCUMENT_TITLE, DHS_SUBPOENAS_HEADING, DhsSubpoenas } from "./DhsSubpoenas";
import { render, screen } from "@testing-library/react";
import React from "react";
import { axe } from "jest-axe";
import { Container } from "react-dom";
import { MemoryRouter } from "react-router-dom";

describe(DhsSubpoenas.name, () => {
    let container: Container;

    beforeEach(() => {
        ({ container } = render(<MemoryRouter><DhsSubpoenas /></MemoryRouter>));
    });

    test("exports its page heading", () => {
        expect(DHS_SUBPOENAS_HEADING).toBe("DHS Subpoenas Washtenaw County");
    });
    test("exports its document title", () => {
        expect(DHS_SUBPOENAS_DOCUMENT_TITLE).toBe("DHS Subpoenas Washtenaw County");
    });
    test("has no AxE violations", async () => {
        const page = await axe(container as Element);
        expect(page).toHaveNoViolations();
    });

    test("has an h1 with the page heading that can be focused programmatically", () => {
        const h1 = screen.getByRole("heading", {
            level: 1,
            name: DHS_SUBPOENAS_HEADING,
        });
        expect(h1).toBeVisible();
        expect(h1.hasAttribute("tabindex")).toBe(true);
        expect(h1.tabIndex).toBe(-1);
    });

    test("has 'What happened?' section", () => {
        const heading = screen.getByRole("heading", { level: 2, name: "What happened?" });
        expect(heading).toBeVisible();

        const paragraph1 = screen.getByText("The U.S. Department of Homeland Security (DHS) sent Washtenaw County a legal demand (called a subpoena) on April 10, 2025. The subpoena asked for records on everyone who applied for a County ID between May 2019 and April 2025.");
        expect(paragraph1).toBeVisible();

        const paragraph2 = screen.getByText("The county refused. On May 6, 2025, the county's attorney sent DHS a letter saying the county will not hand over any records unless a court orders them to. The county has hired a law firm to defend this position if DHS pushes back.");
        expect(paragraph2).toBeVisible();
    });

    test("has 'What does this mean for you?' section", () => {
        const heading = screen.getByRole("heading", { level: 2, name: "What does this mean for you?" });
        expect(heading).toBeVisible();

        const paragraph1 = screen.getByText("The county only keeps records for one year, so information on people who applied for the ID from 2019 through 2024 has been erased and cannot be handed over to the DHS.");
        expect(paragraph1).toBeVisible();

        const paragraph2 = screen.getByText("As of the most recent reporting, your information has not been given to DHS. The county is protecting your records. If a federal court orders the county to comply, it may have to turn over records. The county says it will fight any such order. Its legal team is prepared to go to court if needed.");
        expect(paragraph2).toBeVisible();
    });

    test("has citations", () => {
        const citationsHeading = screen.getByRole("heading", { level: 2, name: "Citations" });
        expect(citationsHeading).toBeVisible();

        const citation1 = screen.getByRole("link", { name: "MLive: \"Feds demand info on Washtenaw County program giving IDs to immigrants, homeless and others\" April 14, 2025 opens in a new tab" });
        expect(citation1).toBeVisible();

        const citation2 = screen.getByRole("link", { name: "MLive: \"Washtenaw County refuses to hand over county ID records to feds amid immigration probe\" May 14, 2025 opens in a new tab" });
        expect(citation2).toBeVisible();
    });
});
