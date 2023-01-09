import React from "react";
import { Business } from "../../hooks/useBusinesses";

type BusinessCardProps = {
    business: Business;
}

export const BusinessCard = ({ business }: BusinessCardProps) => {
    const businessAddress = `${business.address}, ${business.city}, ${business.state} ${business.zip}`;
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(businessAddress)}`;
    return (
        <div className={"business-card"}>
            <table>
                <caption>{business.name}</caption>
                <tbody>
                <tr>
                    <th scope={"row"}>Address</th>
                    <td>
                        <a href={mapsUrl} target={"_blank"} rel="noreferrer">
                            {businessAddress}
                        </a>
                    </td>
                </tr>

                <tr>
                    <th scope={"row"}>Website</th>
                    <td>
                        <a href={business.website} target={"_blank"} rel="noreferrer">
                            {business.website}
                        </a>
                    </td>
                </tr>

                <tr>
                    <th scope={"row"}>Phone</th>
                    <td>
                        <a href={`tel:${business.phone}`}>
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