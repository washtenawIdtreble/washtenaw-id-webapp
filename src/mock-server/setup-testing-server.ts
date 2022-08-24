export const setupTestingServer = () => {
    const { mockServer } = require("./mock-server");
    beforeAll(() => mockServer.listen());
    afterEach(() => mockServer.resetHandlers());
    afterAll(() => mockServer.close());
};
