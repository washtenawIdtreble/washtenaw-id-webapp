import React from "react";
import { RouterOutlet } from "./RouterOutlet";
import { HeaderBar } from "../components/HeaderBar";
import { MAIN_HEADING_ID } from "../components/MainHeading";
import "./Layout.css";

export const Layout = () => {
    return (
        <div className={"layout"} data-testid={"app-layout"}>
            <a href={`#${MAIN_HEADING_ID}`} className={"skip-nav visually-hidden"}>
                Skip to content
            </a>
            <header>
                <HeaderBar/>
            </header>
            <main id={"main-content"} className={"main-content"}>
                <RouterOutlet/>
            </main>
        </div>
    );
};
