import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ExcelContextProvider } from "./context/ExcelContext";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Router>
      <ExcelContextProvider>
        <App />
      </ExcelContextProvider>
    </Router>
  </React.StrictMode>
);
