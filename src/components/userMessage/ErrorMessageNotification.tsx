import React, { useEffect, useRef } from "react";
import { UserMessageNotification } from "./UserMessageNotification";
import { useFocusElement } from "../../hooks/useFocusElement";

type MessageProp = {
    message: string;
}

export const ErrorMessageNotification = ({message}: MessageProp) => {
    const messageElement = useRef(null);
    const focus = useFocusElement();

    useEffect(() => {
        focus(messageElement);
    }, [focus])

    return (
        <UserMessageNotification ref={messageElement} message={message} className={"error"} clearMessage={() => {}}/>
    );
};