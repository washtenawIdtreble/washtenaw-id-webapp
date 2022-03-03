import React from "react";
import "./App.css";
import Categories from "./pages/categories/Categories";
import { Workspace } from "@deque/cauldron-react";
import { AlertProvider } from "./contexts/AlertContext";

function App() {
    return (
        <AlertProvider>
            <Workspace>
                <Categories/>
            </Workspace>
        </AlertProvider>
    );
}

export default App;