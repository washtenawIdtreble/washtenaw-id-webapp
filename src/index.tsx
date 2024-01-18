import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./layout/App";

// Run a fake server with msw in development mode if run with the "fake-data" option
if (process.env.NODE_ENV === "development" && process.env.REACT_APP_API === "fake-data") {
    const { mockWorker, onUnhandledRequest } = require("./mock-server/mock-worker");

    mockWorker.start({ onUnhandledRequest: onUnhandledRequest })
        .catch((e: any) => console.error("Mock Worker failed to start:", e));
}

// run axe-core analysis when running the app in development mode
// https://github.com/dequelabs/axe-core-npm/tree/develop/packages/react
if (process.env.NODE_ENV !== "production") {
    const axe = require("@axe-core/react");
    axe(React, ReactDOM, 1000)
        .catch((e: any) => console.error("axe-core failed to start:", e));
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById("root"),
);
