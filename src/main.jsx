/** @format */

// To get the warning out of the console for futere v7 uprgrades of React Router
if (import.meta.env.MODE === "development") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    // Check for specific warnings related to React Router v7
    if (args[0]?.includes("React Router Future Flag Warning")) {
      return; // Suppress the v7 warning
    }
    originalWarn(...args); // Keep other warnings intact
  };
}

import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./store/Store.js";

import App from "./App.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
