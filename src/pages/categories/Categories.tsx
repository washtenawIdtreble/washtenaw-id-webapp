import React from "react";
import useCategories from "../../hooks/useCategories";
import "./Categories.css";

export default function Categories() {
    const categories = useCategories();

    return (
        <main data-testid="categories-page">
            <ul>
                {categories.map(category => <li key={category}>{category}</li>)}
            </ul>
        </main>
    );
}