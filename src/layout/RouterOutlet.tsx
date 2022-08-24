import React from "react";
import { Route, Routes } from "react-router-dom";
import Categories from "../pages/categories/Categories";
import { AccessibilityIssues } from "../pages/accessibility-issues/AccessibilityIssues";

export const PAGE_ENDPOINTS = {
    categories: "/",
    businesses: "/businesses",
    accessibilityIssues: "accessibility-issues",
};

export const RouterOutlet = () => {
    return (
        <div data-testid={"router-outlet"}>
            <Routes>
                <Route path={PAGE_ENDPOINTS.categories} element={<Categories/>}/>
                <Route path={PAGE_ENDPOINTS.businesses} element={<span>This is the businesses page</span>}/>
                <Route path={PAGE_ENDPOINTS.accessibilityIssues} element={<AccessibilityIssues/>}/>
            </Routes>
        </div>
    );
};