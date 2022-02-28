import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { handlers } from "./server-handlers";

const mockServer = setupServer(...handlers)
export { mockServer, rest };