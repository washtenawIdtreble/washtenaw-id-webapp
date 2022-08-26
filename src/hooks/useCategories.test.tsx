import React from "react";
import { render, waitFor } from "@testing-library/react";
import useCategories from "./useCategories";
import {
    customCategoriesResolver,
    productionCategoriesResolver,
    TEST_CATEGORIES,
} from "../mock-server/resolvers/categories-resolver";
import { rest } from "msw";
import { mockServer } from "../mock-server/mock-server";
import { AlertContext, AlertContextValue } from "../contexts/AlertContext";
import { buildMockAlertContext, stubAlertData } from "../../test/test-factories";
import { BASE_URL } from "../utilities/base-url";

describe(useCategories.name, () => {
    describe("on successful load", () => {
        let rerender: any;
        beforeEach(() => {
            ({ rerender } = render(<StubComponent/>));
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
                    rest.get(`${BASE_URL()}/categories`, customCategoriesResolver(["anything"])),
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
    describe("on error loading categories", () => {
        const errorMessage = "Doesn't matter!";
        let alertContext: AlertContextValue;
        beforeEach(() => {
            alertContext = buildMockAlertContext({ showAlert: jest.fn().mockName("showAlert") });
            mockServer.use(
                rest.get(`${BASE_URL()}/categories`, productionCategoriesResolver(500, errorMessage)),
            );
            render(<AlertContext.Provider value={alertContext}><StubComponent/></AlertContext.Provider>);
        });
        test("should show an error alert", async () => {
            const alertData = stubAlertData({
                heading: "Error",
                message: "Failed to load the categories. Please reload the page or try again later.",
            });
            await waitFor(() => {
                expect(alertContext.showAlert).toHaveBeenCalledWith(alertData);
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