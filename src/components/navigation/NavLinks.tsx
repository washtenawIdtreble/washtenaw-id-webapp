import React from "react";
import { AppLink } from "./AppLink";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";
import { OpensInANewTabLink } from "../OpensInNewTab/OpensInANewTabLink";

export const LINK_TEXT = {
    aboutTheId: "About the ID",
    annArborOrdinance: "Washtenaw ID in Ann Arbor",
    businesses: "All Businesses",
    categories: "Business Categories",
    contactUs: "Contact Us",
    accessibilityIssues: "Accessibility Issues",
};

export const NavLinks = () => {
    return (<ul className={"nav-list"}>
        <li className={"nav-list-item"}>
            <OpensInANewTabLink className={"nav-link"} href={"https://washtenawid.com/"} color={"#ffffff"}>
                {LINK_TEXT.aboutTheId}
            </OpensInANewTabLink>
        </li>
        <li className={"nav-list-item"}>
            <OpensInANewTabLink className={"nav-link"}
                                href={"https://library.municode.com/mi/ann_arbor/codes/code_of_ordinances?nodeId=TITIXPORE_CH112NSC_9_150IN"}
                                color={"#ffffff"}>
                {LINK_TEXT.annArborOrdinance}
            </OpensInANewTabLink>
        </li>
        <li className={"nav-list-item"}>
            <AppLink to={PAGE_ENDPOINTS.businesses} className={"nav-link light-focus-outline"}>
                {LINK_TEXT.businesses}
            </AppLink>
        </li>
        <li className={"nav-list-item"}>
            <AppLink to={PAGE_ENDPOINTS.categories} className={"nav-link light-focus-outline"}>
                {LINK_TEXT.categories}
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
