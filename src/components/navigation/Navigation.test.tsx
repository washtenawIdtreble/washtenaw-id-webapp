import { Navigation, SMALL_SCREEN_MEDIA_QUERY, WINDOW_RESIZE_EVENT } from "./Navigation";
import { render, screen, waitFor, within } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ChildrenProps } from "../../utilities/children-props";
import { when } from "jest-when";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import mocked = jest.mocked;

describe(Navigation.name, () => {
    let windowResizeListener: EventListener;
    let resizeSubscriptionCount = 0;
    let navElement: HTMLDivElement;
    let user: UserEvent;
    beforeEach(() => {
        user = userEvent.setup();
        jest.spyOn(window, "matchMedia").mockImplementation(jest.fn());

        when(window.matchMedia)
            .calledWith(SMALL_SCREEN_MEDIA_QUERY)
            .mockReturnValue({ matches: true } as MediaQueryList);

        jest.spyOn(window, "addEventListener").mockImplementation(jest.fn());
        when(window.addEventListener)
            .calledWith(WINDOW_RESIZE_EVENT, expect.any(Function))
            .mockImplementation((event: string, callback: any) => {
                windowResizeListener = callback;
                resizeSubscriptionCount += 1;
            });

        jest.spyOn(window, "removeEventListener").mockImplementation(jest.fn());
    });

    test("uses the correct event when listening for window resize", () => {
        expect(WINDOW_RESIZE_EVENT).toEqual("resize");
    });

    test("has the correct small screen media query", () => {
        expect(SMALL_SCREEN_MEDIA_QUERY).toEqual("(max-width: 960px)");
    });

    describe("when the component is mounted", () => {
        let unmount: () => void;
        let rerender: any;
        beforeEach(() => {
            ({ rerender, unmount } = render(<Navigation/>, { wrapper: NavigationBarTestWrapper }));
            rerender(<Navigation/>, { wrapper: NavigationBarTestWrapper });
        });
        test("subscribes to window resize once", () => {
            expect(resizeSubscriptionCount).toEqual(1);
        });
        describe("and then unmounted", () => {
            beforeEach(() => {
                unmount();
            });
            test("unsubscribes from window resize", () => {
                expect(window.removeEventListener).toHaveBeenCalledWith(WINDOW_RESIZE_EVENT, windowResizeListener);
            });
        });
    });

    describe("when the screen is narrow", () => {
        beforeEach(() => {
            render(<Navigation/>, { wrapper: NavigationBarTestWrapper });
            navElement = screen.getByRole("navigation");
        });
        test("shows the nav menu within a nav element", () => {
            const navMenu = within(navElement).getByTestId("nav-menu");
            expect(navMenu).toBeInTheDocument();
        });
        test("shows the nav links within the nav menu", async () => {
            await user.click(within(navElement).getByRole("button", { name: "Menu" }));
            expect(within(navElement).getAllByRole("link").length).toBeGreaterThan(0);
        });
        describe("and becomes wide", () => {
            beforeEach(async () => {
                mocked(window.matchMedia).mockReturnValue({ matches: false } as MediaQueryList);
                await waitFor(() => {
                    windowResizeListener(null as unknown as Event);
                });
            });
            test("DOES NOT show the nav menu", () => {
                expect(within(navElement).queryByTestId("nav-menu")).not.toBeInTheDocument();
            });
            test("shows the nav links", () => {
                expect(within(navElement).getAllByRole("link").length).toBeGreaterThan(0);
            });
        });
        describe("and becomes wide with focus on the menu button", () => {
            beforeEach(async () => {
                const navMenuButton = within(navElement).getByRole("button", { name: "Menu" });
                navMenuButton.focus();
                mocked(window.matchMedia).mockReturnValue({ matches: false } as MediaQueryList);
                await waitFor(() => {
                    windowResizeListener(null as unknown as Event);
                });
            });
            test("should focus the first link", () => {
                const links = within(navElement).getAllByRole("link");
                expect(links[0]).toHaveFocus();
            });
        });
        describe("and becomes wide with focus on a link in the menu", () => {
            let focusedLinkIndex: number;
            beforeEach(async () => {
                await user.click(within(navElement).getByRole("button", { name: "Menu" }));

                const links = within(navElement).getAllByRole("link");
                focusedLinkIndex = Math.floor(Math.random() * links.length);
                links[focusedLinkIndex].focus();

                mocked(window.matchMedia).mockReturnValue({ matches: false } as MediaQueryList);
                await waitFor(() => {
                    windowResizeListener(null as unknown as Event);
                });
            });
            test("should focus the same link that was focused before", () => {
                const links = within(navElement).getAllByRole("link");
                expect(links[focusedLinkIndex]).toHaveFocus();
            });
        });
    });

    describe("when the screen is wide", () => {
        beforeEach(() => {
            when(window.matchMedia)
                .calledWith(SMALL_SCREEN_MEDIA_QUERY)
                .mockReturnValue({ matches: false } as MediaQueryList);

            render(<Navigation/>, { wrapper: NavigationBarTestWrapper });
            navElement = screen.getByRole("navigation");
        });
        test("DOES NOT show the nav menu within a nav element", () => {
            expect(within(navElement).queryByTestId("nav-menu")).not.toBeInTheDocument();
        });
        test("shows the nav links", () => {
            expect(within(navElement).getAllByRole("link").length).toBeGreaterThan(0);
        });
        describe("and becomes narrow", () => {
            beforeEach(async () => {
                mocked(window.matchMedia).mockReturnValue({ matches: true } as MediaQueryList);
                await waitFor(() => {
                    windowResizeListener(null as unknown as Event);
                });
            });
            test("the nav menu button appears", () => {
                const navMenuButton = within(navElement).getByRole("button", { name: "Menu" });
                expect(navMenuButton).toBeInTheDocument();
            });
        });
        describe("and becomes narrow while focus is on a link", () => {
            beforeEach(async () => {
                const links = within(navElement).getAllByRole("link");
                const randomLinkIndex = Math.floor(Math.random() * links.length);
                links[randomLinkIndex].focus();

                mocked(window.matchMedia).mockReturnValue({ matches: true } as MediaQueryList);
                await waitFor(() => {
                    windowResizeListener(null as unknown as Event);
                });
            });
            test("the nav menu button gains focus", () => {
                const navMenuButton = within(navElement).getByRole("button", { name: "Menu" });
                expect(navMenuButton).toHaveFocus();
            });
        });
    });
});

const NavigationBarTestWrapper = ({ children }: ChildrenProps) => {
    return (
        <main>
            <MemoryRouter>
                {children}
            </MemoryRouter>
        </main>
    );
};
