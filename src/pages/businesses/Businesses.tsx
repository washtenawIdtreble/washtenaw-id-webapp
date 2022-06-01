import React from "react";
import useBusinesses from "../../hooks/useBusinesses";
import "./Businesses.css";
import { useFocusOnLoad } from "../../hooks/useFocusOnLoad";
import { useLocation } from "react-router-dom"

export function Businesses () {
    const HEADER_TEXT = "Businesses that accept the ID";
    const businesses = useBusinesses();
    const { hash } = useLocation();

    useFocusOnLoad(hash.replace('#', ''));

    return(
        <>
        <h1>{HEADER_TEXT}</h1>
            {businesses.map(business => {
                return (
                <div key={`${business.category}-container`}> 
                <h2
                    id={business.category}
                    className={"businesses-header"}
                    tabIndex={-1}
                    key={`${business.category}-heading`}>
                    {(business.category)}
                </h2>
                <ul aria-labelledby={business.category}
                    className={"businesses-list"}
                    key={`${business.category}-list`}>

                    {business.businesses.map(businessName => {
                        return <li
                            className={"business-item"}
                            key={businessName}>
                            {(businessName)}
                        </li>;
                    })}
                </ul>;
                </div>)
            })}
        </>
        );
}

