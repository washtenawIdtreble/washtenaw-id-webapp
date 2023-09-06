import React from "react";
import { AppLink } from "./AppLink";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";
import { OpensInANewTabLink } from "../OpensInNewTab/OpensInANewTabLink";

export const NavLinks = () => {
    return (<ul className={"nav-list"}>
        <li className={"nav-list-item"}>
            <OpensInANewTabLink className={"nav-link"} href={"https://washtenawid.com/"} color={"#ffffff"}>
                About the ID
            </OpensInANewTabLink>
        </li>
        <li className={"nav-list-item"}>
            <OpensInANewTabLink className={"nav-link"} href={"https://washtenawid.com/"} color={"#ffffff"}>
                About the ID
            </OpensInANewTabLink>
        </li>
        <li className={"nav-list-item"}>
            <AppLink to={PAGE_ENDPOINTS.businesses} className={"nav-link light-focus-outline"}>All Businesses</AppLink>
        </li>
        <li className={"nav-list-item"}>
            <AppLink to={PAGE_ENDPOINTS.categories} className={"nav-link light-focus-outline"}>Business
                Categories</AppLink>
        </li>
        <li className={"nav-list-item"}>
            <AppLink to={PAGE_ENDPOINTS.contactUs} className={"nav-link light-focus-outline"} aria-label={"contact us"}>Contact
                Us</AppLink>
        </li>
        <li className={"nav-list-item"}>
            <AppLink to={PAGE_ENDPOINTS.accessibilityIssues} className={"nav-link light-focus-outline"}>Accessibility
                Issues</AppLink>
        </li>
    </ul>);
};
