import { ENVIRONMENT_VARIABLES, getIntegerEnvVar } from "./environment-variables";

describe("Environment Variables Utility", () => {
    afterEach(() => {
        delete process.env.TEST_ENV_VAR;
    });

    test("has a constant for each known environment variable", () => {
        expect(ENVIRONMENT_VARIABLES.REACT_APP_API).toEqual("REACT_APP_API");
        expect(ENVIRONMENT_VARIABLES.REACT_APP_FOCUS_TIMEOUT).toEqual("REACT_APP_FOCUS_TIMEOUT");
        expect(ENVIRONMENT_VARIABLES.REACT_APP_LOADING_TIMEOUT).toEqual("REACT_APP_LOADING_TIMEOUT");
        expect(ENVIRONMENT_VARIABLES.REACT_APP_LIVE_REGION_CLEAR_TIMEOUT).toEqual("REACT_APP_LIVE_REGION_CLEAR_TIMEOUT");
    });

    describe(getIntegerEnvVar.name, () => {
        test("returns numeric environment variable as a number", () => {
            process.env.TEST_ENV_VAR = "73";

            const envVar = getIntegerEnvVar("TEST_ENV_VAR");

            expect(envVar).toEqual(73);
        });

        test("ignores default if variable has a value", () => {
            process.env.TEST_ENV_VAR = "531";

            const envVar = getIntegerEnvVar("TEST_ENV_VAR", 1);

            expect(envVar).toEqual(531);
        });

        test("returns default if provided and value is unknown", () => {
            const envVar = getIntegerEnvVar("TEST_ENV_VAR", 2178);

            expect(envVar).toEqual(2178);
        });

        test("throws an exception for an unknown variable", () => {
            expect(() => getIntegerEnvVar("UNKNOWN")).toThrow("The environment variable UNKNOWN has no value");
        });
    });
});
