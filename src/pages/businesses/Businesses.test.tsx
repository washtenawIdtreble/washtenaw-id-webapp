import React from "react";
import Businesses from "./Businesses";
import { render, screen, within, waitFor } from "@testing-library/react";
import { TEST_BUSINESSES } from "../../mock-server/businesses-resolver";
import { toTitleCase } from "../../utilities/to-title-case";

describe(Businesses.name, () => {
    beforeEach(() => {
        render(<Businesses/>);
    });

    test("has a header", ()=> {
        const pageHeader = screen.getByRole("heading", { level: 1 });
        expect(pageHeader.textContent).toBe("Businesses that accept the ID");
    });

    test("contains category name as header for a set of businesses", async() => {
        await waitFor(() => {
            const categoryNames = screen.getAllByRole("heading", { level: 2 }).map(h2 => h2.textContent);
            const titleCaseCategories = TEST_BUSINESSES.map(b => toTitleCase(b.category));
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
            const titleCaseBusinesses = TEST_BUSINESSES.map(bc => bc.businesses.map(b => toTitleCase(b)));
            expect(listItems).toEqual(titleCaseBusinesses);
        });
    });  
});  