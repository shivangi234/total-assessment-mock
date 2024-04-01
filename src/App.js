import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard/Dashboard';
import Sync from './Pages/Sync/Sync';
import Manage from "./Pages/Manage/Manage"
import Demo from './Pages/Demo/Demo';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sync" element={<Sync />} />
      <Route path="/manage" element={<Manage />} />
      <Route path="/demo" element={<Demo />} />
      </Routes>
  )
}

export default App