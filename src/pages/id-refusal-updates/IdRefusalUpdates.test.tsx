import { ID_REFUSAL_UPDATES_DOCUMENT_TITLE, ID_REFUSAL_UPDATES_HEADING, IdRefusalUpdates } from "./IdRefusalUpdates";
import { idRefusalUpdates } from "../../data/idRefusalUpdates";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Container } from "react-dom";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";
import { MemoryRouter } from "react-router-dom";
import { axe } from "jest-axe";

describe(IdRefusalUpdates.name, () => {
    let container: Container;

    beforeEach(() => {
        ({ container } = render(<MemoryRouter><IdRefusalUpdates /></MemoryRouter>));
    });

    test("exports its page heading", () => {
        expect(ID_REFUSAL_UPDATES_HEADING).toBe("ID Refusal Updates");
    });
    test("exports its document title", () => {
        expect(ID_REFUSAL_UPDATES_DOCUMENT_TITLE).toBe("ID Refusal Updates");
    });
    test("has no AxE violations", async () => {
        const page = await axe(container as Element);
        expect(page).toHaveNoViolations();
    });

    test("has an h1 with the page heading that can be focused programmatically", () => {
        const h1 = screen.getByRole("heading", {
            level: 1,
            name: ID_REFUSAL_UPDATES_HEADING,
        });
        expect(h1).toBeVisible();
        expect(h1.hasAttribute("tabindex")).toBe(true);
        expect(h1.tabIndex).toBe(-1);
    });

    test("has an h2 with ID Refusal Updates heading", () => {
        const h2 = screen.getByRole("heading", {
            level: 2,
            name: "ID Refusal Updates",
        });
        expect(h2).toBeVisible();
    });

    test("displays all data from the first update", () => {
        const update = idRefusalUpdates[0];

        const paragraph = `A user reported that the ${update.businessName} at ${update.businessAddress} refused to accept their ID. ${update.outcome.followedUpBy} spoke with the ${update.businessName} manager on ${update.outcome.date} and ${update.outcome.result}.`;
        expect(screen.getByText(paragraph)).toBeVisible();
    });

    test("has a link to the report ID refusal form", () => {
        const link: HTMLAnchorElement = screen.getByRole("link", {
            name: "Please tell us if this business refused to accept your ID.",
        }) as HTMLAnchorElement;
        expect(link).toBeVisible();
        expect(link.href.endsWith(PAGE_ENDPOINTS.reportIdRefused)).toBe(true);

        let paragraph = screen.getByText("If they refused your ID after January 15, 2024, please tell us what day and time they refused it so we can help them train their staff");
        expect(paragraph).toBeVisible();
    });
});
