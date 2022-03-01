import { setupServer } from "msw/node";
import { handlers } from "./test-server-handlers";

/**
 * This is used as the mock server for automated tests
 */
export const mockServer = setupServer(...handlers);