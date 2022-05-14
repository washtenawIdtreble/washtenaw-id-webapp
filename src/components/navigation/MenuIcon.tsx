import React from "react";
import icon from "./menu-icon.svg";

export const MenuIcon = () => {
    return (
        <img alt={"Menu icon"} aria-hidden={true} className={"menu-icon"} src={icon}/>
    );
};