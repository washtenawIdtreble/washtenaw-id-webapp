import React, { useCallback, useState } from "react";
import { useFocusHashOrMainHeading } from "./useFocusHashOrMainHeading";
import { render, screen, waitFor } from "@testing-library/react";
import { asyncTimeout } from "../../../test/async-timeout";
import { ChildrenProps } from "../../utilities/children-props";
import { DocumentStateContext } from "../../contexts/DocumentStateContext";
import { Location, useLocation } from "react-router-dom";
import { ENVIRONMENT_VARIABLES, getIntegerEnvVar } from "../../utilities/environment-variables";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";
import mocked = jest.mocked;

jest.mock("react-router-dom");

describe(useFocusHashOrMainHeading.name, () => {
    const heading1 = "Some heading!";
    const subheading = "this is a subtopic";
    const fragmentValue = "subtopic";
    let documentIsNew: boolean;

    let originalScrollIntoView: (arg?: boolean | ScrollIntoViewOptions | undefined) => void;
    let user: UserEvent;

    beforeAll(() => {
        originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
    });

    afterAll(() => {
        HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
    });

    beforeEach(() => {
        user = userEvent.setup();

        HTMLElement.prototype.scrollIntoView = jest.fn();
    });

    describe("when the user has navigated from within the app", () => {
        beforeEach(() => {
            documentIsNew = false;
        });

        describe("and there is NO fragment in the URL", () => {
            test("focuses the childrens' h1 element", async () => {
                mocked(useLocation).mockReturnValue({
                    hash: ""
                } as Location);

                render(
                    <ContextProvider documentIsNew={documentIsNew}>
                        <h1 tabIndex={-1}>{heading1}</h1>
                    </ContextProvider>
                );

                const h1 = screen.getByRole("heading", { level: 1, name: heading1 });

                await waitFor(() => {
                    expect(h1).toHaveFocus();
                });
            });
        });

        describe("and there is a fragment in the URL", () => {
            beforeEach(() => {
                mocked(useLocation).mockReturnValue({
                    hash: `#${fragmentValue}`
                } as Location);
            });

            describe("with a matching element on the page", () => {

                describe("when loading finishes quickly", () => {
                    test("focuses the element with the fragment as its ID and scrolls it into view", async () => {
                        render(
                            <ContextProvider documentIsNew={documentIsNew}>
                                <h1 tabIndex={-1}>{heading1}</h1>
                                <span id={fragmentValue} tabIndex={-1}>{subheading}</span>
                            </ContextProvider>
                        );

                        const subheadingElement = screen.getByText(subheading);

                        await waitFor(() => {
                            expect(subheadingElement).toHaveFocus();
                        });

                        expect(subheadingElement.scrollIntoView).toHaveBeenCalledTimes(1);
                    });
                });

                describe("when loading takes a long time", () => {
                    test("focuses the subheading after loading finishes", async () => {
                        render(
                            <ContextProvider documentIsNew={documentIsNew} initialLoading={true}>
                                <h1 tabIndex={-1}>{heading1}</h1>
                                <span id={fragmentValue} tabIndex={-1}>{subheading}</span>
                            </ContextProvider>
                        );

                        await asyncTimeout(500);

                        await user.click(screen.getByRole("button", { name: "TOGGLE LOADING" }));

                        const subheadingElement = await screen.findByText(subheading);

                        await waitFor(() => {
                            expect(subheadingElement).toHaveFocus();
                        });

                        expect(subheadingElement.scrollIntoView).toHaveBeenCalledTimes(1);
                    });
                });
            });

            describe("with NO matching element on the page", () => {
                describe("when loading finishes quickly", () => {
                    test("focuses the childrens' h1 element", async () => {
                        render(
                            <ContextProvider documentIsNew={documentIsNew}>
                                <h1 tabIndex={-1}>{heading1}</h1>
                            </ContextProvider>
                        );

                        const h1 = screen.getByRole("heading", { level: 1, name: heading1 });

                        await waitFor(() => {
                            expect(h1).toHaveFocus();
                        });
                    });
                });

                describe("when loading takes a long time", () => {
                    test("focuses the subheading after loading finishes", async () => {
                        render(
                            <ContextProvider documentIsNew={documentIsNew} initialLoading={true}>
                                <h1 tabIndex={-1}>{heading1}</h1>
                            </ContextProvider>
                        );

                        await asyncTimeout(500);

                        await user.click(screen.getByRole("button", { name: "TOGGLE LOADING" }));

                        const h1 = screen.getByRole("heading", { level: 1, name: heading1 });

                        await waitFor(() => {
                            expect(h1).toHaveFocus();
                        });
                    });
                });
            });
        });

        describe("and there is an empty fragment in the URL", () => {
            test("focuses the childrens' h1 element", async () => {
                mocked(useLocation).mockReturnValue({
                    hash: "#"
                } as Location);

                render(
                    <ContextProvider documentIsNew={documentIsNew}>
                        <h1 tabIndex={-1}>{heading1}</h1>
                    </ContextProvider>
                );

                const h1 = screen.getByRole("heading", { level: 1, name: heading1 });
                await waitFor(() => {
                    expect(h1).toHaveFocus();
                });
            });
        });
    });

    describe("when the user has freshly loaded the document", () => {
        beforeEach(() => {
            documentIsNew = true;
        });
        describe("and there is NO fragment in the URL", () => {
            test("does NOT change the default focus", async () => {
                mocked(useLocation).mockReturnValue({
                    hash: ""
                } as Location);

                render(
                    <ContextProvider documentIsNew={documentIsNew}>
                        <h1 tabIndex={-1}>{heading1}</h1>
                    </ContextProvider>
                );

                const h1 = screen.getByRole("heading", { level: 1, name: heading1 });
                await asyncTimeout(getIntegerEnvVar(ENVIRONMENT_VARIABLES.REACT_APP_FOCUS_TIMEOUT) * 2);
                expect(h1).not.toHaveFocus();
            });
        });

        describe("and there is a fragment in the URL", () => {
            beforeEach(() => {
                mocked(useLocation).mockReturnValue({
                    hash: `#${fragmentValue}`
                } as Location);
            });

            describe("with a matching element on the page", () => {
                describe("when loading finishes quickly", () => {
                    test("focuses the element with the fragment as its ID and scrolls it into view", async () => {
                        render(
                            <ContextProvider documentIsNew={documentIsNew}>
                                <h1 tabIndex={-1}>{heading1}</h1>
                                <span id={fragmentValue} tabIndex={-1}>{subheading}</span>
                            </ContextProvider>
                        );

                        const subheadingElement = screen.getByText(subheading);

                        await waitFor(() => {
                            expect(subheadingElement).toHaveFocus();
                        });

                        expect(subheadingElement.scrollIntoView).toHaveBeenCalledTimes(1);
                    });
                });

                describe("when loading takes a long time", () => {
                    test("focuses the subheading after loading finishes", async () => {
                        render(
                            <ContextProvider documentIsNew={documentIsNew} initialLoading={true}>
                                <h1 tabIndex={-1}>{heading1}</h1>
                                <span id={fragmentValue} tabIndex={-1}>{subheading}</span>
                            </ContextProvider>
                        );

                        await asyncTimeout(500);

                        await user.click(screen.getByRole("button", { name: "TOGGLE LOADING" }));

                        const subheadingElement = await screen.findByText(subheading);

                        await waitFor(() => {
                            expect(subheadingElement).toHaveFocus();
                        });

                        expect(subheadingElement.scrollIntoView).toHaveBeenCalledTimes(1);
                    });
                });
            });

            describe("with NO matching element on the page", () => {
                describe("when loading finishes quickly", () => {
                    test("does NOT change the default focus", async () => {
                        render(
                            <ContextProvider documentIsNew={documentIsNew}>
                                <h1 tabIndex={-1}>{heading1}</h1>
                            </ContextProvider>
                        );

                        const h1 = screen.getByRole("heading", { level: 1, name: heading1 });
                        await asyncTimeout(getIntegerEnvVar(ENVIRONMENT_VARIABLES.REACT_APP_FOCUS_TIMEOUT) * 2);
                        expect(h1).not.toHaveFocus();
                    });
                });

                describe("when loading takes a long time", () => {
                    test("does NOT change the default focus", async () => {
                        render(
                            <ContextProvider documentIsNew={documentIsNew} initialLoading={true}>
                                <h1 tabIndex={-1}>{heading1}</h1>
                            </ContextProvider>
                        );

                        await asyncTimeout(500);

                        await user.click(screen.getByRole("button", { name: "TOGGLE LOADING" }));

                        const h1 = screen.getByRole("heading", { level: 1, name: heading1 });
                        await asyncTimeout(getIntegerEnvVar(ENVIRONMENT_VARIABLES.REACT_APP_FOCUS_TIMEOUT) * 2);
                        expect(h1).not.toHaveFocus();
                    });
                });
            });
        });

        describe("and there is an empty fragment in the URL", () => {
            test("does NOT change the default focus", async () => {
                mocked(useLocation).mockReturnValue({
                    hash: "#"
                } as Location);

                render(
                    <ContextProvider documentIsNew={documentIsNew}>
                        <h1 tabIndex={-1}>{heading1}</h1>
                    </ContextProvider>
                );

                const h1 = screen.getByRole("heading", { level: 1, name: heading1 });
                await asyncTimeout(getIntegerEnvVar(ENVIRONMENT_VARIABLES.REACT_APP_FOCUS_TIMEOUT) * 2);
                expect(h1).not.toHaveFocus();
            });
        });
    });
});

const ContextProvider = ({
                             children,
                             documentIsNew,
                             initialLoading = false
                         }: { documentIsNew: boolean, initialLoading?: boolean } & ChildrenProps) => {
    const [documentIsNew_] = useState(documentIsNew);

    return (
        <DocumentStateContext.Provider value={{ documentIsNew: documentIsNew_, documentHasBeenLoaded: () => {} }}>
            <UsesHook initialLoading={initialLoading}>
                {children}
            </UsesHook>
        </DocumentStateContext.Provider>
    );
};

const UsesHook = ({ initialLoading, children }: { initialLoading: boolean } & ChildrenProps) => {
    const [loading, setLoading] = useState(initialLoading);

    const toggleLoading = useCallback(() => {
        setLoading(current => !current);
    }, []);

    useFocusHashOrMainHeading(loading);

    return (<>
        {!loading && children}
        <button onClick={toggleLoading}>TOGGLE LOADING</button>
    </>);
};
