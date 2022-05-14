import React, { useEffect } from "react";
import { Disclosure, DisclosureContent, useDisclosureState } from "reakit";
import { ChildrenProps } from "../../utilities/children-props";
import { MenuIcon } from "./MenuIcon";

export const NAV_MENU_CONTAINER_ID = "nav-menu";
export const NAV_MENU_ID = "id-navigation-menu";
export const NAV_MENU_BUTTON_ID = "id-navigation-menu-button";

enum Direction {
    up = -1,
    down = 1,
}

enum Keyboard {
    arrowUp = "ArrowUp",
    arrowDown = "ArrowDown",
    escape = "Escape",
    tab = "Tab",
}

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

    const menuOnKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        const menu = document.getElementById(NAV_MENU_CONTAINER_ID);
        const links = Array.from(menu!.querySelectorAll("a"));
        const lastLink = links[links.length - 1];
        const firstLink = links[0];
        const menuButton = document.getElementById(NAV_MENU_BUTTON_ID);
        const focusedElement = document.activeElement;

        function shiftFocus(direction: Direction) {
            const focusedIndex = links.findIndex(link => document.activeElement === link);
            links[focusedIndex + direction].focus();
        }

        if (event.key === Keyboard.escape) {
            menuButton?.focus();
            disclosure.hide();
        } else if (disclosure.visible && links && links.length) {
            if ((event.key === Keyboard.tab && event.shiftKey) || event.key === Keyboard.arrowUp) {
                event.preventDefault();
                if (focusedElement === menuButton) {
                    lastLink.focus();
                } else {
                    if (document.activeElement === firstLink) {
                        menuButton?.focus();
                    } else {
                        shiftFocus(Direction.up);
                    }
                }
            } else if (event.key === Keyboard.tab || event.key === Keyboard.arrowDown) {
                event.preventDefault();
                if (document.activeElement === lastLink) {
                    menuButton?.focus();
                } else {
                    shiftFocus(Direction.down);
                }
            }
        }
    };

    return (
        <div className={"nav-menu-container"} id={NAV_MENU_CONTAINER_ID}
             data-testid={"nav-menu"} onKeyDown={menuOnKeyDown}>
            <Disclosure {...disclosure}
                        tabIndex={0}
                        id={NAV_MENU_BUTTON_ID}
                        className={"menu-button"}
                        aria-controls={NAV_MENU_ID}>
                <MenuIcon/>Menu
            </Disclosure>
            <DisclosureContent {...disclosure}
                               className={"menu"}
                               aria-label="Navigation Menu"
                               id={NAV_MENU_ID}>
                {children}
            </DisclosureContent>
        </div>
    );
};