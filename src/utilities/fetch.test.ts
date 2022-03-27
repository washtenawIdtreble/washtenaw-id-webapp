import { FetchResult, GET } from "./fetch";

describe('fetch utilities', () => {
    let originalFetch: any
    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn().mockName("fetch");
    });
    afterEach(() => {
        global.fetch = originalFetch;
    });
    describe(GET.name, () => {
        const url = "some-url";
        let fetchResponse: Promise<Response>;
        let result: FetchResult;
        let abortSpy: jest.SpyInstance<void, []>;
        let signal: AbortSignal;
        beforeEach(async () => {
            abortSpy = jest.spyOn(AbortController.prototype, "abort");

            signal = { aborted: false } as AbortSignal;
            jest.spyOn(AbortController.prototype, "signal", "get").mockReturnValue(signal);

            // @ts-ignore
            fetchResponse = Promise.resolve({ fake: "response" });

            jest.mocked(fetch).mockReturnValue(fetchResponse);

            result = await GET(url);
        });
        test('should call fetch', () => {
            expect(fetch).toHaveBeenCalledWith(url, { signal });
        });
        test('should return the fetch response', async () => {
            expect(result.response).toBe(fetchResponse);
        });
        test('should return a function to abort the request', () => {
            expect(abortSpy).toHaveBeenCalledTimes(0);
            result.abort();
            expect(abortSpy).toHaveBeenCalledTimes(1);
        });
    });
});