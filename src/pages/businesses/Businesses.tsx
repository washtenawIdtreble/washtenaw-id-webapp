import React from "react";
import useBusinesses from "../../hooks/useBusinesses";
import "./Businesses.css";
import { useFocusOnLoad } from "../../hooks/useFocusOnLoad";
import { useLocation } from "react-router-dom";

export function Businesses() {
    const HEADER_TEXT = "Businesses that accept the ID";
    const categorizedBusinesses = useBusinesses();
    const { hash } = useLocation();

    useFocusOnLoad(hash.replace("#", ""));

    return (
        <>
            <h1>{HEADER_TEXT}</h1>
            {categorizedBusinesses.map(business => {
                return (
                    <div key={`${business.category.name}-container`}>
                        <h2
                            id={business.category.name}
                            className={"businesses-header"}
                            tabIndex={-1}
                            key={`${business.category.name}-heading`}>
                            {(business.category.displayName)}
                        </h2>
                        <ul aria-labelledby={business.category.name}
                            className={"businesses-list"}
                            key={`${business.category.name}-list`}>

                            {business.businesses.map(businessName => {
                                return <li
                                    className={"business-item"}
                                    key={businessName}>
                                    {(businessName)}
                                </li>;
                            })}
                        </ul>
                        ;
                    </div>);
            })}
        </>
    );
}

