import { setupWorker } from "msw";
import { handlers } from "./production-server-handlers";
import { UnhandledRequestStrategy } from "msw/lib/types/utils/request/onUnhandledRequest";

/**
 * This is used as the mock server when the app is running locally from source
 */
export const mockWorker = setupWorker(...handlers);

export const onUnhandledRequest: UnhandledRequestStrategy = ({ method, url }) => {
    const ignoredSubstrings = [
        "hot-update", // "hot-update" appears in requests made when the app hot reloads when running from source
    ];
    if (!ignoredSubstrings.some(substring => url.pathname.includes(substring))) {
        throw new Error(`Unhandled ${method} request to ${url}`);
    }
};