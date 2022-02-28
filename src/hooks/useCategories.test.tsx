import React from "react";
import { render, waitFor } from "@testing-library/react";
import useCategories from "./useCategories";
import fetchWrapper from "../fetchWrapper";
import { when } from "jest-when";

jest.mock("../fetchWrapper");

describe(useCategories.name, () => {
    let expectedData: string[];
    let resolveFetchRequest: () => void;
    let rerender: any;
    beforeEach(() => {
        expectedData = ["cranberries", "banana", "cherry"];
        const mockResponseJson = jest.fn().mockName("response.json");
        mockResponseJson.mockResolvedValue(expectedData);

        jest.mocked(fetchWrapper).mockName("fetch");
        when(fetchWrapper)
            .calledWith("categories")
            .mockImplementation(() => {
                return new Promise((resolve) => {
                    resolveFetchRequest = () => {
                        //@ts-ignore
                        resolve({
                            json: mockResponseJson
                        });
                    }
                });
            });

        ({rerender} = render(<StubComponent/>));
    });
    test("should return an empty list of categories before fetch is complete", () => {
        expect(categories).toEqual([]);
    });
    test("should update the categories with the response from fetch", async () => {
        await waitFor(() => resolveFetchRequest());
        expect(categories).toBe(expectedData);
    });
    test("should call fetch only once", () => {
        rerender(<StubComponent/>);
        expect(fetchWrapper).toHaveBeenCalledTimes(1);
    });
});

let categories: string[];

function StubComponent() {
    categories = useCategories();
    return (
        <div/>
    );
}