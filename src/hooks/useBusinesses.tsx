import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../contexts/AlertContext";
import { SERVER_ENDPOINTS } from "../utilities/server-endpoints";
import { Category } from "./useCategories";
import { useGET } from "./fetch/useGet";

export type CategorizedBusinesses = { category: Category, businesses: Business[] }

export type Business = {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    website: string;
    phone: string;
    description: string;
}

export function useBusinesses(): { category: Category, businesses: Business[] }[] {
    const [businesses, setBusinesses] = useState<CategorizedBusinesses[]>([]);
    const { showAlert } = useContext(AlertContext);

    const getBusinesses = useGET<CategorizedBusinesses[]>(SERVER_ENDPOINTS.BUSINESSES);

    useEffect(() => {
        getBusinesses((ok, response) => {
            if (ok) {
                setBusinesses(response);
            } else {
                showAlert({
                    heading: "Error",
                    message: "Failed to load the businesses. Please reload the page or try again later.",
                });
            }
        });
    }, [getBusinesses, showAlert]);
    return businesses;
}