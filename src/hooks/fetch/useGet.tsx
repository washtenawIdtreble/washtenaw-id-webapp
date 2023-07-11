import { useCallback, useContext, useEffect, useRef } from "react";
import { BASE_URL } from "../../utilities/base-url";
import { DEFAULT_ERROR_MESSAGE, GET, ResponseCallback } from "./fetch";
import { LoadingContext } from "../../contexts/LoadingContext";

type GetFunction<ResponseBody> = (responseCallback: ResponseCallback<ResponseBody>) => void;

export function useGET<T>(endpoint: string): GetFunction<T> {
    const abortRef = useRef<Array<() => void>>([]);
    const { startLoading, finishLoading } = useContext(LoadingContext);

    useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const abortFunctions = abortRef.current;
            if (abortFunctions) {
                abortFunctions.forEach(abort => abort());
            }
        };
    }, []);

    useEffect(() => {
        finishLoading();
    }, [finishLoading])

    return useCallback(async (responseCallback) => {
        startLoading();
        const { responsePromise, abort } = GET(`${BASE_URL()}/${endpoint}`);

        abortRef.current.push(abort);

        try {
            const response = await responsePromise;
            let ok = response.ok;

            const body = await response.json().catch(() => {
                ok = false;
                return { error: `There was an error getting the resource from ${BASE_URL()}/${endpoint}` };
            });

            const errorMessage = body?.error ?? DEFAULT_ERROR_MESSAGE;

            responseCallback(ok, body as T, errorMessage);
        } catch {
            responseCallback(false, undefined as unknown as T, "Something went wrong.");
        } finally {
            finishLoading();
        }
    }, [endpoint, finishLoading, startLoading]);
}
