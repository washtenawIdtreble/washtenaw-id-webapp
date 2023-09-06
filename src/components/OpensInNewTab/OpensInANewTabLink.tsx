import React from "react";
import { OpensInNewTabIcon, OpensInNewTabIconColor } from "./OpensInNewTabIcon";
import "./OpensInANewTab.css";

type NewTabLinkProps = Omit<React.HTMLProps<HTMLAnchorElement>, "target" | "rel"> & { color?: OpensInNewTabIconColor };

export const OPENS_IN_A_NEW_TAB = "opens in a new tab";

export const OpensInANewTabLink = ({ children, className, color = "#0000ee", ...props }: NewTabLinkProps) => {
    return (<>
        <a target={"_blank"} rel={"noreferrer"}
           className={`opens-in-new-tab-link ${className ?? ""}`} {...props}>{children}
            <OpensInNewTabIcon color={color}/></a>
    </>);
};
