import React, { useEffect } from "react";
import { Disclosure, DisclosureContent, useDisclosureState } from "reakit";
import { ChildrenProps } from "../../utilities/children-props";

export const NavMenu = ({ children }: ChildrenProps) => {
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
        <div className={"nav-menu-container"} data-testid={"nav-menu"}>
            <Disclosure {...disclosure}
                        tabIndex={0}
                        className={"menu-button"}
                        aria-controls={"id-navigation-menu"}>
                Menu
            </Disclosure>
            <DisclosureContent {...disclosure}
                               className={"menu"}
                               aria-label="Navigation Menu"
                               id={"id-navigation-menu"}>
                {children}
            </DisclosureContent>
        </div>
    );
};