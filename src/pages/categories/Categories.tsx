import React from "react";
import { useCategories } from "../../hooks/useCategories";
import "./Categories.css";
import { RefreshingLink } from "../../components/navigation/RefreshingLink";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";
import { ErrorMessageNotification } from "../../components/userMessage/ErrorMessageNotification";

export function Categories() {
    const { categories, error } = useCategories();
    
    return ( 
        <div>
            {categories.length > 0 && <ul className={"categories-list"} data-testid="categories-page">
                {categories.map(category =>
                    <li
                        className={"category-item"}
                        key={category.name}>
                        <RefreshingLink to={`${PAGE_ENDPOINTS.businesses}#${category.name}`}
                                        className={"category-link"}>
                            {category.displayName}
                        </RefreshingLink>
                    </li>)}
                </ul> 
            }
        
            {error && <ErrorMessageNotification message={error.message}/>}
        </div>
    );
}