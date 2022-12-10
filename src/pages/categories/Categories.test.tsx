import React from "react";
import { Categories } from "./Categories";
import { render, screen, waitFor, within } from "@testing-library/react";
import { TEST_CATEGORIES } from "../../mock-server/resolvers/categories-resolver";
import { MemoryRouter } from "react-router-dom";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";
import { Container } from "react-dom";
import { axe } from "jest-axe";

describe(Categories.name, () => {
    let container: Container;
    beforeEach(() => {
        ({ container } = render(<Categories/>, { wrapper: MemoryRouter }));
    });

    test("has no AxE violations", async () => {
        await waitFor(() => {
            screen.getAllByRole("listitem");
        });
        const page = await axe(container as Element);
        expect(page).toHaveNoViolations();
    });

    test("contains a list of categories", async () => {
        const listElement = screen.getByRole("list");
        let categoryListItems: HTMLLIElement[] = [];
        await waitFor(() => {
            categoryListItems = within(listElement).getAllByRole("listitem");
        });

        const categoryNames = categoryListItems
            .map(li => within(li).getByRole("link"))
            .map(link => link.textContent ?? "");
        const categories = TEST_CATEGORIES.map(c => c.displayName);

        expect(categoryNames).toEqual(categories);
    });

    test("links to correct url", async () => {
        let categoryLinks: HTMLAnchorElement[] = [];
        await waitFor(() => {
            categoryLinks = screen.getAllByRole("link");
        });

        const categoryUrls = categoryLinks.map(link => link.href);
        const expectedCategoryUrls = TEST_CATEGORIES.map(c => `${PAGE_ENDPOINTS.businesses}#${c.category}`);

        expect(categoryUrls.length).toEqual(expectedCategoryUrls.length);
        expectedCategoryUrls.forEach((expectUrl, index) => {
            expect(categoryUrls[index].endsWith(expectUrl)).toBe(true);
        });
    });
});

