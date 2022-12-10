import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../contexts/AlertContext";
import { SERVER_ENDPOINTS } from "../utilities/server-endpoints";
import { Category } from "./useCategories";
import { useGET } from "./fetch/useGet";

type Business = { category: Category, businesses: string[] }

export default function useBusinesses(): { category: Category, businesses: string[] }[] {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const { showAlert } = useContext(AlertContext);

    const getBusinesses = useGET<Business[]>(SERVER_ENDPOINTS.BUSINESSES);

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