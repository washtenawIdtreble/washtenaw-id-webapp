import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../contexts/AlertContext";
import { SERVER_ENDPOINTS } from "../utilities/server-endpoints";
import { useGET } from "./fetch/useGet";

export type Category = { displayName: string, category: string };

export function useCategories(): Category[] {
    const [categories, setCategories] = useState<Category[]>([]);
    const { showAlert } = useContext(AlertContext);

    const getCategories = useGET<Category[]>(SERVER_ENDPOINTS.CATEGORIES);

    useEffect(() => {
        getCategories((ok, response) => {
            if (ok) {
                setCategories(response);
            } else {
                showAlert({
                    heading: "Error",
                    message: "Failed to load the categories. Please reload the page or try again later.",
                });
            }
        });
    }, [getCategories, showAlert]);
    return categories;
}