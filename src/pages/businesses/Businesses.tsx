import React from "react";
import { useBusinesses } from "../../hooks/useBusinesses";
import "./Businesses.css";
import { useFocusOnLoad } from "../../hooks/useFocusOnLoad";
import { useLocation } from "react-router-dom";
import { BusinessCard } from "./BusinessCard";
import { ErrorMessageNotification } from "../../components/userMessage/ErrorMessageNotification";

export function Businesses() {
    const HEADER_TEXT = "Businesses that accept the ID";
    const { categorizedBusinesses, error } = useBusinesses();
    const { hash } = useLocation();

    useFocusOnLoad(hash.replace("#", ""));

    const categories = categorizedBusinesses.map(categorizedBusinesses => {
        return (
            <div className={"category-section"} key={`${categorizedBusinesses.category.name}-container`}>
                <div className={"category-heading-container"}>
                    <h2
                        id={categorizedBusinesses.category.name}
                        className={"category-heading"}
                        tabIndex={-1}
                        key={`${categorizedBusinesses.category.name}-heading`}>
                        {(categorizedBusinesses.category.displayName)}
                    </h2>
                </div>
                {categorizedBusinesses.businesses.map(business => {
                    return <BusinessCard business={business} key={business.name}/>;
                })}
            </div>);
    });

    return (
        <div className={"page-container"}>
            <h1 className={"page-heading"}>{HEADER_TEXT}</h1>
            {categorizedBusinesses.length > 0 && categories}
            {error && <ErrorMessageNotification message={error.message}/>}
        </div>
    );
}

