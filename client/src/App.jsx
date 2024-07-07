import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Report from "./pages/Report";
import SendData from "./pages/SendData";
import Visualise from "./pages/Visualise";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/report" element={<Report />} />
        <Route path="/send-data" element={<SendData />} />
        <Route path="/visualise" element={<Visualise />} />
      </Routes>
    </>
  );
};

export default App;
