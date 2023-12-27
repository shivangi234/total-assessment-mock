import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard/Dashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  )
}

export default App