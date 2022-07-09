import { NavMenu } from "./NavMenu";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { NavLinks } from "./NavLinks";
import { KEYS } from "../../../test/user-event-keys";

describe(NavMenu.name, () => {

    let menuButton: HTMLButtonElement;
    let linkList: HTMLUListElement | null;
    beforeEach(() => {
        render(
            <main>
                <MemoryRouter>
                    <NavMenu>
                        <NavLinks/>
                    </NavMenu>
                </MemoryRouter>
            </main>,
        );
        menuButton = screen.getByRole("button", { name: "Navigation Menu" });
        linkList = screen.queryByRole("list");
    });

    test("should start with the menu hidden", () => {
        expect(linkList).toBeNull();
    });

    describe("with mouse navigation", () => {
        describe("when the menu is opened", () => {
            let links: HTMLAnchorElement[];
            beforeEach(() => {
                userEvent.click(menuButton);
                linkList = screen.getByRole("list") as HTMLUListElement;
                links = within(linkList).getAllByRole("link");
            });
            test("should display the menu", async () => {
                expect(linkList).toBeVisible();
            });
            test("should show child links", () => {
                expect(links.length).toBeGreaterThan(0);
            });
            test("should prevent scrolling", () => {
                expect(screen.getByRole("main").style.overflowY).toEqual("hidden");
            });
            describe("and the menu button is clicked again", () => {
                beforeEach(() => {
                    userEvent.click(menuButton);
                });
                test("should close the menu", () => {
                    expect(linkList).not.toBeVisible();
                });
                test("should re-enable scrolling", () => {
                    expect(screen.getByRole("main").style.overflowY).toEqual("scroll");
                });
            });
        });
    });

    describe("with keyboard navigation", () => {
        beforeEach(() => {
            userEvent.tab();
        });
        test("can focus the menu button", () => {
            expect(menuButton).toHaveFocus();
        });
        test("can shift focus past the menu button", () => {
            userEvent.tab();
            expect(document.body).toHaveFocus();
        });
        test("can shift focus before the menu button", () => {
            userEvent.tab({ shift: true });
            expect(document.body).toHaveFocus();
        });
        test("can open and close the menu with the space bar", () => {
            userEvent.keyboard(KEYS.spaceBar);
            expect(screen.getByRole("list")).toBeVisible();

            userEvent.keyboard(KEYS.spaceBar);
            expect(screen.queryByRole("list")).toBeNull();
        });
        test("can open and close the menu with the enter key", () => {
            userEvent.keyboard(KEYS.enter);
            expect(screen.getByRole("list")).toBeVisible();

            userEvent.keyboard(KEYS.enter);
            expect(screen.queryByRole("list")).toBeNull();
        });
        describe("when the menu is open", () => {
            let links: HTMLAnchorElement[];
            beforeEach(() => {
                userEvent.keyboard(KEYS.spaceBar);
                linkList = screen.getByRole("list") as HTMLUListElement;
                links = within(linkList).getAllByRole("link");
            });
            test("should show child links", () => {
                expect(links.length).toBeGreaterThan(0);
            });
            test("can close the menu with the Escape key", () => {
                userEvent.keyboard(KEYS.escape);
                expect(linkList).not.toBeVisible();
                expect(menuButton).toHaveFocus();
            });
            test("can navigate links with the tab key", () => {
                userEvent.tab();

                links.forEach(link => {
                    expect(link).toHaveFocus();
                    userEvent.tab();
                });

                expect(menuButton).toHaveFocus();
            });
            test("can navigate links with the tab key in reverse", () => {
                userEvent.tab({ shift: true });

                [...links].reverse().forEach(link => {
                    expect(link).toHaveFocus();
                    userEvent.tab({ shift: true });
                });

                expect(menuButton).toHaveFocus();
            });
            test("can navigate links down with the arrow keys", () => {
                userEvent.keyboard(KEYS.arrows.down);

                links.forEach(link => {
                    expect(link).toHaveFocus();
                    userEvent.keyboard(KEYS.arrows.down);
                });

                expect(menuButton).toHaveFocus();
            });
            test("can navigate links up with the arrow keys", () => {
                userEvent.keyboard(KEYS.arrows.up);

                [...links].reverse().forEach(link => {
                    expect(link).toHaveFocus();
                    userEvent.keyboard(KEYS.arrows.up);
                });

                expect(menuButton).toHaveFocus();
            });
            describe("and a link is focused", () => {
                beforeEach(() => {
                    userEvent.tab();
                });
                test("can close the menu with the Escape key", () => {
                    userEvent.keyboard(KEYS.escape);
                    expect(linkList).not.toBeVisible();
                    expect(menuButton).toHaveFocus();
                });
            });
        });
    });
});
