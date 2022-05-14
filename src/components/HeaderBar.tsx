import React from "react";
import "./HeaderBar.css";
import { Navigation } from "./navigation/Navigation";

export const HeaderBar = () => {
    return (
        <div className={"header-bar"} data-testid={"header-bar"}>
            <Navigation/>
        </div>
    );
};