import React, { useEffect } from 'react'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Error from './pages/Error'
import Dashboard from './pages/Dashboard'
import Posting from './pages/Posting'

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "black");
    localStorage.setItem("theme", "black");
  });
  return (
    <div className='hero-pattern'>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post" element={<Posting />} />
      </Routes>
    </BrowserRouter>
    </div>

  )
}
