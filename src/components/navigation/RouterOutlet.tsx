import React from "react";
import { Route, Routes } from "react-router-dom";
import Categories from "../../pages/categories/Categories";

export const RouterOutlet = () => {
    return (
        <div data-testid={"router-outlet"}>
            <Routes>
                <Route path="/" element={<Categories/>}/>
                <Route path="/businesses" element={<span>This is the businesses page</span>}/>
            </Routes>
        </div>
    );
};