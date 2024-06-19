import React from "react";
import "../Pages.css";
import "./TableIssues.css";
import { MainHeading } from "../../components/MainHeading";
import "@reach/dialog/styles.css";

export const ACCESSIBILITY_PAGE_HEADING = "Table Issue";
export const ACCESSIBILITY_PAGE_IDENTIFIER = "accessibility-issues";

export const TableIssues = () => {
    setTimeout(() => {
        let node = document.createElement("p");
        node.innerText = "Data table, Artisans, row -90020023372036854775808";
        document.getElementById("live-region")!.appendChild(node);
    }, 2000);
    return (
        <>
            <MainHeading>{ACCESSIBILITY_PAGE_HEADING}</MainHeading>
            <table>
                <caption>Artisans <span className={"visually-hidden"}>"Data table, Artisans, row -90020023372036854775808"</span>
                </caption>
                <tbody>
                    <tr>
                        <th scope={"col"}>Name</th>
                        <th scope={"col"}>Project</th>
                    </tr>
                    <tr>
                        <th scope={"row"}>Ryan</th>
                        <td>BT</td>
                    </tr>
                    <tr>
                        <th scope={"row"}>Tansley</th>
                        <td>Arrive</td>
                    </tr>
                    <tr>
                        <th scope={"row"}>Maya</th>
                        <td>Lucra</td>
                    </tr>
                </tbody>
            </table>
            <div aria-live={"assertive"} id={"live-region"} className={"visually-hidden"}></div>
        </>
    );
};
