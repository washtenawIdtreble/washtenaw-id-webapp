import React from "react";
import { Business } from "../../hooks/useBusinesses";

type BusinessCardProps = {
    business: Business;
}

export const BusinessCard = ({ business }: BusinessCardProps) => {
    const businessAddress = `${business.address}, ${business.city}, ${business.state} ${business.zip}`;
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(businessAddress)}`;
    const shortWebsite = business.website.replace(/http[s]?:\/\//g, "");
    return (
        <div className={"business-card"}>
            <h3 className={"business-card-heading"}>{business.name}</h3>

            <div className={"bussines-card-row"}>
                <span className={"business-card-label"}>Address</span>
                <a href={mapsUrl} className={"business-card-link business-card-value"} target={"_blank"}
                   rel="noreferrer">
                    {businessAddress}
                </a>
            </div>

            <div className={"bussines-card-row"}>
                <span className={"business-card-label"}>Website</span>
                <a href={business.website} className={"business-card-link business-card-value"} target={"_blank"}
                   rel="noreferrer">
                    {shortWebsite}
                </a>
            </div>

            <div className={"bussines-card-row"}>
                <span className={"business-card-label"}>Phone</span>
                <a href={`tel:${business.phone}`} className={"business-card-link business-card-value"}>
                    {business.phone}
                </a>
            </div>

            <div className={"bussines-card-row"}>
                <span className={"business-card-label"}>About</span>
                <span className={"business-card-value"}>{business.description}</span>
            </div>
        </div>
    );
};