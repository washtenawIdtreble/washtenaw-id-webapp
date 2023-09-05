import React, { useCallback, useEffect, useRef, useState } from "react";
import { ENVIRONMENT_VARIABLES, getIntegerEnvVar } from "../utilities/environment-variables";

type LiveRegionText = [text: string, setText: (text: string) => void];

export const useLiveRegionText = (initialText: string): LiveRegionText => {
    const [text, setText] = useState(initialText);
    const timerRef: React.MutableRefObject<NodeJS.Timeout | undefined> = useRef();

    const setTextForTimeout = useCallback((text: string) => {
        setText(text);

        timerRef.current = setTimeout(() => {
            setText("");
        }, getIntegerEnvVar(ENVIRONMENT_VARIABLES.REACT_APP_LIVE_REGION_CLEAR_TIMEOUT));
    }, []);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return [text, setTextForTimeout];
};
