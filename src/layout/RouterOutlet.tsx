import React from "react";
import { Route, Routes } from "react-router-dom";
import { Categories, CATEGORIES_PAGE_HEADING } from "../pages/categories/Categories";
import { Businesses, BUSINESSES_PAGE_HEADING } from "../pages/businesses/Businesses";
import { ACCESSIBILITY_PAGE_HEADING, AccessibilityIssues } from "../pages/accessibility-issues/AccessibilityIssues";
import { CONTACT_PAGE_HEADING, ContactUs } from "../pages/contact-us/ContactUs";
import { Page } from "../pages/Page";
import { AnnArborOrdinance, ORDINANCE_PAGE_HEADING } from "../pages/ann-arbor-ordinance/AnnArborOrdinance";

export const PAGE_ENDPOINTS = {
    annArborOrdinance: "/",
    categories: "/categories",
    businesses: "/businesses",
    accessibilityIssues: "/accessibility-issues",
    contactUs: "/contact-us",
};

export const RouterOutlet = () => {
    return (
        <div className={"router-outlet"} data-testid={"router-outlet"}>
            <Routes>
                <Route path={PAGE_ENDPOINTS.annArborOrdinance}
                       element={<Page title={ORDINANCE_PAGE_HEADING}
                                      key={ORDINANCE_PAGE_HEADING}><AnnArborOrdinance/></Page>}/>
                <Route path={PAGE_ENDPOINTS.categories}
                       element={<Page title={CATEGORIES_PAGE_HEADING}
                                      key={CATEGORIES_PAGE_HEADING}><Categories/></Page>}/>
                <Route path={PAGE_ENDPOINTS.businesses}
                       element={<Page title={BUSINESSES_PAGE_HEADING}
                                      key={BUSINESSES_PAGE_HEADING}><Businesses/></Page>}/>
                <Route path={PAGE_ENDPOINTS.accessibilityIssues}
                       element={<Page title={ACCESSIBILITY_PAGE_HEADING}
                                      key={ACCESSIBILITY_PAGE_HEADING}><AccessibilityIssues/></Page>}/>
                <Route path={PAGE_ENDPOINTS.contactUs}
                       element={<Page title={CONTACT_PAGE_HEADING} key={CONTACT_PAGE_HEADING}><ContactUs/></Page>}/>
            </Routes>
        </div>
    );
};
