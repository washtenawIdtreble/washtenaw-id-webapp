import React from "react";
import useCategories from "../../hooks/useCategories";
import "../../utilities/to-title-case";
import { toTitleCase } from "../../utilities/to-title-case";
import "./Categories.css";

export default function Categories() {
    const categories = useCategories();

    return (
        <ul className={"categories-list"} data-testid="categories-page">
            {categories.map(category =>
                <li
                    className={"category-item"}
                    key={category}>
                    {toTitleCase(category)}
                </li>)}
        </ul>
    );
}