import React from "react";
import { Categories, CATEGORIES_PAGE_HEADING } from "./Categories";
import { render, screen, waitFor, within } from "@testing-library/react";
import { BASE_URL } from "../../utilities/base-url";
import { SERVER_ENDPOINTS } from "../../utilities/server-endpoints";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";
import { errorCategoriesResolver, TEST_CATEGORIES } from "../../mock-server/resolvers/categories-resolver";
import { MemoryRouter } from "react-router-dom";
import { Container } from "react-dom";
import { axe } from "jest-axe";
import { mockServer } from "../../mock-server/mock-server";
import { rest } from "msw";
import { CATEGORY_ERROR_MESSAGE } from "../../hooks/useCategories";

describe(Categories.name, () => {
    let container: Container;

    describe("on successfully loading categories", () => {
        beforeEach(() => {
            ({ container } = render(<Categories/>, { wrapper: MemoryRouter }));
        });

        afterEach(async () => {
            // wait for API call to resolve to avoid "can't update an unmounted component" error message
            await waitFor(() => {
                screen.getByRole("list");
            });
        });

        test("exports its page heading", () => {
            expect(CATEGORIES_PAGE_HEADING).toBe("Business Categories");
        });

        test("has an h1 that can be focused programmatically", () => {
            const h1 = screen.getByRole("heading", { level: 1, name: CATEGORIES_PAGE_HEADING });
            expect(h1).toBeVisible();
            expect(h1.hasAttribute("tabindex")).toBe(true);
            expect(h1.tabIndex).toBe(-1);
        });

        test("has no AxE violations", async () => {
            await waitFor(() => {
                screen.getByRole("list");
            });
            const page = await axe(container as Element);
            expect(page).toHaveNoViolations();
        });

        test("contains a list of categories", async () => {
            const listElement: HTMLUListElement = await screen.findByRole("list");
            const categoryListItems: HTMLLIElement[] = within(listElement).getAllByRole("listitem");

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
            const expectedCategoryUrls = TEST_CATEGORIES.map(c => `${PAGE_ENDPOINTS.businesses}#${c.name}`);

            expect(categoryUrls.length).toEqual(expectedCategoryUrls.length);
            expectedCategoryUrls.forEach((expectUrl, index) => {
                expect(categoryUrls[index].endsWith(expectUrl)).toBe(true);
            });
        });
    });

    describe("on error loading categories", () => {
        beforeEach(() => {
            mockServer.use(
                rest.get(`${BASE_URL()}/${SERVER_ENDPOINTS.CATEGORIES}`, errorCategoriesResolver(400, "No categories!")),
            );
            ({ container } = render(<Categories/>, { wrapper: MemoryRouter }));
        });
        test("has no AxE violations", async () => {
            await waitFor(() => {
                screen.getByText(CATEGORY_ERROR_MESSAGE);
            });
            const page = await axe(container as Element);
            expect(page).toHaveNoViolations();
        });
        test("should show an error alert", async () => {
            await waitFor(() => {
                expect(screen.getByText(CATEGORY_ERROR_MESSAGE)).toBeInTheDocument();
            });
        });
    });
});

