import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import CareHome from './pages/care/CareHome';
import OSHome from './pages/os/OSHome';
import OneHome from './pages/one/OneHome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Dashboard Routes with Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/care" element={<CareHome />} />
          <Route path="/os" element={<OSHome />} />
          <Route path="/one" element={<OneHome />} />
          
          {/* Fallback routes for nested paths in future */}
          <Route path="/care/*" element={<CareHome />} />
          <Route path="/os/*" element={<OSHome />} />
          <Route path="/one/*" element={<OneHome />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;