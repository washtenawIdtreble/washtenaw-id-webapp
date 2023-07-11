import { PAGE_ENDPOINTS, RouterOutlet } from "./RouterOutlet";
import { render, screen, waitFor } from "@testing-library/react";
import React, { useCallback, useState } from "react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { DOCUMENT_TITLE_SUFFIX } from "../pages/Page";
import { BUSINESSES_PAGE_HEADING } from "../pages/businesses/Businesses";
import { CONTACT_PAGE_HEADING } from "../pages/contact-us/ContactUs";
import { ACCESSIBILITY_PAGE_HEADING } from "../pages/accessibility-issues/AccessibilityIssues";
import { CATEGORIES_PAGE_HEADING } from "../pages/categories/Categories";
import { DocumentStateContext } from "../contexts/DocumentStateContext";
import { AppLink } from "../components/navigation/AppLink";
import { asyncTimeout } from "../../test/async-timeout";
import { ENVIRONMENT_VARIABLES, getIntegerEnvVar } from "../utilities/environment-variables";

describe(RouterOutlet.name, () => {
    let user: UserEvent;
    let h1: HTMLHeadingElement;
    beforeEach(async () => {
        user = userEvent.setup();
        render(<TestingRouterWithLinks/>);
        await screen.findByText("Banks"); // wait for Categories API call to resolve
    });

    test("has the correct page endpoints", () => {
        expect(PAGE_ENDPOINTS.categories).toBe("/");
        expect(PAGE_ENDPOINTS.businesses).toBe("/businesses");
        expect(PAGE_ENDPOINTS.accessibilityIssues).toBe("/accessibility-issues");
        expect(PAGE_ENDPOINTS.contactUs).toBe("/contact-us");
    });

    describe("when the user lands on the home page", () => {
        beforeEach(async () => {
            h1 = await screen.findByRole("heading", { level: 1, name: CATEGORIES_PAGE_HEADING });
        });
        test("they see the categories page", async () => {
            expect(h1).toBeVisible();
        });
        test("the document title is correct", () => {
            expect(document.title).toEqual(`${CATEGORIES_PAGE_HEADING}${DOCUMENT_TITLE_SUFFIX}`);
        });
        test("the main heading is NOT focused because the document is new", async () => {
            await asyncTimeout(getIntegerEnvVar(ENVIRONMENT_VARIABLES.REACT_APP_FOCUS_TIMEOUT) + 1);
            expect(h1).not.toHaveFocus();
        });
    });

    describe("when the user navigates to each page - ", () => {
        describe("Categories", () => {
            beforeEach(async () => {
                // navigate away from the categories page and back
                await user.click(screen.getByRole("link", { name: "Accessibility Issues" }));
                await screen.findByRole("heading", { level: 1, name: ACCESSIBILITY_PAGE_HEADING });
                await user.click(screen.getByRole("link", { name: "Categories" }));
                h1 = await screen.findByRole("heading", { level: 1, name: CATEGORIES_PAGE_HEADING });
                await screen.findByText("Banks"); // wait for Categories API call to resolve
            });
            test("they see the categories page", () => {
                expect(h1).toBeVisible();
            });
            test("the document title is correct", () => {
                expect(document.title).toEqual(`${CATEGORIES_PAGE_HEADING}${DOCUMENT_TITLE_SUFFIX}`);
            });
            test("the main heading is focused", async () => {
                await waitFor(() => {
                    expect(h1).toHaveFocus();
                });
            });
        });

        describe("BusinessesPage", () => {
            beforeEach(async () => {
                await user.click(screen.getByRole("link", { name: "Businesses" }));
                h1 = await screen.findByRole("heading", { level: 1, name: BUSINESSES_PAGE_HEADING });
                await screen.findAllByRole("heading", { level: 2 }); // wait for Businesses API call to resolve
            });
            test("they see the businesses page", () => {
                expect(h1).toBeVisible();
            });
            test("the document title is correct", () => {
                expect(document.title).toEqual(`${BUSINESSES_PAGE_HEADING}${DOCUMENT_TITLE_SUFFIX}`);
            });
            test("the main heading is focused", async () => {
                await waitFor(() => {
                    expect(h1).toHaveFocus();
                });
            });
        });

        describe("Accessibility Issues Page", () => {
            beforeEach(async () => {
                await user.click(screen.getByRole("link", { name: "Accessibility Issues" }));
                h1 = await screen.findByRole("heading", { level: 1, name: ACCESSIBILITY_PAGE_HEADING });
            });
            test("they see the accessibility issues page", () => {
                expect(h1).toBeVisible();
            });
            test("the document title is correct", () => {
                expect(document.title).toEqual(`${ACCESSIBILITY_PAGE_HEADING}${DOCUMENT_TITLE_SUFFIX}`);
            });
            test("the main heading is focused", async () => {
                await waitFor(() => {
                    expect(h1).toHaveFocus();
                });
            });
        });

        describe("Contact Us Page", () => {
            beforeEach(async () => {
                await user.click(screen.getByRole("link", { name: "Contact" }));
                h1 = await screen.findByRole("heading", { level: 1, name: CONTACT_PAGE_HEADING.toLocaleLowerCase() });
            });
            test("they see the contact us page", () => {
                expect(h1).toBeVisible();
            });
            test("the document title is correct", () => {
                expect(document.title).toEqual(`${CONTACT_PAGE_HEADING}${DOCUMENT_TITLE_SUFFIX}`);
            });
            test("the main heading is focused", async () => {
                await waitFor(() => {
                    expect(h1).toHaveFocus();
                });
            });
        });
    });
});

const TestingRouterWithLinks = () => {
    const [documentIsNew, setdocumentIsNew] = useState(true);
    const documentHasBeenLoaded = useCallback(() => {
        setdocumentIsNew(false);
    }, []);
    return (
        <MemoryRouter initialEntries={[PAGE_ENDPOINTS.categories]}>
            <DocumentStateContext.Provider value={{ documentIsNew, documentHasBeenLoaded }}>
                <RouterOutlet/>
                <AppLink to={PAGE_ENDPOINTS.categories}>Categories</AppLink>
                <AppLink to={PAGE_ENDPOINTS.businesses}>Businesses</AppLink>
                <AppLink to={PAGE_ENDPOINTS.accessibilityIssues}>Accessibility Issues</AppLink>
                <AppLink to={PAGE_ENDPOINTS.contactUs}>Contact</AppLink>
            </DocumentStateContext.Provider>
        </MemoryRouter>
    );
};
