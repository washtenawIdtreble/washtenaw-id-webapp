import React from "react";
import "./App.css";
import { Layout } from "./Layout";
import { BrowserRouter } from "react-router-dom";
import { Providers } from "./Providers";

function App() {
    return (
        <Providers>
            <BrowserRouter>
                <Layout/>
            </BrowserRouter>
        </Providers>
    );
}

export default App;