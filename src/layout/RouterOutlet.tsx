import React from "react";
import { Route, Routes } from "react-router-dom";
import { Categories } from "../pages/categories/Categories";
import { Businesses } from "../pages/businesses/Businesses";
import { AccessibilityIssues } from "../pages/accessibility-issues/AccessibilityIssues";

export const PAGE_ENDPOINTS = {
    categories: "/",
    businesses: "/businesses",
    accessibilityIssues: "accessibility-issues",
};

export const RouterOutlet = () => {
    return (
        <div className={"router-outlet"} data-testid={"router-outlet"}>
            <Routes>
                <Route path={PAGE_ENDPOINTS.categories} element={<Categories/>}/>
                <Route path={PAGE_ENDPOINTS.businesses} element={<Businesses/>}/>
                <Route path={PAGE_ENDPOINTS.accessibilityIssues} element={<AccessibilityIssues/>}/>
            </Routes>
        </div>
    );
};