import React from "react";
import useCategories from "./hooks/useCategories";

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