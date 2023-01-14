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
            <table>
                <caption>{business.name}</caption>
                <tbody>
                <tr>
                    <th scope={"row"}>Address</th>
                    <td>
                        <a href={mapsUrl} className={"business-card-link"} target={"_blank"} rel="noreferrer">
                            {businessAddress}
                        </a>
                    </td>
                </tr>

                <tr>
                    <th scope={"row"}>Website</th>
                    <td>
                        <a href={business.website} className={"business-card-link"} target={"_blank"} rel="noreferrer">
                            {shortWebsite}
                        </a>
                    </td>
                </tr>

                <tr>
                    <th scope={"row"}>Phone</th>
                    <td>
                        <a href={`tel:${business.phone}`} className={"business-card-link"}>
                            {business.phone}
                        </a>
                    </td>
                </tr>

                <tr>
                    <th scope={"row"}>About</th>
                    <td>
                        {business.description}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};