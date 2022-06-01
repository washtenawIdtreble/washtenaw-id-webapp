import React from "react";
import { Categories } from "./Categories";
import { render, screen, waitFor, within } from "@testing-library/react";
import { TEST_CATEGORIES } from "../../mock-server/resolvers/categories-resolver";
import { MemoryRouter } from "react-router-dom";


describe(Categories.name, () => {
    test("contains a list of categories", async () => {
        render(<Categories/>,  { wrapper: MemoryRouter });
        const listElement = screen.getByRole("list");
        let categoryNames : string[];
        await waitFor(() => {
            categoryNames = within(listElement)
                .getAllByRole("listitem")
                .map(li => within(li).getByRole("link"))
                .map(link => link.textContent);
        });
        const categories = TEST_CATEGORIES.map(c => c.displayName);
        expect(categoryNames).toEqual(categories);
    });
});

