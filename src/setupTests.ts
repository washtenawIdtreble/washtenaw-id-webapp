// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import "jest-when";
import { setupTestingServer } from "./mock-server/setup-testing-server";

process.env.REACT_APP_API = "test";

setupTestingServer();

global.matchMedia = global.matchMedia || function () {
    return {
        matches: false,
    };
};