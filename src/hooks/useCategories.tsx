import { useEffect, useState } from "react";
import fetchWrapper from "../fetchWrapper";

export default function useCategories(): string[] {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const controller = new AbortController();

        fetchWrapper("categories", {signal: controller.signal})
            .then(async (response: Response) => {
                setCategories(await response.json());
            })
            .catch(_e => {
            });

        return () => {
            controller.abort();
        }
    }, []);
    return categories;
}