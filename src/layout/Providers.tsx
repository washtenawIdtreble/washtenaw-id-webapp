import React from "react";
import { ChildrenProps } from "../utilities/children-props";
import { AlertProvider } from "../contexts/AlertContext";

export const Providers = ({ children }: ChildrenProps) => {
    return (
        <AlertProvider>
            {children}
        </AlertProvider>
    );
};