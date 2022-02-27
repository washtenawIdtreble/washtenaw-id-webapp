import { useState, useEffect } from "react";
import fetchWrapper from "../fetchWrapper";

export default function useCategories() : string[] {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetchWrapper("categories").then(async (response: Response) => {
            setCategories(await response.json());
        });
    }, []); 
    return categories;
}