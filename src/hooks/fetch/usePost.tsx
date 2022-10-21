import { useCallback, useEffect, useRef } from "react";
import { BASE_URL } from "../../utilities/base-url";
import { DEFAULT_ERROR_MESSAGE, POST, ResponseCallback } from "./fetch";

type PostFunction<ResponseBody> = (body: any, responseCallback: ResponseCallback<ResponseBody>) => void;

export function usePOST<ResponseBody>(endpoint: string): PostFunction<ResponseBody> {
    const abortRef = useRef<Array<() => void>>([]);

    useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const abortFunctions = abortRef.current;
            if (abortFunctions) {
                abortFunctions.forEach(abort => abort());
            }
        };
    }, []);

    return useCallback(async (requestBody, responseCallback) => {
        const { responsePromise, abort } = POST(`${BASE_URL()}/${endpoint}`, requestBody);

        abortRef.current.push(abort);

        try {
            const response = await responsePromise;
            const body = await response.json().catch(() => {});

            const errorMessage = body?.error ?? DEFAULT_ERROR_MESSAGE;

            responseCallback(response.ok, body as ResponseBody, errorMessage);
        } catch {}

    }, [endpoint]);
}