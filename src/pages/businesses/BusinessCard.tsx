import React from "react";
import { Business } from "../../hooks/useBusinesses";
import { OpensInANewTabLink } from "../../components/OpensInNewTab/OpensInANewTabLink";

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
                <OpensInANewTabLink href={mapsUrl} className={"inline-link business-card-value"}>
                    {businessAddress}
                </OpensInANewTabLink>
            </div>

            <div className={"bussines-card-row"}>
                <span className={"business-card-label"}>Website</span>
                <OpensInANewTabLink href={business.website} className={"inline-link business-card-value"}>
                    {shortWebsite}
                </OpensInANewTabLink>
            </div>

            <div className={"bussines-card-row"}>
                <span className={"business-card-label"}>Phone</span>
                <a href={`tel:${business.phone}`} className={"inline-link business-card-value"}>
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
