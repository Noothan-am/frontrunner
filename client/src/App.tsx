import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
// import Chart from "./components/Chart";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {/* <Chart /> */}
    </>
  );
}

export default App;
