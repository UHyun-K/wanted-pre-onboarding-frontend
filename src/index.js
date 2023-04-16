import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <div className="w-full max-w-xl mx-auto">
            <App />
        </div>
    </React.StrictMode>
);
