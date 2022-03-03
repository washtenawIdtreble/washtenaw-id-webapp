import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe(App.name, () => {
    beforeEach(() => {
        render(<App/>);
    });
    test("renders categories component", () => {
        const categoriesComponent = screen.getByTestId("categories-page");
        expect(categoriesComponent).toBeInTheDocument();
    });
    test("should provide the alert context", () => {
        const alertProvider = screen.getByTestId("alert-context-provider");
        expect(alertProvider).toBeInTheDocument();
    });
});