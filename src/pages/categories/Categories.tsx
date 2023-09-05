import React from "react";
import { useCategories } from "../../hooks/useCategories";
import "./Categories.css";
import { AppLink } from "../../components/navigation/AppLink";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";
import { ErrorMessageNotification } from "../../components/userMessage/ErrorMessageNotification";
import { MainHeading } from "../../components/MainHeading";

export const CATEGORIES_PAGE_HEADING = "Business Categories";

export function Categories() {
    const { categories, error } = useCategories();

    return (
        <>
            <MainHeading>{CATEGORIES_PAGE_HEADING}</MainHeading>
            <div>
                {categories.length > 0 && <ul className={"categories-list"}>
                    {categories.map(category =>
                        <li
                            className={"category-item"}
                            key={category.name}>
                            <AppLink to={`${PAGE_ENDPOINTS.businesses}#${category.name}`}
                                     className={"category-link light-focus-outline"}>
                                {category.displayName}
                            </AppLink>
                        </li>)}
                </ul>
                }

                {error && <ErrorMessageNotification message={error.message}/>}
            </div>
        </>
    );
}
