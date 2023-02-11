import { useEffect, useState } from "react";
import { SERVER_ENDPOINTS } from "../utilities/server-endpoints";
import { useGET } from "./fetch/useGet";

export type Category = { displayName: string, name: string };
export type ErrorMessage = { message: string };

export const CATEGORY_ERROR_MESSAGE = "Failed to load the categories. Please reload the page or try again later.";

export function useCategories(): { categories: Category[], error: ErrorMessage | undefined }  {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<ErrorMessage>();

    const getCategories = useGET<Category[]>(SERVER_ENDPOINTS.CATEGORIES);

    useEffect(() => {
        getCategories((ok, response) => {
            if (ok) {
                setCategories(response);
            } else {
                setError({message: CATEGORY_ERROR_MESSAGE});
            }
        });
    }, [getCategories]);
    return {categories: categories, error: error};
}

