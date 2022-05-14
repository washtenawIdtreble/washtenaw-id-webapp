import React from "react";
import { Route, Routes } from "react-router-dom";
import Categories from "../pages/categories/Categories";

export const PAGE_ENDPOINTS = {
    categories: "/",
    businesses: "/businesses",
};

export const RouterOutlet = () => {
    return (
        <div data-testid={"router-outlet"}>
            <Routes>
                <Route path={PAGE_ENDPOINTS.categories} element={<Categories/>}/>
                <Route path={PAGE_ENDPOINTS.businesses} element={<span>This is the businesses page</span>}/>
            </Routes>
        </div>
    );
};