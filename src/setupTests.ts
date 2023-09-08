// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import "jest-when";
import { setupTestingServer } from "./mock-server/setup-testing-server";
import { toHaveNoViolations } from "jest-axe";
import { ENVIRONMENT_VARIABLES } from "./utilities/environment-variables";

process.env[ENVIRONMENT_VARIABLES.REACT_APP_API] = "test";
process.env[ENVIRONMENT_VARIABLES.REACT_APP_FOCUS_TIMEOUT] = "10";
process.env[ENVIRONMENT_VARIABLES.REACT_APP_LOADING_TIMEOUT] = "100";
process.env[ENVIRONMENT_VARIABLES.REACT_APP_LIVE_REGION_CLEAR_TIMEOUT] = "100";
process.env[ENVIRONMENT_VARIABLES.REACT_APP_SUBHEADING_FOCUS_TIMEOUT] = "5";
process.env[ENVIRONMENT_VARIABLES.REACT_APP_SUBHEADING_FOCUS_ATTEMPTS] = "60";

setupTestingServer();

global.matchMedia = global.matchMedia || function () {
    return {
        matches: false,
    };
};

expect.extend(toHaveNoViolations);
