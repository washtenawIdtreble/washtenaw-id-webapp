import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Page } from "../pages/Page";
import { LabelIssues } from "../pages/accessibility-presentation/LabelIssues";
import { WELCOME_PAGE_HEADING, WelcomePage } from "../pages/welcome/WelcomePage";
import { ModalIssues } from "../pages/accessibility-presentation/ModalIssues";
import { TableIssues } from "../pages/accessibility-presentation/TableIssues";

export const PAGE_ENDPOINTS = {
    home: "/",
    welcomePage: "/",
    annArborLaw: "/ann-arbor-law",
    categories: "/categories",
    businesses: "/businesses",
    accessibilityIssues: "/accessibility-issues",
    contactUs: "/contact-us",
    reportIdRefused: "/id-refused",
};

export const RouterOutlet = () => {
    return (
        <div className={"router-outlet"} data-testid={"router-outlet"}>
            <Routes>
                <Route path={PAGE_ENDPOINTS.welcomePage}
                       element={<Page title={WELCOME_PAGE_HEADING}
                                      key={WELCOME_PAGE_HEADING}><WelcomePage /></Page>} />

                <Route path={"/labels"}
                       element={<Page title={"Doubled Labels"}
                                      key={"Doubled Labels"}><LabelIssues /></Page>} />

                <Route path={"/table"}
                       element={<Page title={"Table Issues"}
                                      key={"Table Issues"}><TableIssues /></Page>} />

                <Route path={"/focus"}
                       element={<Page title={"Focus Trap Issues"}
                                      key={"Focus Trap Issues"}><ModalIssues /></Page>} />

                <Route path={"*"} element={<Navigate to={PAGE_ENDPOINTS.home} />} />
            </Routes>
        </div>
    );
};
