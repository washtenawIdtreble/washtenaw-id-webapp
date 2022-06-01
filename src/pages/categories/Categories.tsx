import React from "react";
import { useCategories } from "../../hooks/useCategories";
import "./Categories.css";
import { RefreshingLink } from "../../components/navigation/RefreshingLink";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";

export function Categories() {
    const categories = useCategories();
    return (
        <ul className={"categories-list"} data-testid="categories-page">
            {categories.map(category =>
                <li
                    className={"category-item"}
                    key={category.category}>
                    <RefreshingLink to={`${PAGE_ENDPOINTS.businesses}#${category}`}
                                    className={"nav-link"}>
                                    {category.displayName}
                    </RefreshingLink>
                </li>)}
        </ul>
    );
}