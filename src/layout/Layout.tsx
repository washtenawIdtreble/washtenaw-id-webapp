import React from "react";
import { RouterOutlet } from "./RouterOutlet";
import { HeaderBar } from "../components/HeaderBar";
import { MAIN_HEADING_ID } from "../components/MainHeading";
import "./Layout.css";

export const Layout = () => {
    return (
<<<<<<< HEAD
        <div className={"layout"} data-testid={"app-layout"}>
            <a href={`#${MAIN_HEADING_ID}`} className={"skip-nav visually-hidden"}>
=======
        <div className={'layout'} data-testid={'app-layout'}>
            <a href={`#${MAIN_HEADING_ID}`} className={'skip-nav'}>
>>>>>>> 404b252f838da27771771f06a4c5dbbcb4b128ea
                Skip to content
            </a>
            <header>
                <HeaderBar />
            </header>
<<<<<<< HEAD
            <main id={"main-content"} className={"main-content"}>
                <RouterOutlet/>
=======
            <main id={'main-content'} tabIndex={-1} className={'main-content'}>
                <RouterOutlet />
>>>>>>> 404b252f838da27771771f06a4c5dbbcb4b128ea
            </main>
        </div>
    );
};
