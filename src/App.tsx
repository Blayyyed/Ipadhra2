import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MapSelect from './pages/MapSelect';
import Finalize from './pages/Finalize';
import Thanks from './pages/Thanks';
import Admin from './pages/Admin';

const App: React.FC = () => (
  <Router>
    <div className="bg-slate-100 min-h-screen">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between">
          <Link to="/" className="font-semibold">HRA Kiosk</Link>
          <Link to="/admin" className="text-sm text-blue-600">Admin</Link>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map/:areaId" element={<MapSelect />} />
          <Route path="/final/:areaId" element={<Finalize />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;