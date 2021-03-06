import React from "react";
import { Link, LinkProps, PathMatch, useMatch, useResolvedPath } from "react-router-dom";

export const RefreshingLink = (props: Omit<LinkProps, "reloadDocument">) => {
    const resolved = useResolvedPath(props.to);
    const match: PathMatch | null = useMatch({
        path: resolved.pathname,
        end: true,
    });

    return (<Link
        {...props}
        className={match ? `${props.className} matched-link` : props.className}
        aria-current={match ? "page" : undefined}
        data-testid={`refreshing-link-${props.to}`}
        reloadDocument
    />);
};