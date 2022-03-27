import React from "react";
import "./App.css";
import { AlertProvider } from "../contexts/AlertContext";
import { Layout } from "./Layout";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <AlertProvider>
            <BrowserRouter>
                <Layout/>
            </BrowserRouter>
        </AlertProvider>
    );
}

export default App;