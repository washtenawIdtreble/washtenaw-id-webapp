import React from "react";
import { RouterOutlet } from "../components/navigation/RouterOutlet";
import { HeaderBar } from "../components/HeaderBar";
import "./Layout.css";

export const Layout = () => {
    return (
        <div className={"layout"} data-testid={"app-layout"}>
            <header>
                <HeaderBar/>
            </header>
            <main className={"main-content"}>
                <RouterOutlet/>
            </main>
        </div>
    );
};