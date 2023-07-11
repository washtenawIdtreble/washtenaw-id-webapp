// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import "jest-when";
import { setupTestingServer } from "./mock-server/setup-testing-server";
import { toHaveNoViolations } from "jest-axe";

process.env.REACT_APP_API = "test";
process.env.REACT_APP_FOCUS_TIMEOUT = "10";
process.env.REACT_APP_LOADING_TIMEOUT = "10";
process.env.REACT_APP_LIVE_REGION_CLEAR_TIMEOUT = "100";

setupTestingServer();

global.matchMedia = global.matchMedia || function () {
    return {
        matches: false,
    };
};

expect.extend(toHaveNoViolations);
