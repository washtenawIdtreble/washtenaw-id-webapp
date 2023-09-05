import React, { useCallback, useEffect, useState } from "react";
import { NAV_MENU_BUTTON_ID, NavMenu } from "./NavMenu";
import { NavLinks } from "./NavLinks";
import "./Navigation.css";

export const WINDOW_RESIZE_EVENT = "resize";
export const SMALL_SCREEN_MEDIA_QUERY = "(max-width: 960px)";

export const Navigation = () => {
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.matchMedia(SMALL_SCREEN_MEDIA_QUERY).matches);
    const [shouldFocusMenuButton, setShouldFocusMenuButton] = useState<boolean>(false);
    const [shouldFocusLinkAtIndex, setShouldFocusLinkAtIndex] = useState<number>(-1);

    const getLinks = useCallback(() => {
        const navElement = document.querySelector("nav")!;
        return Array.from(navElement.querySelectorAll("a"));
    }, []);

    useEffect(() => {
        if (shouldFocusMenuButton) {
            document.getElementById(NAV_MENU_BUTTON_ID)?.focus();
        }
    }, [shouldFocusMenuButton]);

    useEffect(() => {
        if (shouldFocusLinkAtIndex !== -1) {
            const links = getLinks();
            links[shouldFocusLinkAtIndex].focus();
        }
    }, [shouldFocusLinkAtIndex, getLinks]);

    const windowResizeListener = useCallback(() => {
        const willBeSmallScreen = window.matchMedia(SMALL_SCREEN_MEDIA_QUERY).matches;
        const smallScreenChanged = willBeSmallScreen !== isSmallScreen;

        let enqueueMenuFocus = false;
        let linkIndexToFocus = -1;

        if (smallScreenChanged) {
            const links = getLinks();

            if (links && links.length) {
                const focusedLinkIndex = links.findIndex(link => link === document.activeElement);

                if (willBeSmallScreen) {
                    if (focusedLinkIndex !== -1) {
                        enqueueMenuFocus = true;
                    }
                } else {
                    if (focusedLinkIndex !== -1) {
                        linkIndexToFocus = focusedLinkIndex;
                    } else {
                        const navMenu = document.getElementById(NAV_MENU_BUTTON_ID)!;
                        if (navMenu === document.activeElement) {
                            linkIndexToFocus = 0;
                        }
                    }
                }
            }
        }

        setIsSmallScreen(willBeSmallScreen);
        setShouldFocusMenuButton(enqueueMenuFocus);
        setShouldFocusLinkAtIndex(linkIndexToFocus);
    }, [isSmallScreen, getLinks]);

    useEffect(() => {
        window.addEventListener(WINDOW_RESIZE_EVENT, windowResizeListener);
        return () => {
            window.removeEventListener(WINDOW_RESIZE_EVENT, windowResizeListener);
        };
    }, [windowResizeListener]);

    return (
        <nav>
            {isSmallScreen &&
                <NavMenu>
                    <NavLinks/>
                </NavMenu>
            }
            {!isSmallScreen &&
                <NavLinks/>
            }
        </nav>
    );
};
