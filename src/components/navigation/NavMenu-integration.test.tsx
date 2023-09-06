import userEvent from "@testing-library/user-event";
import { render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { Layout } from "../../layout/Layout";
import { NavMenu } from "./NavMenu";
import { DocumentStateProvider } from "../../contexts/DocumentStateContext";
import { when } from "jest-when";
import { SMALL_SCREEN_MEDIA_QUERY } from "./Navigation";
import { PAGE_ENDPOINTS } from "../../layout/RouterOutlet";

describe(`${NavMenu.name} (Integration Test)`, () => {
    let menuButton: HTMLButtonElement;
    let linkList: HTMLUListElement;
    let user: UserEvent;
    beforeEach(() => {
        user = userEvent.setup();

        jest.spyOn(window, "matchMedia").mockImplementation(jest.fn());
        when(window.matchMedia)
            .calledWith(SMALL_SCREEN_MEDIA_QUERY)
            .mockReturnValue({ matches: true } as MediaQueryList);

        render(
            <DocumentStateProvider>
                <MemoryRouter initialEntries={["/"]}>
                    <Layout/>
                </MemoryRouter>
            </DocumentStateProvider>
        );
        menuButton = screen.getByRole("button", { name: "Menu" });
    });
    describe("when the user navigates via the nav menu links", () => {
        let links: HTMLAnchorElement[];
        beforeEach(async () => {
            await user.click(menuButton);
            linkList = screen.getAllByRole("list")[0] as HTMLUListElement;
            links = within(linkList).getAllByRole("link");
        });
        test("closes the navigation menu", async () => {
            await user.click(links.find(link => link.href.includes(PAGE_ENDPOINTS.businesses))!);

            await waitFor(() => {
                expect(linkList).not.toBeVisible();
            });
        });
    });
});
