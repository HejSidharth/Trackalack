import React, { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import AddApplication from "./pages/AddApplication";
import Scroll from "./pages/Scroll";
import { Toaster } from "react-hot-toast";
import InternshipDetail from "./pages/InternshipDetail";
import { ThemeProvider } from "./context/ThemeContext";
import Privacy from "./pages/Privacy";
import { SignedIn } from "@clerk/clerk-react";
import ClassDashboard from "./pages/class/class.creation";
import ClassDetails from "./pages/class/class.page";

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "black");
    localStorage.setItem("theme", "black");
  });
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

    <div className="hero-pattern">
      <BrowserRouter>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scroll" element={<AddApplication />} />
          <Route path="/add" element={<Scroll />} />
          <Route path="/internship/:intId" element={<InternshipDetail/>} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="test" element={<ClassDashboard />} />
          <Route path="/class/:intId" element={<ClassDetails/>} />

        </Routes>
      </BrowserRouter>
      </div>
      </ThemeProvider>
  );
}
