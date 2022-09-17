export type FetchResult = {
    responsePromise: Promise<Response>;
    abort(): void;
}

export type ErrorResponse = {
    error: string
}

export const GET = (url: string): FetchResult => {
    const controller = new AbortController();

    return {
        responsePromise: fetch(url, { signal: controller.signal }),
        abort: () => {controller.abort();},
    };
};

export const POST = (url: string, body: any): FetchResult => {
    const controller = new AbortController();

    const request: RequestInit = {
        signal: controller.signal,
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
    };

    return {
        responsePromise: fetch(url, request),
        abort: () => {controller.abort();},
    };
};