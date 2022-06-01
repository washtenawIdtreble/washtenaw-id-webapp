import React from "react";
import {Businesses} from "./Businesses";
import { render, screen, within, waitFor } from "@testing-library/react";
import { TEST_BUSINESSES } from "../../mock-server/businesses-resolver";
import { MemoryRouter } from "react-router-dom";

describe(Businesses.name, () => {
    beforeEach(() => {
        render(<Businesses/>, { wrapper: MemoryRouter});
    });

    test("has a heading", ()=> {
        const pageHeader = screen.getByRole("heading", { level: 1 });
        expect(pageHeader.textContent).toBe("Businesses that accept the ID");
    });

    test("contains category name as heading for a set of businesses", async() => {
        await waitFor(() => {
            const categoryNames = screen.getAllByRole("heading", { level: 2 }).map(h2 => h2.textContent);
            const titleCaseCategories = TEST_BUSINESSES.map(b => b.category);
            expect(categoryNames).toEqual(titleCaseCategories);
        });
    });  

    test("contains a list of businesses", async() => {
        await waitFor(() => {
            const listElements = screen.getAllByRole("list");
            let listItems : string[][]  = [];
            listElements.map(listElement => { 
                listItems.push(within(listElement).getAllByRole("listitem").map(li => li.textContent))
            })
            expect(listItems).toEqual(TEST_BUSINESSES.map(c => c.businesses));
        });
    });  
});  