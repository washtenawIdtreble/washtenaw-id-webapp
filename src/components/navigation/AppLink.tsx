import React from "react";
import { Link, LinkProps, PathMatch, useMatch, useResolvedPath } from "react-router-dom";
import { CurrentPageIcon } from "./CurrentPageIcon";

export const AppLink = (props: Omit<LinkProps, "reloadDocument">) => {
    const resolved = useResolvedPath(props.to);
    const match: PathMatch | null = useMatch({
        path: resolved.pathname,
        end: true,
    });

    return (<>
        <Link
            {...props}
            className={match ? `${props.className} matched-link` : props.className}
            aria-current={match ? "page" : undefined}
        >{match && <CurrentPageIcon/>}{props.children}</Link>
    </>);
};
