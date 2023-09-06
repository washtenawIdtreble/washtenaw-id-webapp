import { NavMenu } from "./NavMenu";
import { render, screen, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { NavLinks } from "./NavLinks";
import { KEYS } from "../../../test/user-event-keys";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

describe(NavMenu.name, () => {
    let menuButton: HTMLButtonElement;
    let linkList: HTMLUListElement | null;
    let user: UserEvent;
    beforeEach(() => {
        user = userEvent.setup();
        render(
            <main>
                <MemoryRouter>
                    <NavMenu>
                        <NavLinks/>
                    </NavMenu>
                    <div tabIndex={-1}>focus me</div>
                </MemoryRouter>
            </main>,
        );
        menuButton = screen.getByRole("button", { name: "Menu" });
        linkList = screen.queryByRole("list");
    });

    test("should start with the menu hidden", () => {
        expect(linkList).toBeNull();
    });

    describe("with mouse navigation", () => {
        describe("when the menu is opened", () => {
            let links: HTMLAnchorElement[];
            beforeEach(async () => {
                await user.click(menuButton);
                linkList = screen.getByRole("list") as HTMLUListElement;
                links = within(linkList).getAllByRole("link");
            });
            test("should display the list of links", async () => {
                expect(linkList).toBeVisible();
            });
            test("should show child links", () => {
                expect(links.length).toBeGreaterThan(0);
            });
            describe("and the menu button is clicked again", () => {
                beforeEach(async () => {
                    await user.click(menuButton);
                });
                test("should close the menu", () => {
                    expect(linkList).not.toBeVisible();
                });
            });
        });
    });

    describe("with keyboard navigation", () => {
        beforeEach(async () => {
            await user.tab();
        });
        test("can focus the menu button", async () => {
            expect(menuButton).toHaveFocus();
        });
        test("can shift focus past the menu button", async () => {
            await user.tab();
            expect(document.body).toHaveFocus();
        });
        test("can shift focus before the menu button", async () => {
            await user.tab({ shift: true });
            expect(document.body).toHaveFocus();
        });
        test("can open and close the menu with the space bar", async () => {
            await user.keyboard(KEYS.spaceBar);
            expect(screen.getByRole("list")).toBeVisible();

            await user.keyboard(KEYS.spaceBar);
            expect(screen.queryByRole("list")).toBeNull();
        });
        test("can open and close the menu with the enter key", async () => {
            await user.keyboard(KEYS.enter);
            expect(screen.getByRole("list")).toBeVisible();

            await user.keyboard(KEYS.enter);
            expect(screen.queryByRole("list")).toBeNull();
        });
        describe("when the menu is open", () => {
            let links: HTMLAnchorElement[];
            beforeEach(async () => {
                await user.keyboard(KEYS.spaceBar);
                linkList = screen.getByRole("list") as HTMLUListElement;
                links = within(linkList).getAllByRole("link");
            });
            test("should show child links", () => {
                expect(links.length).toBeGreaterThan(0);
            });
            test("can close the menu with the Escape key", async () => {
                await user.keyboard(KEYS.escape);
                expect(linkList).not.toBeVisible();
                expect(menuButton).toHaveFocus();
            });
            test("can close the menu with the Escape key when focus is outside the menu", async () => {
                const elementOutsideMenu = screen.getByText("focus me");
                elementOutsideMenu.focus();

                await user.keyboard(KEYS.escape);
                
                expect(linkList).not.toBeVisible();
                expect(elementOutsideMenu).toHaveFocus();
            });
            test("can navigate links with the tab key NO KEYBOARD TRAP", async () => {
                await user.tab();

                for (const link of links) {
                    expect(link).toHaveFocus();
                    await user.tab();
                }

                expect(document.body).toHaveFocus();
            });
            test("can navigate links with the tab key in reverse NO KEYBOARD TRAP", async () => {
                const reverseLinks = [...links].reverse();
                reverseLinks[0].focus();

                for (const link of reverseLinks.slice(1)) {
                    await user.tab({ shift: true });
                    expect(link).toHaveFocus();
                }

                await user.tab({ shift: true });
                expect(menuButton).toHaveFocus();

                await user.tab({ shift: true });
                expect(document.body).toHaveFocus();
            });
            const downCases = [
                KEYS.arrows.down,
                KEYS.arrows.right,
            ];
            downCases.forEach(key => {
                test(`can navigate links down with the arrow keys - ${key}`, async () => {
                    await user.keyboard(key);

                    for (const link of links) {
                        expect(link).toHaveFocus();
                        await user.keyboard(key);
                    }

                    expect(menuButton).toHaveFocus();
                });
            });
            const upCases = [
                KEYS.arrows.up,
                KEYS.arrows.left,
            ];
            upCases.forEach(key => {
                test(`can navigate links up with the arrow keys - ${key}`, async () => {
                    await user.keyboard(key);

                    for (const link of [...links].reverse()) {
                        expect(link).toHaveFocus();
                        await user.keyboard(key);
                    }

                    expect(menuButton).toHaveFocus();
                });
            });
            describe("and a link is focused", () => {
                beforeEach(async () => {
                    await user.tab();
                });
                test("can close the menu with the Escape key", async () => {
                    await user.keyboard(KEYS.escape);
                    expect(linkList).not.toBeVisible();
                    expect(menuButton).toHaveFocus();
                });
            });
        });
    });
});
