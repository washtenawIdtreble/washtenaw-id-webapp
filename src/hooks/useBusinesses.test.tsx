import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BUSINESS_ERROR_MESSAGE, CategorizedBusinesses, useBusinesses } from "./useBusinesses";
import {
    customBusinessesResolver,
    productionBusinessesResolver,
    TEST_CATEGORIZED_BUSINESSES,
} from "../mock-server/businesses-resolver";
import { rest } from "msw";
import { mockServer } from "../mock-server/mock-server";
import { BASE_URL } from "../utilities/base-url";
import { SERVER_ENDPOINTS } from "../utilities/server-endpoints";
import { ErrorMessage } from "./useCategories";

describe(useBusinesses.name, () => {
    describe("on successful load", () => {
        let rerender: any;
        beforeEach(() => {
            ({ rerender } = render(<StubComponent/>));
        });
        afterEach(async () => {
            // wait for API call to resolve to avoid "can't update an unmounted component" error message
            await waitFor(() => {
                screen.getByText("Done");
            });
        });
        test("should return an empty list of businesses before fetch is complete", () => {
            expect(response.categorizedBusinesses).toEqual([]);
        });
        test("should update the businesses with the response from fetch", async () => {
            await waitFor(() => {
                expect(response.categorizedBusinesses).toEqual(TEST_CATEGORIZED_BUSINESSES);
            });
        });
        test("should have no error", async () => {
            await screen.findByText("Done");

            expect(response.error).toBeUndefined();
        });
        describe("on rerender", () => {
            beforeEach(() => {
                mockServer.use(
                    rest.get(`${BASE_URL()}/${SERVER_ENDPOINTS.BUSINESSES}`, customBusinessesResolver([])),
                );
                rerender(<StubComponent/>);
            });
            test("should not fetch again", async () => {
                await waitFor(() => {
                    expect(response.categorizedBusinesses).toEqual(TEST_CATEGORIZED_BUSINESSES);
                });
            });
        });
    });
    describe("on error loading businesses", () => {
        const errorMessage = "Doesn't matter!";
        beforeEach(() => {
            mockServer.use(
                rest.get(`${BASE_URL()}/${SERVER_ENDPOINTS.BUSINESSES}`, productionBusinessesResolver(500, errorMessage)),
            );
            render(<StubComponent/>);
        });
        test("should show an error message", async () => {
            await waitFor(() => {
                expect(response!.error!.message).toEqual(BUSINESS_ERROR_MESSAGE);
            });
        });
    });
});

let response: { categorizedBusinesses: CategorizedBusinesses[], error: ErrorMessage | undefined };

function StubComponent() {
    response = useBusinesses();
    return (
        <div>
            {response.categorizedBusinesses.length > 0 && <span>Done</span>}
        </div>
    );
}