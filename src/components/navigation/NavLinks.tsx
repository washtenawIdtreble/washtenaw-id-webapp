import React from "react";
import { AppLink } from "./AppLink";

export const LINK_TEXT = {
    aboutTheId: "About the ID",
    welcomePage: "Home",
    annArborLaw: "Ann Arbor Law",
    businesses: "All Businesses",
    categories: "Business Categories",
    contactUs: "Contact Us",
    accessibilityIssues: "Accessibility Issues",
    reportIdRefused: "My ID was Refused",
};

export const NavLinks = () => {
    return (<ul className={"nav-list"}>
        <li className={"nav-list-item"}>
            <AppLink className={"nav-link"} to={"/labels"}>
                Labels
            </AppLink>
        </li>
        <li className={"nav-list-item"}>
            <AppLink className={"nav-link"} to={"/table"}>
                Table
            </AppLink>
        </li>
        <li className={"nav-list-item"}>
            <AppLink className={"nav-link"} to={"/focus"}>
                Focus
            </AppLink>
        </li>
    </ul>);
};
