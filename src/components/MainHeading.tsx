import { ChildrenProps } from "../utilities/children-props";
import React from "react";
import "./MainHeading.css";

type MainHeadingProps = {
    id?: string;
    ariaLabel?: string;
}

export const MainHeading = ({ id, ariaLabel, children }: MainHeadingProps & ChildrenProps) => {
    return (
        <div className={"main-heading-container"}>
            <h1 id={id} aria-label={ariaLabel} tabIndex={-1}>{children}</h1>
        </div>
    );
};