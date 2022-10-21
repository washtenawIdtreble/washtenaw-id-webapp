import { DEFAULT_ERROR_MESSAGE, FetchResult, GET, POST } from "./fetch";

describe("fetch utilities", () => {
    let originalFetch: any;
    const url = "some-url";
    let fetchResponse: Promise<Response>;
    let result: FetchResult;
    let abortSpy: jest.SpyInstance<void, []>;
    let signal: AbortSignal;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn().mockName("fetch");

        abortSpy = jest.spyOn(AbortController.prototype, "abort");

        signal = { aborted: false } as AbortSignal;
        jest.spyOn(AbortController.prototype, "signal", "get").mockReturnValue(signal);

        // @ts-ignore
        fetchResponse = Promise.resolve({ fake: "response" });

        jest.mocked(fetch).mockReturnValue(fetchResponse);
    });
    afterEach(() => {
        global.fetch = originalFetch;
    });

    test("DEFAULT_ERROR_MESSAGE", () => {
        expect(DEFAULT_ERROR_MESSAGE).toEqual("There was an error, please try again.");
    });

    describe(GET.name, () => {
        beforeEach(async () => {
            result = await GET(url);
        });
        test("should call fetch", () => {
            expect(fetch).toHaveBeenCalledWith(url, { signal });
        });
        test("should return the fetch response", async () => {
            expect(result.responsePromise).toBe(fetchResponse);
        });
        test("should return a function to abort the request", () => {
            expect(abortSpy).toHaveBeenCalledTimes(0);
            result.abort();
            expect(abortSpy).toHaveBeenCalledTimes(1);
        });
    });
    describe(POST.name, () => {
        let postBody: TestPostData;
        beforeEach(async () => {
            postBody = {
                name: "Maxwell",
                age: 19,
                isValid: true,
            };
            result = await POST(url, postBody);
        });
        test("should call fetch", () => {
            expect(fetch).toHaveBeenCalledWith(url, {
                signal,
                method: "POST",
                body: JSON.stringify(postBody),
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
            });
        });
        test("should return the fetch response", async () => {
            expect(result.responsePromise).toBe(fetchResponse);
        });
        test("should return a function to abort the request", () => {
            expect(abortSpy).toHaveBeenCalledTimes(0);
            result.abort();
            expect(abortSpy).toHaveBeenCalledTimes(1);
        });
    });
});

type TestPostData = {
    name: string,
    age: number,
    isValid: boolean
}