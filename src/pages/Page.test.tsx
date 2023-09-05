import { Page } from "./Page";
import { render, screen, waitFor, within } from "@testing-library/react";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DocumentStateContext } from "../contexts/DocumentStateContext";
import { ChildrenProps } from "../utilities/children-props";
import { useFocusHashOrMainHeading } from "../hooks/focus/useFocusHashOrMainHeading";
import { LoadingContext } from "../contexts/LoadingContext";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";

jest.mock("react-router-dom");
jest.mock("../hooks/focus/useFocusHashOrMainHeading");

let documentStateUpdated: boolean;

describe(Page.name, () => {
    const pageTitle = "The Page";
    let user: UserEvent;

    beforeEach(() => {
        documentStateUpdated = false;
        user = userEvent.setup();
    });

    describe("under normal conditions", () => {
        let liveRegion: HTMLDivElement;

        beforeEach(() => {
            render(
                <ContextProvider freshDocument={false}>
                    <Page title={pageTitle}>
                        <h1 tabIndex={-1}>Main Heading</h1>
                    </Page>
                </ContextProvider>
            );
        });

        test("sets the document title", () => {
            expect(document.title).toEqual(`${pageTitle} - Washtenaw ID Project`);
        });

        test("focuses the right heading", () => {
            expect(useFocusHashOrMainHeading).toHaveBeenCalledTimes(1);
        });

        test("updates the document state", async () => {
            await waitFor(() => {
                expect(documentStateUpdated).toBe(true);
            });
        });

        test("displays an empty live region on mount", () => {
            liveRegion = screen.getByTestId("page-live-region");
            expect(liveRegion).toHaveAttribute("aria-live", "polite");
            expect(liveRegion.textContent).toBe("");
        });
    });

    describe("when loading takes a long time", () => {
        let liveRegion: HTMLDivElement;

        beforeEach(() => {
            render(
                <ContextProvider freshDocument={false}>
                    <Page title={pageTitle}>
                        <h1 tabIndex={-1}>Main Heading</h1>
                        <ChildComponentThatLoadsData/>
                    </Page>
                </ContextProvider>
            );

            liveRegion = screen.getByTestId("page-live-region");
        });

        test("anounces 'loading' after a timeout", async () => {
            await user.click(screen.getByRole("button", { name: "START LOADING" }));
            const loadingText = await within(liveRegion).findByText("loading");
            expect(loadingText).toBeInTheDocument();
        });

        test("shows a loading indicator after timeout", async () => {
            await user.click(screen.getByRole("button", { name: "START LOADING" }));
            const loadingText = await screen.findByText("Loading...");
            expect(loadingText).toBeVisible();
        });

        test("Hides loading indicator when loading finishes", async () => {
            await user.click(screen.getByRole("button", { name: "START LOADING" }));
            await screen.findByText("Loading...");

            await user.click(screen.getByRole("button", { name: "STOP LOADING" }));
            expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        });

        test("Announces 'finished loading', then clears the live region when loading finishes", async () => {
            await user.click(screen.getByRole("button", { name: "START LOADING" }));
            await screen.findByText("Loading...");

            await user.click(screen.getByRole("button", { name: "STOP LOADING" }));

            const finishedLoadingAnnouncment = await within(liveRegion).findByText("finished loading");
            expect(finishedLoadingAnnouncment).toBeInTheDocument();

            await waitFor(() => {
                expect(liveRegion.textContent).toEqual("");
            });
        });

        test("does not show loading text or indicator if loading finished within the timeout period", async () => {
            const originalAppLoadingTimeout = process.env.REACT_APP_LOADING_TIMEOUT;
            process.env.REACT_APP_LOADING_TIMEOUT = "125";

            await user.click(screen.getByRole("button", { name: "START LOADING" }));
            await user.click(screen.getByRole("button", { name: "STOP LOADING" }));

            const loadingText = within(liveRegion).queryByText("loading", { exact: true });
            expect(loadingText).not.toBeInTheDocument();

            const finishedLoadingText = within(liveRegion).queryByText("finished loading");
            expect(finishedLoadingText).not.toBeInTheDocument();

            const loadingIndicator = screen.queryByText("Loading...");
            expect(loadingIndicator).not.toBeInTheDocument();

            process.env.REACT_APP_LOADING_TIMEOUT = originalAppLoadingTimeout;
        });

        test("focuses the right heading", async () => {
            expect(useFocusHashOrMainHeading).toHaveBeenLastCalledWith(false);

            await user.click(screen.getByRole("button", { name: "START LOADING" }));
            await screen.findByText("Loading...");
            expect(useFocusHashOrMainHeading).toHaveBeenLastCalledWith(true);

            await user.click(screen.getByRole("button", { name: "STOP LOADING" }));
            expect(useFocusHashOrMainHeading).toHaveBeenLastCalledWith(false);
        });
    });

    describe("under error conditions", () => {
        const testCases = [true, false];

        testCases.forEach(documentState => {
            test(`when the h1 element does not have tabindex shows error - new document: ${documentState}`, async () => {
                render(
                    <ContextProvider freshDocument={documentState}>
                        <Page title={pageTitle}>
                            <h1>Bad Page</h1>
                        </Page>
                    </ContextProvider>
                );
                const errorMessage = `This page's h1 element has a bad \`tabindex\` - please specify \`tabindex=-1\``;
                await waitFor(() => {
                    expect(screen.getByText(errorMessage)).toBeVisible();
                });
            });

            test(`when the h1 element has wrong tabindex shows error  - new document: ${documentState}`, async () => {
                render(
                    <ContextProvider freshDocument={documentState}>
                        <Page title={pageTitle}>
                            <h1 tabIndex={0}>Bad Page</h1>
                        </Page>
                    </ContextProvider>
                );
                const errorMessage = `This page's h1 element has a bad \`tabindex\` - please specify \`tabindex=-1\``;
                await waitFor(() => {
                    expect(screen.getByText(errorMessage)).toBeVisible();
                });
            });

            test(`when the h1 element is missing shows error - new document: ${documentState}`, async () => {
                render(
                    <ContextProvider freshDocument={documentState}>
                        <Page title={pageTitle}>
                            <h2>Bad Page</h2>
                        </Page>
                    </ContextProvider>
                );
                const errorMessage = `This page is missing an h1 element - please add one with \`tabindex=-1\``;
                await waitFor(() => {
                    expect(screen.getByText(errorMessage)).toBeVisible();
                });
            });
        });
    });
});

