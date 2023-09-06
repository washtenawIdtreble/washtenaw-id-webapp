import React, { useCallback, useEffect, useState } from "react";
import { ChildrenProps } from "../../utilities/children-props";
import { MenuIcon } from "./MenuIcon";
import { useLocation } from "react-router-dom";

export const NAV_MENU_CONTAINER_ID = "nav-menu";
export const NAV_MENU_ID = "id-navigation-menu";
export const NAV_MENU_BUTTON_ID = "id-navigation-menu-button";

type Direction = 1 | -1;

const UP: Direction = -1;
const DOWN: Direction = 1;

const Keyboard = {
    UP: "ArrowUp",
    RIGHT: "ArrowRight",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    ESCAPE: "Escape",
    TAB: "Tab",
};

export const NavMenu = ({ children }: ChildrenProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const location = useLocation();

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(currentValue => !currentValue);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const globalEscapeKeyHandler = useCallback((event: KeyboardEvent) => {
        if (isMenuOpen && event.key === Keyboard.ESCAPE) {
            setIsMenuOpen(false);
        }
    }, [isMenuOpen]);

    useEffect(() => {
        document.body.addEventListener("keydown", globalEscapeKeyHandler);
        return () => {
            document.body.removeEventListener("keydown", globalEscapeKeyHandler);
        }
    }, [globalEscapeKeyHandler])

    const menuOnKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
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

        if (isMenuOpen) {
            if (event.key === Keyboard.ESCAPE) {
                menuButton?.focus();
                setIsMenuOpen(false);
            } else if (links && links.length) {
                if ([Keyboard.UP, Keyboard.LEFT].includes(event.key)) {
                    event.preventDefault();
                    if (focusedElement === menuButton) {
                        lastLink.focus();
                    } else {
                        if (document.activeElement === firstLink) {
                            menuButton?.focus();
                        } else {
                            shiftFocus(UP);
                        }
                    }
                } else if ([Keyboard.DOWN, Keyboard.RIGHT].includes(event.key)) {
                    event.preventDefault();
                    if (document.activeElement === lastLink) {
                        menuButton?.focus();
                    } else {
                        shiftFocus(DOWN);
                    }
                }
            }
        }
    }, [isMenuOpen]);

    return (
        <div onKeyDown={menuOnKeyDown}
             className={"nav-menu-container"}
             id={NAV_MENU_CONTAINER_ID}
             data-testid={"nav-menu"}>
            <button onClick={toggleMenu}
                    id={NAV_MENU_BUTTON_ID}
                    className={"menu-button"}
                    aria-controls={NAV_MENU_ID}
                    aria-expanded={isMenuOpen}>
                <MenuIcon/>Menu
            </button>
            <div className={"menu-disclosure"}
                 id={NAV_MENU_ID}
                 style={{
                     display: isMenuOpen ? "" : "none"
                 }}>
                {children}
            </div>
        </div>
    );
};
