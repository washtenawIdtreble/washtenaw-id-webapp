import React from "react";
import { Business } from "../../hooks/useBusinesses";

type BusinessCardProps = {
    business: Business;
}

export const BusinessCard = ({ business }: BusinessCardProps) => {
    const businessAddress = `${business.address}, ${business.city}, ${business.state} ${business.zip}`;
    return (<table>
        <caption>{business.name}</caption>
        <tbody>
        <tr>
            <th scope={"row"}>Address</th>
            <td>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(businessAddress)}`}>
                    {businessAddress}
                </a>
            </td>
        </tr>

        <tr>
            <th scope={"row"}>Website</th>
            <td>
                <a href={business.website}>
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
    </table>);
};