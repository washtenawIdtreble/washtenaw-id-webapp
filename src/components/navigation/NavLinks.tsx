import React from "react";
import { RefreshingLink } from "./RefreshingLink";

export const NavLinks = () => {
    return (<ul className={"nav-list"}>
        <li className={"nav-list-item"}>
            <RefreshingLink to={"/businesses"} className={"nav-link"}>All Businesses</RefreshingLink>
        </li>
        <li className={"nav-list-item"}>
            <RefreshingLink to={"/"} className={"nav-link"}>Business Categories</RefreshingLink>
        </li>
    </ul>);
};