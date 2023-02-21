import React from "react";
import "./App.css";
import { Layout } from "./Layout";
import { BrowserRouter } from "react-router-dom";
import { DocumentStateProvider } from "../contexts/DocumentStateContext";

function App() {
    return (
        <BrowserRouter>
            <DocumentStateProvider>
                <Layout/>
            </DocumentStateProvider>
        </BrowserRouter>
    );
}

export default App;