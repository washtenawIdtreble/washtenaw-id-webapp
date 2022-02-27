import { render, waitFor } from "@testing-library/react";
import useCategories from "./useCategories";
import fetchWrapper from "../fetchWrapper";

jest.mock("../fetchWrapper");
describe(useCategories.name, ()=> {
    let expectedData: string[];
    let releaseTheHounds: () => void;
    let rerender : any;
    beforeEach(() => {
        expectedData = ["cranberries", "banana", "cherry"];
        const mockResponseJson = jest.fn().mockName("response.json");
        mockResponseJson.mockResolvedValue(expectedData);
        
        jest.mocked(fetchWrapper)
        .mockName("fetch")
        .mockImplementation(() => {
            return new Promise((resolve, reject) => {
                releaseTheHounds = () => {
                    //@ts-ignore
                    resolve({
                        json: mockResponseJson
                    })
                }
            });
        });
        rerender = render(<StubComponent></StubComponent>).rerender;
    });
    test("should return an empty list of categories before fetch is complete", () => {
        expect(categories).toEqual([]);
    });
    test("should make a request to get the categories", () => {
        expect(fetchWrapper).toHaveBeenCalledWith("categories");
    });
    test("should update the categories with the response from fetch", async () => {
        await waitFor(() => releaseTheHounds());
        expect(categories).toBe(expectedData);
    });
    test("should call fetch only once", () => {
        rerender(<StubComponent></StubComponent>);
        expect(fetchWrapper).toHaveBeenCalledTimes(1);
    });
});

let categories: string[];
function StubComponent() {
    categories = useCategories();
    return (
         <div></div>
    );
}