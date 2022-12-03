import React from "react";
import { Businesses } from "./Businesses";
import { render, screen, waitFor, within } from "@testing-library/react";
import { TEST_BUSINESSES } from "../../mock-server/businesses-resolver";
import { MemoryRouter } from "react-router-dom";

describe(Businesses.name, () => {
    beforeEach(() => {
        render(<Businesses/>, { wrapper: MemoryRouter });
    });

    test("has a heading", () => {
        const pageHeader = screen.getByRole("heading", { level: 1 });
        expect(pageHeader.textContent).toBe("Businesses that accept the ID");
    });

    test("contains category name as heading for a set of businesses", async () => {
        let categoryHeadings: HTMLHeadingElement[] = [];
        await waitFor(() => {
            categoryHeadings = screen.getAllByRole("heading", { level: 2 });
        });

        const categoryNames = categoryHeadings.map(h2 => h2.textContent);
        const titleCaseCategories = TEST_BUSINESSES.map(b => b.category.displayName);
        
        expect(categoryNames).toEqual(titleCaseCategories);
    });

    test("contains a list of businesses", async () => {
        let listElements: HTMLUListElement[] = [];
        await waitFor(() => {
            listElements = screen.getAllByRole("list");
        });

        let businesses: string[][] = [];
        listElements.forEach(listElement => {
            let listItems = within(listElement).getAllByRole("listitem");
            businesses.push(listItems.map(li => li.textContent ?? ""));
        });
        expect(businesses).toEqual(TEST_BUSINESSES.map(c => c.businesses));
    });
});  