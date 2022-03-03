import { useEffect, useState } from "react";
import { GET } from "../fetch";
import { BASE_URL } from "../utilities/base-url";

export default function useCategories(): string[] {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const result = GET(`${BASE_URL()}/categories`);

        result.response
            .then(async (response: Response) => {
                setCategories(await response.json());
            })
            .catch(_e => {});

        return () => {
            result.abort();
        };
    }, []);
    return categories;
}