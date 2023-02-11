import React from "react";
import "./App.css";
import { Layout } from "./Layout";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Layout/>
        </BrowserRouter>
    );
}

export default App;