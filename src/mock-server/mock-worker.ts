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
        "localhost:3000", // requests to localhost:3000, like loading the page itself, show an error in Chrome but not Firefox
        /* the icon for the menu loads correctly on page load, but was failing when resizing the page because
        this secondary request was being made to the service worker instead of the static files location*/
        "menu-icon"
    ];
    if (!ignoredSubstrings.some(substring => url.toString().includes(substring))) {
        throw new Error(`Unhandled ${method} request to ${url}`);
    }
};