import { useContext, useEffect, useState } from "react";
import { GET } from "../utilities/fetch";
import { BASE_URL } from "../utilities/base-url";
import { AlertContext } from "../contexts/AlertContext";
import { SERVER_ENDPOINTS } from "../utilities/server-endpoints";
import { Category } from "./useCategories";

export default function useBusinesses(): { category: Category, businesses: string[] }[] {
    const [businesses, setBusinesses] = useState<{ category: Category, businesses: string[] }[]>([]);
    const { showAlert } = useContext(AlertContext);
    useEffect(() => {
        const { responsePromise, abort } = GET(`${BASE_URL()}/${SERVER_ENDPOINTS.BUSINESSES}`);

        responsePromise
            .then(async (response: Response) => {
                if (response.ok) {
                    setBusinesses(await response.json());
                } else {
                    showAlert({
                        heading: "Error",
                        message: "Failed to load the businesses. Please reload the page or try again later.",
                    });
                }
            })
            .catch(_e => {});

        return () => {
            abort();
        };
    }, []);
    return businesses;
}