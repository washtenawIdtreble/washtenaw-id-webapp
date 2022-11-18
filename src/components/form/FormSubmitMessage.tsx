import React, { ForwardedRef, forwardRef, RefObject } from "react";
import "./Form.css";

type FormSubmitMessageProps = {
    clearMessage: () => void;
    ref: RefObject<HTMLSpanElement>;
    message: string;
    className: string;
}

export const FormSubmitMessage = forwardRef(
    ({ message, clearMessage, className }: FormSubmitMessageProps,
     ref: ForwardedRef<HTMLSpanElement>) => {
        return (
            <span tabIndex={-1} onBlur={clearMessage} ref={ref} className={`message ${className}`}>
            {message}
        </span>
        );
    });