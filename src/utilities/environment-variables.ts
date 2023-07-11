export const ENVIRONMENT_VARIABLES = {
    REACT_APP_API: "REACT_APP_API",
    REACT_APP_FOCUS_TIMEOUT: "REACT_APP_FOCUS_TIMEOUT",
    REACT_APP_LOADING_TIMEOUT: "REACT_APP_LOADING_TIMEOUT",
    REACT_APP_LIVE_REGION_CLEAR_TIMEOUT: "REACT_APP_LIVE_REGION_CLEAR_TIMEOUT",
};

export const getIntegerEnvVar = (variableName: string, defaultValue?: number): number => {
    const value = process.env[variableName];

    if (value === undefined) {
        if (defaultValue) {
            return defaultValue;
        }
        throw new Error("The environment variable UNKNOWN has no value");
    }

    return parseInt(value);
};
