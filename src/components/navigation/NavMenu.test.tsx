import { NavMenu } from "./NavMenu";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe(NavMenu.name, () => {

    let menuButton: HTMLButtonElement;
    let menu: HTMLDivElement;
    beforeEach(() => {
        render(
            <main>
                <MemoryRouter>
                    <Routes>
                        <Route path="/" element={<NavMenu/>}/>
                    </Routes>
                </MemoryRouter>
            </main>,
        );
        menuButton = screen.getByRole("button", { name: "Menu" });
        menu = screen.getByLabelText("Navigation Menu");
    });

    test("should start with the menu hidden", () => {
        expect(menu).not.toBeVisible();
    });

    describe("with mouse navigation", () => {
        describe("when the menu is opened", () => {
            let menuItems: HTMLAnchorElement[];
            beforeEach(() => {
                userEvent.click(menuButton);
                menuItems = within(menu).getAllByRole("link");
            });
            test("should display the menu", async () => {
                expect(menu).toBeVisible();
            });
            test("should have menu items", () => {
                expect(menuItems[0]).toHaveTextContent("All Businesses");
                expect(menuItems[0].href).toContain("/businesses");
                expect(menuItems[1]).toHaveTextContent("Business Categories");
                expect(menuItems[1].href.endsWith("/")).toBe(true);
            });
            test("should prevent scrolling", () => {
                expect(screen.getByRole("main").style.overflowY).toEqual("hidden");
            });
            describe("and the menu is closed again", () => {
                beforeEach(() => {
                    userEvent.click(menuButton);
                });
                test("should allow scrolling", () => {
                    expect(screen.getByRole("main").style.overflowY).toEqual("scroll");
                });
            });
        });
    });

    test("should be keyboard navigable", () => {
        userEvent.tab();
        expect(menuButton).toHaveFocus();

        userEvent.keyboard(" ");
        expect(menu).toBeVisible();

        const menuItems: HTMLAnchorElement[] = within(menu).getAllByRole("link");

        userEvent.tab();
        expect(menuItems[0]).toHaveTextContent("All Businesses");
        expect(menuItems[0].href).toContain("/businesses");

        userEvent.tab();
        expect(menuItems[1]).toHaveFocus();
        expect(menuItems[1]).toHaveTextContent("Business Categories");
        expect(menuItems[1].href.endsWith("/")).toBe(true);

        userEvent.tab({ shift: true });
        userEvent.tab({ shift: true });
        expect(menuButton).toHaveFocus();

        userEvent.keyboard(" ");
        expect(menu).not.toBeVisible();
    });
});