const ContextProvider = ({ children, freshDocument }: { freshDocument: boolean } & ChildrenProps) => {
    const [documentIsNew] = useState(freshDocument);
    const documentHasBeenLoaded = useCallback(() => {
        documentStateUpdated = true;
    }, []);

    return (
        <DocumentStateContext.Provider value={{ documentIsNew, documentHasBeenLoaded }}>
            {children}
        </DocumentStateContext.Provider>
    );
};

const ChildComponentThatLoadsData = () => {
    const { startLoading, finishLoading } = useContext(LoadingContext);
    const hasLoadedOnce = useRef(false);

    useEffect(() => {
        if (hasLoadedOnce.current) {
            /* *
             * When the Page component included a boolean state (loadingIndicatorNeeded) as a dependency of its
             * setIsLoading callback, it would trigger an infinite loop calling the API. This happened because the change
             * in the boolean caused startLoading and finishLoading to update, which caused the useCallback in useGet to update,
             * which then caused the useBusinesses or useCategories hook to re-run, calling the API again.
             * */
            throw new Error("The Page component must not change `setIsLoading` by including dependencies that update.");
        }
        hasLoadedOnce.current = true;
    }, [startLoading, finishLoading]);

    return (<>
        children
        <button onClick={startLoading}>START LOADING</button>
        <button onClick={finishLoading}>STOP LOADING</button>
    </>);
};
