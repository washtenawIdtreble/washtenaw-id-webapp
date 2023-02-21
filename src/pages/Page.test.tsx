import { Page } from "./Page";
import { render, screen, waitFor } from "@testing-library/react";
import React, { useCallback, useState } from "react";
import { DocumentStateContext } from "../contexts/DocumentStateContext";
import { ChildrenProps } from "../utilities/children-props";
import { useFocusHashOrMainHeading } from "../hooks/focus/useFocusHashOrMainHeading";

jest.mock("react-router-dom");
jest.mock("../hooks/focus/useFocusHashOrMainHeading");

let documentStateUpdated: boolean;

describe(Page.name, () => {
    const pageTitle = "The Page";

    beforeEach(() => {
        documentStateUpdated = false;
    });

    describe("under normal conditions", () => {

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