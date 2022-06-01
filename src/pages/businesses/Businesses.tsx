import React from "react";
import useBusinesses from "../../hooks/useBusinesses";
import { toTitleCase } from "../../utilities/to-title-case";
import "./Businesses.css";

export default function Businesses () {
    const HEADER_TEXT = "Businesses that accept the ID";
    const businesses = useBusinesses();

    return(
        <main>
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
        </main>
        );

//     <ul className={"categories-list"} data-testid="categories-page">
//     {categories.map(category =>
//         <li
//             className={"category-item"}
//             key={category}>
//             {toTitleCase(category)}
//         </li>)}
// </ul>

           // {businesses.map(business =>
            // <h2>{toTitleCase(business.category)}</h2>
            // <ul>
            // {businesses.map(businessName =>
            //     <li>
            //         {toTitleCase(businessName.businesses[0])}
            //     </li>)}
            // </ul>
            // )}
}

