import { HeaderBar, WINDOW_RESIZE_EVENT } from "./HeaderBar";
import { render, screen, waitFor, within } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { when } from "jest-when";
import mocked = jest.mocked;

describe(HeaderBar.name, () => {
    let windowResizeListener: EventListener;
    let resizeSubscriptionCount = 0;
    beforeEach(() => {
        jest.spyOn(window, "matchMedia").mockImplementation(jest.fn());
        when(window.matchMedia)
            .calledWith("(max-width: 767px)")
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
    describe("when the component is mounted", () => {
        let unmount: () => void;
        let rerender: any;
        beforeEach(() => {
            ({ rerender, unmount } = render(<HeaderBar/>, { wrapper: HeaderBarTestWrapper }));
            rerender(<HeaderBar/>, { wrapper: HeaderBarTestWrapper });
        });
        test("subscribes to window resize", () => {
            expect(resizeSubscriptionCount).toEqual(1);
        });
        describe("and then unmounted", () => {
            beforeEach(() => {
                unmount();
            });
            test("should remove the event listener", () => {
                expect(window.removeEventListener).toHaveBeenCalledWith(WINDOW_RESIZE_EVENT, windowResizeListener);
            });
        });
    });
    describe("when the screen is narrow", () => {
        beforeEach(() => {
            render(<HeaderBar/>, { wrapper: HeaderBarTestWrapper });
        });
        test("shows the nav menu within a nav element", () => {
            let nav = screen.getByRole("navigation");
            const navMenu = within(nav).getByTestId("nav-menu");
            expect(navMenu).toBeInTheDocument();
        });
        test("shows the nav links within the nav menu", () => {
            userEvent.click(screen.getByRole("button", { name: "Menu" }));
            expect(screen.getByRole("link", { name: "All Businesses" })).toBeInTheDocument();
        });
        describe("and changes to wide", () => {
            beforeEach(async () => {
                mocked(window.matchMedia).mockReturnValue({ matches: false } as MediaQueryList);
                await waitFor(() => {
                    windowResizeListener(null as unknown as Event);
                });
            });
            test("links move out of the nav menu", () => {
                const navMenu = screen.queryByTestId("nav-menu");
                expect(navMenu).not.toBeInTheDocument();
            });
        });
    });
    describe("when the screen is wide", () => {
        beforeEach(() => {
            when(window.matchMedia)
                .calledWith("(max-width: 767px)")
                .mockReturnValue({ matches: false } as MediaQueryList);

            render(<HeaderBar/>, { wrapper: HeaderBarTestWrapper });
        });
        test("DOES NOT show the nav menu within a nav element", () => {
            const navMenu = screen.queryByTestId("nav-menu");
            expect(navMenu).not.toBeInTheDocument();
        });
        test("shows the nav links", () => {
            expect(screen.getByRole("link", { name: "All Businesses" })).toBeInTheDocument();
        });
        describe("and changes to narrow", () => {
            beforeEach(async () => {
                mocked(window.matchMedia).mockReturnValue({ matches: true } as MediaQueryList);
                await waitFor(() => {
                    windowResizeListener(null as unknown as Event);
                });
            });
            test("links move into nav menu", () => {
                let nav = screen.getByRole("navigation");
                const navMenu = within(nav).getByTestId("nav-menu");
                expect(navMenu).toBeInTheDocument();
            });
        });
    });
});

const HeaderBarTestWrapper = (props: { children: React.ReactNode }) => {
    return (
        <main>
            <MemoryRouter>
                {props.children}
            </MemoryRouter>
        </main>
    );
};