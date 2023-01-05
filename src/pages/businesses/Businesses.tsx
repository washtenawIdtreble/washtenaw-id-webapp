import React from "react";
import { useBusinesses } from "../../hooks/useBusinesses";
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
                        <ul aria-labelledby={categorizedBusinesses.category.name}
                            className={"businesses-list"}
                            key={`${categorizedBusinesses.category.name}-list`}>

                            {categorizedBusinesses.businesses.map(business => {
                                return <li
                                    className={"business-item"}
                                    key={business.name}>
                                    {business.name}
                                </li>;
                            })}
                        </ul>
                        ;
                    </div>);
            })}
        </>
    );
}

