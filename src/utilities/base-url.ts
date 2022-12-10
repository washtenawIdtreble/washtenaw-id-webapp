export const BASE_URL = (): string => {
    switch (process.env.REACT_APP_API) {
        case undefined:
            throw new Error("REACT_APP_API not defined");
        case "fake-data":
            return "http://fake-host";
        case "test":
            return "http://testinghost:9999";
        case "localhost":
            return "http://localhost:8000";
        default:
            return process.env.REACT_APP_API;
    }
};