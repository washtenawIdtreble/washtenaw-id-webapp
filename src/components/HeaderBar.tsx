import React, { useCallback, useEffect, useState } from "react";
import { NavMenu } from "./navigation/NavMenu";
import "./HeaderBar.css";
import { NavLinks } from "./navigation/NavLinks";

export const WINDOW_RESIZE_EVENT = "resize";

export const HeaderBar = () => {
    const [narrowScreen, setNarrowScreen] = useState(window.matchMedia("(max-width: 767px)").matches);

    const resizeListener = useCallback(() => {
        setNarrowScreen(window.matchMedia("(max-width: 767px)").matches);
    }, []);

    useEffect(() => {
        window.addEventListener(WINDOW_RESIZE_EVENT, resizeListener);
        return () => {
            window.removeEventListener(WINDOW_RESIZE_EVENT, resizeListener);
        };
    }, [resizeListener]);

    return (
        <div data-testid={"header-bar"} className={"header-bar"}>
            <nav>
                {narrowScreen &&
                    <NavMenu>
                        <NavLinks/>
                    </NavMenu>
                }
                {!narrowScreen &&
                    <NavLinks/>
                }
            </nav>
        </div>
    );
};