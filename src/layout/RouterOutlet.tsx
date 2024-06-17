import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Page } from "../pages/Page";
import { ReportIdRefused } from "../pages/report-id-refusal/ReportIdRefused";
import { AnnArborLawSummary } from "../pages/ann-arbor-law-summary/AnnArborLawSummary";
import { LabelIssues } from "../pages/accessibility-presentation/LabelIssues";
import { WELCOME_PAGE_HEADING, WelcomePage } from "../pages/welcome/WelcomePage";

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
                                      key={"Table Issues"}><AnnArborLawSummary /></Page>} />

                <Route path={"/focus"}
                       element={<Page title={"Focus Trap Issues"}
                                      key={"Focus Trap Issues"}><ReportIdRefused /></Page>} />

                <Route path={"*"} element={<Navigate to={PAGE_ENDPOINTS.home} />} />
            </Routes>
        </div>
    );
};
