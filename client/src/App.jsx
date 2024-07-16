import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Report from "./pages/Report";
import SendData from "./pages/SendData";
import Footer from "./components/Footer";
import Visualise from "./pages/Visualise";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/send-data" element={<SendData />} />
        <Route path="/visualise" element={<Visualise />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
