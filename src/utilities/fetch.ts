export type FetchResult = {
    response: Promise<Response>;
    abort(): void;
}

export const GET = (url: string): FetchResult => {
    const controller = new AbortController();

    return {
        response: fetch(url, { signal: controller.signal }),
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
        response: fetch(url, request),
        abort: () => {controller.abort();},
    };
};