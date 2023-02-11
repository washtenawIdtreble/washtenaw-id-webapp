import { useEffect, useState } from "react";
import { SERVER_ENDPOINTS } from "../utilities/server-endpoints";
import { Category, ErrorMessage } from "./useCategories";
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

export const BUSINESS_ERROR_MESSAGE = "Failed to load the businesses. Please reload the page or try again later.";

export function useBusinesses(): { categorizedBusinesses: CategorizedBusinesses[], error: ErrorMessage | undefined } {
    const [businesses, setBusinesses] = useState<CategorizedBusinesses[]>([]);
    const [error, setError] = useState<ErrorMessage>();

    const getBusinesses = useGET<CategorizedBusinesses[]>(SERVER_ENDPOINTS.BUSINESSES);

    useEffect(() => {
        getBusinesses((ok, response) => {
            if (ok) {
                setBusinesses(response);
            } else {
                setError({message: BUSINESS_ERROR_MESSAGE});
            }
        });
    }, [getBusinesses]);
    return {categorizedBusinesses: businesses, error: error};
}