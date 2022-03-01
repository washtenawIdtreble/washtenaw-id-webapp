import { setupWorker } from "msw";
import { handlers } from "./production-server-handlers";

/**
 * This is used as the mock server when the app is running
 */
export const mockWorker = setupWorker(...handlers);