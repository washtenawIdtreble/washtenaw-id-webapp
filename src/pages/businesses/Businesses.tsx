import React from "react";
import useBusinesses from "../../hooks/useBusinesses";
import { toTitleCase } from "../../utilities/to-title-case";
import "./Businesses.css";

export default function Businesses () {
    const HEADER_TEXT = "Businesses that accept the ID";
    const businesses = useBusinesses();

    return(
        <>
        <h1>{HEADER_TEXT}</h1>
            {businesses.map(business => {
                return <ul 
                            className={"businesses-list"}
                            key={business.category}>
                    <h2 
                        className={"businesses-header"}
                        key={business.category}>
                        {toTitleCase(business.category)}
                    </h2>
                    {business.businesses.map(businessName => {
                        return <li
                                className={"business-item"}
                                key={businessName}>
                                {toTitleCase(businessName)}
                            </li>
                  })}
               </ul>
            })}
        </>
        );
}

