import { useContext, useEffect, useState } from "react";
import { GET } from "../utilities/fetch";
import { BASE_URL } from "../utilities/base-url";
import { AlertContext } from "../contexts/AlertContext";
import { SERVER_ENDPOINTS } from "../utilities/server-endpoints";

export type Category = { displayName: string, category: string };

export function useCategories(): Category[] {
    const [categories, setCategories] = useState<Category[]>([]);
    const { showAlert } = useContext(AlertContext);
    useEffect(() => {
        const { responsePromise, abort } = GET(`${BASE_URL()}/${SERVER_ENDPOINTS.CATEGORIES}`);

        responsePromise
            .then(async (response: Response) => {
                if (response.ok) {
                    setCategories(await response.json());
                } else {
                    showAlert({
                        heading: "Error",
                        message: "Failed to load the categories. Please reload the page or try again later.",
                    });
                }
            })
            .catch(_e => {});

        return () => {
            abort();
        };
        /**
         * There is an ESLint error on the line below because showAlert is used inside the useEffect, but is not included
         * in its dependencies. It doesn't need to be included because it will not change.
         *
         * It is dangerous to suppressthe warning because it allows us to accidentally reference something that changes
         * in this useEffect without including it in our dependencies. It is more dangerous to include showAlert in the
         * dependencies, because it could trigger a rerender, even if it doesn't change, because JavaScript is not very
         * good at assessing the deep equality of non-primitive objects.
         *
         * This linter error is common when useEffect functions call context functions, so we can safely suppress the warning
         *
         * See this discussion for more info: https://github.com/facebook/create-react-app/issues/6880
         */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return categories;
}