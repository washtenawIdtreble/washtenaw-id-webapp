import React from "react";
import { render, waitFor } from "@testing-library/react";
import { useCategories, Category, ErrorMessage, CATEGORY_ERROR_MESSAGE } from "./useCategories";
import {
    customCategoriesResolver,
    errorCategoriesResolver,
    TEST_CATEGORIES,
} from "../mock-server/resolvers/categories-resolver";
import { rest } from "msw";
import { mockServer } from "../mock-server/mock-server";
import { BASE_URL } from "../utilities/base-url";

describe(useCategories.name, () => {
    describe("on successful load", () => {
        let rerender: any;
        beforeEach(() => {
            ({ rerender } = render(<StubComponent/>));
        });
        test("should return an empty list of categories before fetch is complete", () => {
            expect(response.categories).toEqual([]);
        });
        test("should update the categories with the response from fetch", async () => {
            await waitFor(() => {
                expect(response.categories).toEqual(TEST_CATEGORIES);
            });
        });
        test("should have no error", async () => {
            await waitFor(() => {
                expect(response.error).toBeUndefined;
            });
        });
        describe("on rerender", () => {
            beforeEach(() => {
                mockServer.use(
                    rest.get(`${BASE_URL()}/categories`, customCategoriesResolver([{displayName: "anything", name: "any category" }])),
                );
                rerender(<StubComponent/>);
            });
            test("should not fetch again", async () => {
                await waitFor(() => {
                    expect(response.categories).toEqual(TEST_CATEGORIES);
                });
            });
        });
    });
    describe("on error loading categories", () => {
        const errorMessage = "Doesn't matter!";
        beforeEach(() => {
            mockServer.use(
                rest.get(`${BASE_URL()}/categories`, errorCategoriesResolver(500, errorMessage)),
            );
            render(<StubComponent/>);
        });
        test("should show an error message", async () => {
            await waitFor(() => {
                expect(response.error.message).toEqual(CATEGORY_ERROR_MESSAGE);
            });
        });
    });
});

let response: {categories: Category[], error: ErrorMessage | undefined};

function StubComponent() {
    response = useCategories();
    return (
        <div/>
    );
}