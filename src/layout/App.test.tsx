import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe(App.name, () => {
    test("renders the app layout", () => {
        render(<App/>);
        const layout = screen.getByTestId("app-layout");
        expect(layout).toBeInTheDocument();
    });
});