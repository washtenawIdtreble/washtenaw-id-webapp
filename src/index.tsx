import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { mockWorker } from "./mock-server/mock-worker";

if (process.env.NODE_ENV === 'development') {
    mockWorker.start().catch(e => console.error("Mock Worker failed to start:", e));
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);