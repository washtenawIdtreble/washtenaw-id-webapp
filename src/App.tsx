import React from "react";
import "./App.css";
import Categories from "./pages/categories/Categories";
import { Workspace } from "@deque/cauldron-react";

function App() {
    return (
        <Workspace>
            <Categories/>
        </Workspace>
    );
}

export default App;