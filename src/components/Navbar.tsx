import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Jurisprudencia', href: '/' },
    { name: 'Precios', href: '/precios' },
    { name: 'Casos de Uso', href: '/casos-de-uso' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <img
            alt="JurisIA Logo"
            className="h-6 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/ADBb0ui_EGOarMXhOoAtr4PyOd5paI-EZcqjHAbgHlL34G-yl73E2nOMoU_uc_VAsTm2H3aYdDHZA2xFYVFDO7TyKpikaE-75Br2MSptsRNFU_mopAeGjClOnpJPifNXzlBwG9VgfN12bZilg1xRCS_Fo18OT8sC0v2h0QLP54Fqky_cwsrwI0kazrWMHx1Vff8NPkIyJZpnP8-LUYOqBHePy2-vHy1fChDWEP4E_GzJ_VBDE1ypypob7O1mgxAkXumZug6h1vgM8P-WBg"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors duration-300",
                location.pathname === link.href
                  ? "text-white font-semibold border-b border-white/50 pb-1"
                  : "text-on-surface-variant hover:text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="https://chat.jurisia.app" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-5 py-2 rounded-lg font-bold text-xs hover:bg-on-surface transition-all duration-200">
            Comenzar Ahora
          </a>
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-white/5 bg-black/95"
          >
            <div className="flex flex-col px-8 py-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "text-sm font-medium py-3 border-b border-white/5 last:border-0 transition-colors duration-300",
                    location.pathname === link.href
                      ? "text-white font-semibold"
                      : "text-on-surface-variant hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
