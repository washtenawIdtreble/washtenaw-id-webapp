export const BASE_URL = (): string => {
    switch (process.env.REACT_APP_API) {
        case undefined:
            throw new Error("REACT_APP_API not defined");
        case "fake-data":
            return "";
        case "localhost":
            return "http://localhost:8000";
        default:
            return process.env.REACT_APP_API;
    }
};