import React, { ForwardedRef, forwardRef, RefObject } from "react";
import "./UserMessageNotification.css";

type UserMessageNotificationProps = {
    clearMessage: () => void;
    ref: RefObject<HTMLSpanElement>;
    message: string;
    className: string;
}

export const UserMessageNotification = forwardRef(
    ({ message, clearMessage, className }: UserMessageNotificationProps,
     ref: ForwardedRef<HTMLSpanElement>) => {
        return (
            <span tabIndex={-1} onBlur={clearMessage} ref={ref} className={`user-message ${className}`}>
            {message}
        </span>
        );
    });