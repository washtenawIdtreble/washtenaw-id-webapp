import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StartOptions } from "msw";

if (process.env.NODE_ENV === "development" && process.env.REACT_APP_API === "fake-data") {
    const { mockWorker, onUnhandledRequest } = require("./mock-server/mock-worker");
    let options: StartOptions = {
        onUnhandledRequest: onUnhandledRequest,
    };
    mockWorker.start(options).catch((e: any) => console.error("Mock Worker failed to start:", e));
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById("root"),
);