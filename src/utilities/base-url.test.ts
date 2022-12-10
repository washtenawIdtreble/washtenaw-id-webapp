import { BASE_URL } from "./base-url";

describe("Base URL utility", () => {
    afterEach(() => {
        process.env.REACT_APP_API = "fake-data";
    });
    describe("when the app is not configured", () => {
        test("should throw an error", async () => {
            delete process.env.REACT_APP_API;
            await expect(() => BASE_URL()).toThrow(new Error("REACT_APP_API not defined"));
        });
    });
    describe("when the app is configured to use a fake data server", () => {
        test("should return an empty URL", () => {
            expect(BASE_URL()).toEqual("http://fake-host");
        });
    });
    describe("when the app is configured to use a testing server", () => {
        test("should return an empty URL", () => {
            process.env.REACT_APP_API = "test";
            expect(BASE_URL()).toEqual("http://testinghost:9999");
        });
    });
    describe("when the app is configured to use a local server", () => {
        test("should return the correct URL", () => {
            process.env.REACT_APP_API = "localhost";
            expect(BASE_URL()).toEqual("http://localhost:8000");
        });
    });
    describe("when the app is configured to use any other server", () => {
        const serverURL = "some-server-somewhere";
        test("should return that server URL", () => {
            process.env.REACT_APP_API = serverURL;
            expect(BASE_URL()).toEqual(serverURL);
        });
    });
});