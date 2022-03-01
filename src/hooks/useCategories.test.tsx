import React from "react";
import { render, waitFor } from "@testing-library/react";
import useCategories from "./useCategories";
import { customCategoriesResolver, TEST_CATEGORIES } from "../mock-server/categories-resolver";
import { rest } from "msw";
import { mockServer } from "../mock-server/mock-server";

describe(useCategories.name, () => {
    let rerender: any;
    let unmount: any;
    beforeEach(() => {
        ({ rerender, unmount } = render(<StubComponent/>));
    });
    afterEach(() => {
        unmount();
    });
    test("should return an empty list of categories before fetch is complete", () => {
        expect(categories).toEqual([]);
    });
    test("should update the categories with the response from fetch", async () => {
        await waitFor(() => {
            expect(categories).toEqual(TEST_CATEGORIES);
        });
    });
    describe("on rerender", () => {
        beforeEach(() => {
            mockServer.use(
                rest.get("categories", customCategoriesResolver(["anything"]))
            );
            rerender(<StubComponent/>);
        });
        test("should not fetch again", async () => {
            await waitFor(() => {
                expect(categories).toEqual(TEST_CATEGORIES);
            });
        });
    });
});

let categories: string[];

function StubComponent() {
    categories = useCategories();
    return (
        <div/>
    );
}