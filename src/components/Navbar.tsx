import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { trackMetaCustomEvent } from '@/src/lib/meta-pixel';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { APP_URL, Wordmark } from '@/src/components/Brand';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Jurisprudencia', href: '/' },
    { name: 'Precios', href: '/precios' },
    { name: 'Casos de Uso', href: '/casos-de-uso' },
    // Served by the App through nginx (not a route in this SPA), so it needs
    // a full page load: rendered as <a>, not react-router's <Link>.
    { name: 'Blog', href: '/blog', external: true },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full border-b transition-all duration-500',
        scrolled || mobileOpen
          ? 'border-white/[0.06] bg-black/60 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link to="/" className="flex items-center" aria-label="Enndor, inicio">
          <Wordmark withMark className="text-xl" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const className = cn(
              'relative text-sm transition-colors duration-300',
              location.pathname === link.href ? 'text-white' : 'text-on-surface-variant hover:text-white',
            );
            const content = (
              <>
                {link.name}
                {location.pathname === link.href && (
                  <motion.span layoutId="nav-active" className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent" />
                )}
              </>
            );
            return link.external ? (
              <a key={link.name} href={link.href} className={className}>{content}</a>
            ) : (
              <Link key={link.name} to={link.href} className={className}>{content}</Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackMetaCustomEvent('ClickToApp')}
            className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-all duration-300 hover:bg-white/85"
          >
            Comenzar Ahora
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          {/* Hamburger — mobile only */}
          <button
            className="p-1 text-white md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            className="overflow-hidden border-t border-white/5 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => {
                const className = cn(
                  'border-b border-white/5 py-3 text-sm transition-colors duration-300 last:border-0',
                  location.pathname === link.href ? 'text-white' : 'text-on-surface-variant hover:text-white',
                );
                return link.external ? (
                  <a key={link.name} href={link.href} className={className}>{link.name}</a>
                ) : (
                  <Link key={link.name} to={link.href} onClick={() => setMobileOpen(false)} className={className}>{link.name}</Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
