import React from "react";
import { render, waitFor } from "@testing-library/react";
import { CategorizedBusinesses, useBusinesses } from "./useBusinesses";
import {
    customBusinessesResolver,
    productionBusinessesResolver,
    TEST_CATEGORIZED_BUSINESSES,
} from "../mock-server/businesses-resolver";
import { rest } from "msw";
import { mockServer } from "../mock-server/mock-server";
import { AlertContext, AlertContextValue } from "../contexts/AlertContext";
import { buildMockAlertContext, stubAlertData } from "../../test/test-factories";
import { BASE_URL } from "../utilities/base-url";
import { SERVER_ENDPOINTS } from "../utilities/server-endpoints";

describe(useBusinesses.name, () => {
    describe("on successful load", () => {
        let rerender: any;
        let unmount: any;
        beforeEach(() => {
            ({ rerender, unmount } = render(<StubComponent/>));
        });
        afterEach(() => {
            unmount();
        });
        test("should return an empty list of businesses before fetch is complete", () => {
            expect(businesses).toEqual([]);
        });
        test("should update the businesses with the response from fetch", async () => {
            await waitFor(() => {
                expect(businesses).toEqual(TEST_CATEGORIZED_BUSINESSES);
            });
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
                    expect(businesses).toEqual(TEST_CATEGORIZED_BUSINESSES);
                });
            });
        });
    });
    describe("on error loading businesses", () => {
        const errorMessage = "Doesn't matter!";
        let alertContext: AlertContextValue;
        beforeEach(() => {
            alertContext = buildMockAlertContext({ showAlert: jest.fn().mockName("showAlert") });
            mockServer.use(
                rest.get(`${BASE_URL()}/${SERVER_ENDPOINTS.BUSINESSES}`, productionBusinessesResolver(500, errorMessage)),
            );
            render(<AlertContext.Provider value={alertContext}><StubComponent/></AlertContext.Provider>);
        });
        test("should show an error alert", async () => {
            const alertData = stubAlertData({
                heading: "Error",
                message: "Failed to load the businesses. Please reload the page or try again later.",
            });
            await waitFor(() => {
                expect(alertContext.showAlert).toHaveBeenCalledWith(alertData);
            });
        });
    });
});

let businesses: CategorizedBusinesses[];

function StubComponent() {
    businesses = useBusinesses();
    return (
        <div/>
    );
}