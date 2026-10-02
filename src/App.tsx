/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import UseCases from './pages/UseCases';
import DataPolicy from './pages/DataPolicy';
import Terms from './pages/Terms';
import Mcp from './pages/Mcp';
import NotFound from './pages/NotFound';
import { motion, AnimatePresence } from 'motion/react';

// Router-agnostic app tree: the browser wraps it in <BrowserRouter> (below),
// the build-time prerender (src/entry-server.tsx) in <StaticRouter>.
export function AppShell() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/precios" element={<PageWrapper><Pricing /></PageWrapper>} />
            <Route path="/casos-de-uso" element={<PageWrapper><UseCases /></PageWrapper>} />
            <Route path="/politica-de-tratamiento-de-datos" element={<PageWrapper><DataPolicy /></PageWrapper>} />
            <Route path="/politica-de-privacidad" element={<PageWrapper><DataPolicy /></PageWrapper>} />
            <Route path="/privacidad" element={<PageWrapper><DataPolicy /></PageWrapper>} />
            <Route path="/terminos-y-condiciones" element={<PageWrapper><Terms /></PageWrapper>} />
            <Route path="/terminos" element={<PageWrapper><Terms /></PageWrapper>} />
            <Route path="/tyc" element={<PageWrapper><Terms /></PageWrapper>} />
            <Route path="/mcp" element={<PageWrapper><Mcp /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppShell />
      </Router>
    </HelmetProvider>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default App;
