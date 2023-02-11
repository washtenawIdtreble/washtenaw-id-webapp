import React from "react";
import { Businesses } from "./Businesses";
import { render, screen, waitFor } from "@testing-library/react";
import { TEST_CATEGORIZED_BUSINESSES, errorBusinessesResolver } from "../../mock-server/businesses-resolver";
import { MemoryRouter } from "react-router-dom";
import { axe } from "jest-axe";
import { Container } from "react-dom";
import { mockServer } from "../../mock-server/mock-server";
import { rest } from "msw";
import { BASE_URL } from "../../utilities/base-url";
import { SERVER_ENDPOINTS } from "../../utilities/server-endpoints";
import { BUSINESS_ERROR_MESSAGE } from "../../hooks/useBusinesses";

describe(Businesses.name, () => {
    let container: Container;

    beforeEach(() => {
        ({ container } = render(<Businesses/>, { wrapper: MemoryRouter }));
    });

    test("has a heading", () => {
        const pageHeader = screen.getByRole("heading", { level: 1 });
        expect(pageHeader.textContent).toBe("Businesses that accept the ID");
    });

    describe("after businesses are loaded", () => {
        let categoryHeadings: HTMLHeadingElement[] = [];
        beforeEach(async () => {
            await waitFor(() => {
                categoryHeadings = screen.getAllByRole("heading", { level: 2 });
            });
        });
        test("has no AxE violations", async () => {
            const page = await axe(container as Element);
            expect(page).toHaveNoViolations();
        });

        test("contains category name as heading for each set of businesses", async () => {
            const categoryNames = categoryHeadings.map(h2 => h2.textContent);
            const titleCaseCategories = TEST_CATEGORIZED_BUSINESSES.map(b => b.category.displayName);

            expect(categoryNames).toEqual(titleCaseCategories);
        });

        test("category headings have IDs to allow focusing them", () => {
            const ids = categoryHeadings.map(h2 => h2.id);
            const expectedIds = TEST_CATEGORIZED_BUSINESSES.map(b => b.category.name);

            expect(ids).toEqual(expectedIds);
        });

        test("contains a business card for each business in a category", async () => {
            expect(TEST_CATEGORIZED_BUSINESSES.length).not.toBe(0);
            TEST_CATEGORIZED_BUSINESSES.forEach(category => {
                expect(category.businesses.length).not.toBe(0);
                category.businesses.forEach(business => {
                    expect(screen.getByRole("table", { name: business.name })).toBeVisible();
                });
            });
        });
    });

    describe("on error loading businesses", () => {
        beforeEach(() => {
            mockServer.use(
                rest.get(`${BASE_URL()}/${SERVER_ENDPOINTS.BUSINESSES}`, errorBusinessesResolver(400, "No businesses!"))
            );
            ({ container } = render(<Businesses/>, { wrapper: MemoryRouter }));
        });
        test("has no AxE violations", async () => {
            await waitFor(() => {
                screen.getByText(BUSINESS_ERROR_MESSAGE);
            });
            const page = await axe(container as Element);
            expect(page).toHaveNoViolations();
        });
        test("should show an error alert", async () => {
            await waitFor(() => {
                expect(screen.getByText(BUSINESS_ERROR_MESSAGE)).toBeInTheDocument();
            });
        });
    });
});  