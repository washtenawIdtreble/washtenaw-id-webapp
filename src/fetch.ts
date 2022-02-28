export type FetchResult = {
    response: Promise<Response>;
    abort(): void;
}

export const GET = (url: string): FetchResult => {
    const controller = new AbortController();

    return {
        response: fetch(url, { signal: controller.signal }),
        abort: () => {controller.abort()}
    };
}