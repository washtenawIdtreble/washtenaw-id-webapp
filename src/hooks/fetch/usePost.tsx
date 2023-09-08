import { useCallback, useEffect, useRef } from "react";
import { BASE_URL } from "../../utilities/base-url";
import { DEFAULT_ERROR_MESSAGE, POST, ResponseCallback } from "./fetch";

type PostFunction<ResponseBody> = (body: any, responseCallback: ResponseCallback<ResponseBody>) => void;

export function usePOST<ResponseBody>(endpoint: string): PostFunction<ResponseBody> {
    const abortRef = useRef<Array<() => void>>([]);
    const unmounted = useRef(false);

    useEffect(() => {
        return () => {
            unmounted.current = true;
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const abortFunctions = abortRef.current;
            if (abortFunctions) {
                abortFunctions.forEach(abort => abort());
            }
        };
    }, []);

    return useCallback(async (requestBody, responseCallback) => {
        const { responsePromise, abort } = POST(`${BASE_URL()}/${endpoint}`, requestBody);

        const unmountSafeCallback: ResponseCallback<ResponseBody> = (...args) => {
            if (!unmounted.current) {
                responseCallback(...args);
            }
        };

        abortRef.current.push(abort);

        try {
            const response = await responsePromise;
            const body = await response.json().catch(() => {});

            const errorMessage = body?.error ?? DEFAULT_ERROR_MESSAGE;

            unmountSafeCallback(response.ok, body as ResponseBody, errorMessage);
        } catch (error) {
            unmountSafeCallback(false, undefined as unknown as ResponseBody, `Something went wrong submitting your message. ${error}`);
        }

    }, [endpoint]);
}
