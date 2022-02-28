import { useEffect, useState } from "react";
import { GET } from "../fetch";

export default function useCategories(): string[] {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const result = GET('categories');

        result.response
            .then(async (response: Response) => {
                setCategories(await response.json());
            })
            .catch(_e => {});

        return () => {
            result.abort();
        }
    }, []);
    return categories;
}