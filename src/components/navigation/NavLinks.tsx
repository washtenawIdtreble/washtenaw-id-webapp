import React from "react";
import { RefreshingLink } from "./RefreshingLink";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";

export const NavLinks = () => {
    return (<ul className={"nav-list"}>
        <li className={"nav-list-item"}>
            <RefreshingLink to={PAGE_ENDPOINTS.businesses} className={"nav-link"}>All Businesses</RefreshingLink>
        </li>
        <li className={"nav-list-item"}>
            <RefreshingLink to={PAGE_ENDPOINTS.categories} className={"nav-link"}>Business Categories</RefreshingLink>
        </li>
        <li className={"nav-list-item"}>
            <RefreshingLink to={PAGE_ENDPOINTS.contactUs} className={"nav-link"}>Contact Us</RefreshingLink>
        </li>
        <li className={"nav-list-item"}>
            <RefreshingLink to={PAGE_ENDPOINTS.accessibilityIssues} className={"nav-link"}>Accessibility
                Issues</RefreshingLink>
        </li>
    </ul>);
};