import React from "react";
import { useBusinesses } from "../../hooks/useBusinesses";
import "./Businesses.css";
import "../Pages.css";
import { BusinessCard } from "./BusinessCard";
import { ErrorMessageNotification } from "../../components/userMessage/ErrorMessageNotification";
import { MainHeading } from "../../components/MainHeading";

export const BUSINESSES_PAGE_HEADING = "Businesses that accept the ID";

export function Businesses() {
    const { categorizedBusinesses, error } = useBusinesses();

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
        <>
            <MainHeading>{BUSINESSES_PAGE_HEADING}</MainHeading>
            {categories.length > 0 && categories}
            {error && <ErrorMessageNotification message={error.message}/>}
        </>
    );
}

