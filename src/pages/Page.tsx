import React, { useContext, useEffect, useState } from "react";
import { ChildrenProps } from "../utilities/children-props";
import { ErrorMessageNotification } from "../components/userMessage/ErrorMessageNotification";
import { DocumentStateContext } from "../contexts/DocumentStateContext";
import { useFocusHashOrMainHeading } from "../hooks/focus/useFocusHashOrMainHeading";
import "./Pages.css";

type PageProps = {
    title: string
} & ChildrenProps;

export const DOCUMENT_TITLE_SUFFIX = " - Washtenaw ID Project";

export const Page = ({ title, children }: PageProps) => {
    const { documentHasBeenLoaded } = useContext(DocumentStateContext);

    useFocusHashOrMainHeading();

    useEffect(() => {
        document.title = `${title}${DOCUMENT_TITLE_SUFFIX}`;
    }, [title]);

    useEffect(() => {
        documentHasBeenLoaded();
    }, [documentHasBeenLoaded]);

    return (<>
        <HeadingCheck/>
        <div className={"page-container"}>
            {children}
        </div>
    </>);
};

/**
 * This is for development purposes. It displays an error message when a page is missing an h1 element or has
 * one that is configured incorrectly. We will see the error if we create a page that has this issue.
 */
const HeadingCheck = () => {
    const [error, setError] = useState("");

    useEffect(() => {
        const heading1 = document.querySelector("h1");

        if (heading1 === null) {
            setError("This page is missing an h1 element - please add one with `tabindex=-1`");
        } else {
            const missingTabIndex = !(heading1.hasAttribute("tabindex"));
            const wrongTabindex = heading1.tabIndex !== -1;

            if (missingTabIndex || wrongTabindex) {
                setError("This page's h1 element has a bad `tabindex` - please specify `tabindex=-1`");
            }
        }
    }, []);

    return (<>
        {error && process.env.NODE_ENV !== "production" && <ErrorMessageNotification message={error}/>}
    </>);
};