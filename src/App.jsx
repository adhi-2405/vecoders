import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NoiseOverlay from './components/NoiseOverlay';
import ScrollToTop from './components/ScrollToTop';
import useLenis from './hooks/useLenis';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Blog from './pages/Blog';
import Timeline from './pages/Timeline';
import Achievements from './pages/Achievements';
import Register from './pages/Register';

export default function App() {
  useLenis();

  return (
    <div className="app-root">
      <ScrollToTop />
      <NoiseOverlay />
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
