import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ChildrenProps } from "../utilities/children-props";
import { DocumentStateContext } from "../contexts/DocumentStateContext";
import { useFocusHashOrMainHeading } from "../hooks/focus/useFocusHashOrMainHeading";
import "./Pages.css";
import { HeadingCheck } from "../components/dev-only/HeadingCheck";
import { LoadingContextProvider } from "../contexts/LoadingContext";
import { ENVIRONMENT_VARIABLES, getIntegerEnvVar } from "../utilities/environment-variables";
import { useLiveRegionText } from "../hooks/useLiveRegionText";

type PageProps = {
    title: string
} & ChildrenProps;

export const DOCUMENT_TITLE_SUFFIX = " - Washtenaw ID Project";

export const Page = ({ title, children }: PageProps) => {
    const { documentHasBeenLoaded } = useContext(DocumentStateContext);
    const [loadingIndicatorNeeded, setLoadingIndicatorNeeded] = useState(false);
    const loadingTimerRef: React.MutableRefObject<NodeJS.Timeout | undefined> = useRef();
    const loadingTimerExpiredRef = useRef(false);
    const [liveRegionText, setLiveRegionText] = useLiveRegionText("");
    // const liveRegionTimerRef: React.MutableRefObject<NodeJS.Timeout | undefined> = useRef();

    const setIsLoading = useCallback((isLoading: boolean) => {
        if (isLoading) {
            loadingTimerRef.current = setTimeout(() => {
                setLiveRegionText("loading");
                setLoadingIndicatorNeeded(true);
                loadingTimerExpiredRef.current = true;
            }, getIntegerEnvVar(ENVIRONMENT_VARIABLES.REACT_APP_LOADING_TIMEOUT));
        } else {
            if (loadingTimerRef.current) {
                clearTimeout(loadingTimerRef.current);
            }
            if (loadingTimerExpiredRef.current) {
                setLiveRegionText("finished loading");
                setLoadingIndicatorNeeded(false);
            }
        }
    }, [setLiveRegionText]);

    useEffect(() => {
        return () => {
            if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
        };
    }, []);

    useFocusHashOrMainHeading(loadingIndicatorNeeded);

    useEffect(() => {
        document.title = `${title}${DOCUMENT_TITLE_SUFFIX}`;
    }, [title]);

    useEffect(() => {
        documentHasBeenLoaded();
    }, [documentHasBeenLoaded]);

    return (<>
        <HeadingCheck/>
        <LoadingContextProvider setIsLoading={setIsLoading}>
            <div className={"page-container"}>
                {children}
                {loadingIndicatorNeeded && <span className={"loading"}>Loading...</span>}
                <div aria-live={"polite"} data-testid={"page-live-region"}
                     className={"visually-hidden"}>{liveRegionText}</div>
            </div>
        </LoadingContextProvider>
    </>);
};
