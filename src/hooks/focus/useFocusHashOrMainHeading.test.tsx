import React, { useState } from "react";
import { useFocusHashOrMainHeading } from "./useFocusHashOrMainHeading";
import { render, screen, waitFor } from "@testing-library/react";
import { asyncTimeout } from "../../../test/async-timeout";
import { ChildrenProps } from "../../utilities/children-props";
import { DocumentStateContext } from "../../contexts/DocumentStateContext";
import { Location, useLocation } from "react-router-dom";
import mocked = jest.mocked;

jest.mock("react-router-dom");

describe(useFocusHashOrMainHeading.name, () => {
    const heading1 = "Some heading!";
    const subheading = "this is a subtopic";
    const fragmentValue = "subtopic";

    let originalScrollIntoView: (arg?: boolean | ScrollIntoViewOptions | undefined) => void;
    beforeAll(() => {
        originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
    });

    afterAll(() => {
        HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    });

    beforeEach(() => {
        HTMLElement.prototype.scrollIntoView = jest.fn();

        mocked(useLocation).mockReturnValue({
            hash: `#${fragmentValue}`
        } as Location);
    });

    describe("when the user has navigated from within the app", () => {

        describe("and there is NO fragment in the URL", () => {
            beforeEach(() => {
                render(
                    <ContextProvider freshDocument={false}>
                        <h1 tabIndex={-1}>{heading1}</h1>
                    </ContextProvider>
                );
            });

            test("focuses the childrens' h1 element after a delay", async () => {
                const h1 = screen.getByRole("heading", { level: 1, name: heading1 });
                expect(h1).not.toHaveFocus();
                await waitFor(() => {
                    expect(h1).toHaveFocus();
                });
            });
        });

        describe("and there is a fragment in the URL", () => {

            describe("with a matching element on the page", () => {
                beforeEach(() => {
                    render(
                        <ContextProvider freshDocument={false}>
                            <h1 tabIndex={-1}>{heading1}</h1>
                            <span id={fragmentValue} tabIndex={-1}>{subheading}</span>
                        </ContextProvider>
                    );
                });

                test("focuses the element with the fragment as its ID and scrolls it into view", async () => {
                    const subheadingElement = screen.getByText(subheading);

                    await waitFor(() => {
                        expect(subheadingElement).toHaveFocus();
                    });

                    expect(subheadingElement.scrollIntoView).toHaveBeenCalledTimes(1);
                });
            });

            describe("with NO matching element on the page", () => {
                beforeEach(() => {
                    render(
                        <ContextProvider freshDocument={false}>
                            <h1 tabIndex={-1}>{heading1}</h1>
                        </ContextProvider>
                    );
                });

                test("focuses the childrens' h1 element after a delay", async () => {
                    const h1 = screen.getByRole("heading", { level: 1, name: heading1 });

                    await waitFor(() => {
                        expect(h1).toHaveFocus();
                    });
                });
            });

            describe("with an empty fragment", () => {

                beforeEach(() => {
                    mocked(useLocation).mockReturnValue({
                        hash: `#${fragmentValue}`
                    } as Location);

                    render(
                        <ContextProvider freshDocument={false}>
                            <h1 tabIndex={-1}>{heading1}</h1>
                        </ContextProvider>
                    );
                });

                test("focuses the childrens' h1 element after a delay", async () => {
                    const h1 = screen.getByRole("heading", { level: 1, name: heading1 });
                    expect(h1).not.toHaveFocus();
                    await waitFor(() => {
                        expect(h1).toHaveFocus();
                    });
                });
            });
        });
    });

    describe("when the user has freshly loaded the document", () => {

        describe("and there is NO fragment in the URL", () => {

            beforeEach(() => {
                render(
                    <ContextProvider freshDocument={true}>
                        <h1 tabIndex={-1}>{heading1}</h1>
                    </ContextProvider>
                );
            });

            test("does NOT change the default focus", async () => {
                const h1 = screen.getByRole("heading", { level: 1, name: heading1 });
                await asyncTimeout(parseInt(process.env.REACT_APP_FOCUS_TIMEOUT!) * 2);
                expect(h1).not.toHaveFocus();
            });
        });

        describe("and there is a fragment in the URL", () => {

            describe("with a matching element on the page", () => {
                beforeEach(() => {
                    render(
                        <ContextProvider freshDocument={true}>
                            <h1 tabIndex={-1}>{heading1}</h1>
                            <span id={fragmentValue} tabIndex={-1}>{subheading}</span>
                        </ContextProvider>
                    );
                });

                test("focuses the element with the fragment as its ID and scrolls it into view", async () => {
                    const subheadingElement = screen.getByText(subheading);

                    await waitFor(() => {
                        expect(subheadingElement).toHaveFocus();
                    });

                    expect(subheadingElement.scrollIntoView).toHaveBeenCalledTimes(1);
                });
            });

            describe("with NO matching element on the page", () => {
                beforeEach(() => {
                    render(
                        <ContextProvider freshDocument={true}>
                            <h1 tabIndex={-1}>{heading1}</h1>
                        </ContextProvider>
                    );
                });

                test("does NOT change the default focus", async () => {
                    const h1 = screen.getByRole("heading", { level: 1, name: heading1 });
                    await asyncTimeout(parseInt(process.env.REACT_APP_FOCUS_TIMEOUT!) * 2);
                    expect(h1).not.toHaveFocus();
                });
            });

            describe("with an empty fragment", () => {

                beforeEach(() => {
                    mocked(useLocation).mockReturnValue({
                        hash: `#${fragmentValue}`
                    } as Location);

                    render(
                        <ContextProvider freshDocument={false}>
                            <h1 tabIndex={-1}>{heading1}</h1>
                        </ContextProvider>
                    );
                });

                test("does NOT change the default focus", async () => {
                    const h1 = screen.getByRole("heading", { level: 1, name: heading1 });
                    await asyncTimeout(parseInt(process.env.REACT_APP_FOCUS_TIMEOUT!) * 2);
                    expect(h1).not.toHaveFocus();
                });
            });
        });
    });
});

const ContextProvider = ({ children, freshDocument }: { freshDocument: boolean } & ChildrenProps) => {
    const [documentIsNew] = useState(freshDocument);

    return (
        <DocumentStateContext.Provider value={{ documentIsNew, documentHasBeenLoaded: () => {} }}>
            <UsesHook>
                {children}
            </UsesHook>
        </DocumentStateContext.Provider>
    );
};

const UsesHook = ({ children }: ChildrenProps) => {
    useFocusHashOrMainHeading();

    return (<>
        {children}
    </>);
};
