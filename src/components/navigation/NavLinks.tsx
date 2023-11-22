import React from "react";
import { AppLink } from "./AppLink";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";
import { OpensInANewTabLink } from "../OpensInNewTab/OpensInANewTabLink";

export const LINK_TEXT = {
    aboutTheId: "About the ID",
    welcomePage: "Home",
    businesses: "All Businesses",
    categories: "Business Categories",
    contactUs: "Contact Us",
    accessibilityIssues: "Accessibility Issues",
    reportIdRefused: "My ID was Refused",
};

export const NavLinks = () => {
    return (<ul className={"nav-list"}>
        <li className={"nav-list-item"}>
            <OpensInANewTabLink className={"nav-link"} href={"https://washtenawid.com/"} color={"#ffffff"}>
                {LINK_TEXT.aboutTheId}
            </OpensInANewTabLink>
        </li>
        <li className={"nav-list-item"}>
            <AppLink className={"nav-link"} to={PAGE_ENDPOINTS.welcomePage}>
                {LINK_TEXT.welcomePage}
            </AppLink>
        </li>
        <li className={"nav-list-item"}>
            <AppLink to={PAGE_ENDPOINTS.reportIdRefused} className={"nav-link light-focus-outline"}>
                {LINK_TEXT.reportIdRefused}
            </AppLink>
        </li>
        <li className={"nav-list-item"}>
            <AppLink to={PAGE_ENDPOINTS.contactUs} className={"nav-link light-focus-outline"} aria-label={"contact us"}>
                {LINK_TEXT.contactUs}
            </AppLink>
        </li>
        <li className={"nav-list-item"}>
            <AppLink to={PAGE_ENDPOINTS.accessibilityIssues} className={"nav-link light-focus-outline"}>
                {LINK_TEXT.accessibilityIssues}
            </AppLink>
        </li>
    </ul>);
};
