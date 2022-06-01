import { useContext, useEffect, useState } from "react";
import { GET } from "../utilities/fetch";
import { BASE_URL } from "../utilities/base-url";
import { AlertContext } from "../contexts/AlertContext";

export default function useBusinesses(): { category: string, businesses: string[] }[] {
    const [businesses, setBusinesses] = useState<{ category: string, businesses: string[] }[]>([]);
    const { showAlert } = useContext(AlertContext);
    useEffect(() => {
        const { response, abort } = GET(`${BASE_URL()}/businesses`);

        response
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