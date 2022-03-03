import React from "react";
import useCategories from "../../hooks/useCategories";
import "./Categories.css";
import "../../utilities/to-title-case";
import { toTitleCase } from "../../utilities/to-title-case";

export default function Categories() {
    const categories = useCategories();

    return (
        <ul data-testid="categories-page">
            {categories.map(category => <li key={category}>{toTitleCase(category)}</li>)}
        </ul>
    );
}