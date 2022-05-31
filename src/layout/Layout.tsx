import React from "react";
import { RouterOutlet } from "./RouterOutlet";
import { HeaderBar } from "../components/HeaderBar";
import "./Layout.css";

export const Layout = () => {
    return (
        <div className={"layout"} data-testid={"app-layout"}>
            <a href={"#main-content"} className={"skip-nav"}>Skip to content</a>
            <header>
                <HeaderBar/>
            </header>
            <main id={"main-content"} tabIndex={-1} className={"main-content"}>
                <RouterOutlet/>
            </main>
        </div>
    );
};