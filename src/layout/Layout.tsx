import React from "react";
import { RouterOutlet } from "./RouterOutlet";
import { HeaderBar } from "../components/HeaderBar";
import "./Layout.css";

export const Layout = () => {
    return (
        <div className={"layout"} data-testid={"app-layout"}>
            <header>
                <HeaderBar />
            </header>
            <main id={"main-content"} className={"main-content"}>
                <RouterOutlet />
            </main>
        </div>
    );
};
