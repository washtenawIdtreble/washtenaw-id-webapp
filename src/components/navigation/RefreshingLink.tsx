import React from "react";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";

export const RefreshingLink = (props: Omit<LinkProps, "reloadDocument">) => {
    const resolved = useResolvedPath(props.to);
    const match = useMatch({
        path: resolved.pathname,
        end: true,
    });

    return (<Link
        {...props}
        className={match ? `${props.className} matched-link` : props.className}
        reloadDocument
    />);
};