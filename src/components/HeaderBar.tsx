import React from "react";
import { NavMenu } from "./navigation/NavMenu";
import "./HeaderBar.css";

export const HeaderBar = () => {
    return (
        <div data-testid={"header-bar"} className={"header-bar"}>
            <nav>
                <NavMenu/>
            </nav>
        </div>
    );
};