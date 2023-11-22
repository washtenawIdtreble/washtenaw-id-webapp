import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ACCESSIBILITY_PAGE_HEADING, AccessibilityIssues } from "../pages/accessibility-issues/AccessibilityIssues";
import { CONTACT_PAGE_HEADING, ContactUs } from "../pages/contact-us/ContactUs";
import { Page } from "../pages/Page";
import { WELCOME_PAGE_HEADING, WelcomePage } from "../pages/welcome/WelcomePage";
import { ID_REFUSED_PAGE_HEADING, ReportIdRefused } from "../pages/report-id-refusal/ReportIdRefused";

export const PAGE_ENDPOINTS = {
    home: "/",
    welcomePage: "/",
    categories: "/categories",
    businesses: "/businesses",
    accessibilityIssues: "/accessibility-issues",
    contactUs: "/contact-us",
    reportIdRefused: "/id-refused"
};

export const RouterOutlet = () => {
    return (
        <div className={"router-outlet"} data-testid={"router-outlet"}>
            <Routes>
                <Route path={PAGE_ENDPOINTS.welcomePage}
                       element={<Page title={WELCOME_PAGE_HEADING}
                                      key={WELCOME_PAGE_HEADING}><WelcomePage/></Page>}/>

                <Route path={PAGE_ENDPOINTS.reportIdRefused}
                       element={<Page title={ID_REFUSED_PAGE_HEADING}
                                      key={ID_REFUSED_PAGE_HEADING}><ReportIdRefused/></Page>}/>

                <Route path={PAGE_ENDPOINTS.contactUs}
                       element={<Page title={CONTACT_PAGE_HEADING} key={CONTACT_PAGE_HEADING}><ContactUs/></Page>}/>

                <Route path={PAGE_ENDPOINTS.accessibilityIssues}
                       element={<Page title={ACCESSIBILITY_PAGE_HEADING}
                                      key={ACCESSIBILITY_PAGE_HEADING}><AccessibilityIssues/></Page>}/>

                <Route path={"*"} element={<Navigate to={PAGE_ENDPOINTS.home}/>}/>
            </Routes>
        </div>
    );
};
