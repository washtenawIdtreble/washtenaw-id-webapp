import { MenuIcon } from "./MenuIcon";
import { render, screen } from "@testing-library/react";
import React from "react";

describe(MenuIcon.name, () => {
    beforeEach(() => {
        render(<MenuIcon/>);
    });
    test("is hidden from screen readers", () => {
        expect(screen.queryByRole("img")).toBeNull();
    });
    test("has alt text", () => {
        const icon: HTMLImageElement = screen.getByRole("img", { hidden: true });
        expect(icon.alt).toEqual("Menu icon");
    });
});