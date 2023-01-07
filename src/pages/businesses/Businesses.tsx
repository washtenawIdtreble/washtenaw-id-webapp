import React from "react";
import { useBusinesses } from "../../hooks/useBusinesses";
import "./Businesses.css";
import { useFocusOnLoad } from "../../hooks/useFocusOnLoad";
import { useLocation } from "react-router-dom";
import { BusinessCard } from "./BusinessCard";

export function Businesses() {
    const HEADER_TEXT = "Businesses that accept the ID";
    const categorizedBusinesses = useBusinesses();
    const { hash } = useLocation();

    useFocusOnLoad(hash.replace("#", ""));

    return (
        <>
            <h1>{HEADER_TEXT}</h1>
            {categorizedBusinesses.map(categorizedBusinesses => {
                return (
                    <div key={`${categorizedBusinesses.category.name}-container`}>
                        <h2
                            id={categorizedBusinesses.category.name}
                            className={"businesses-header"}
                            tabIndex={-1}
                            key={`${categorizedBusinesses.category.name}-heading`}>
                            {(categorizedBusinesses.category.displayName)}
                        </h2>
                        {categorizedBusinesses.businesses.map(business => {
                            return <BusinessCard business={business} key={business.name}/>;
                        })}
                    </div>);
            })}
        </>
    );
}

