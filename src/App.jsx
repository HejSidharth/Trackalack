import React, { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import Posting from "./pages/Posting";
import AddApplication from "./pages/AddApplication";
import Scroll from "./pages/Scroll";
import { Toaster } from "react-hot-toast";

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "black");
    localStorage.setItem("theme", "black");
  });
  return (
    <div className="hero-pattern">
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post" element={<Posting />} />
          <Route path="/scroll" element={<AddApplication />} />
          <Route path="/add" element={<Scroll />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
