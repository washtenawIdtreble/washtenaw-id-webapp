import React, { useEffect } from "react";
import { Disclosure, DisclosureContent, useDisclosureState } from "reakit";
import { RefreshingLink } from "./RefreshingLink";

export const NavMenu = () => {
    const disclosure = useDisclosureState({ visible: false });

    useEffect(() => {
        const mainLandmark = document.querySelector("main");
        if (disclosure.visible) {
            mainLandmark!.style.overflowY = "hidden";
        } else {
            mainLandmark!.style.overflowY = "scroll";
        }
    }, [disclosure.visible]);

    return (
        <div className={"nav-container"} data-testid={"nav-menu"}>
            <Disclosure tabIndex={0} className={"menu-button"} {...disclosure}>Menu</Disclosure>
            <DisclosureContent {...disclosure} className={"menu"} aria-label="Navigation Menu">
                <RefreshingLink tabIndex={0} to={"/businesses"} className={"nav-link"}>All Businesses</RefreshingLink>
                <RefreshingLink to={"/"} className={"nav-link"}>Business Categories</RefreshingLink>
            </DisclosureContent>
        </div>
    );
};