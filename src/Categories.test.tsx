import React from "react";
import Categories from "./Categories";
import { render, screen, waitFor, within } from "@testing-library/react";
import { TEST_CATEGORIES } from "./mock-server/categories-resolver";

describe(Categories.name, () => {
    test("contains a list of categories", async () => {
        render(<Categories/>);
        const listElement = screen.getByRole("list");

        await waitFor(() => {
            const listItems = within(listElement).getAllByRole("listitem").map(li => li.textContent);
            expect(listItems).toEqual(TEST_CATEGORIES);
        });
    });
});

