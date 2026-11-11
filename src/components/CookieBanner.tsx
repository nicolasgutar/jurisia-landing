import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  type CookieConsent,
  clearTrackingCookies,
  onOpenCookieSettings,
  readCookieConsent,
  writeCookieConsent,
} from '@/src/lib/cookie-consent';

// Asks for consent to analytics and advertising cookies (PPTDP art. 22).
// Renders nothing until mounted, so the prerendered HTML never includes it.
export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(readCookieConsent() === null);
    return onOpenCookieSettings(() => setOpen(true));
  }, []);

  const choose = (value: CookieConsent) => {
    const previous = readCookieConsent();
    writeCookieConsent(value);
    setOpen(false);
    if (value === 'all') {
      window.__enndorLoadAnalytics?.();
    } else if (previous === 'all') {
      // Running scripts can't be unloaded: clear their cookies and reload.
      clearTrackingCookies();
      window.location.reload();
    }
  };

  if (!open) return null;

  return (
    <section
      role="dialog"
      aria-label="Preferencias de cookies"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-2xl rounded-2xl border border-white/10 bg-black/90 p-5 text-white shadow-2xl backdrop-blur-md sm:inset-x-6 sm:bottom-6"
    >
      <p className="font-headline text-base font-medium tracking-tight">Usamos cookies</p>
      <p className="mt-2 text-sm font-light leading-relaxed text-on-surface-variant">
        Las necesarias hacen funcionar el sitio. Con tu permiso también usamos cookies de analítica y publicidad para medir
        el uso y nuestras campañas; nunca acceden al contenido de tus consultas.{' '}
        <Link to="/politica-de-tratamiento-de-datos" className="text-white underline underline-offset-2">
          Más información
        </Link>
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => choose('necessary')}
          className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition-colors hover:border-white/40 hover:bg-white/10"
        >
          Solo necesarias
        </button>
        <button
          type="button"
          onClick={() => choose('all')}
          className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white/85"
        >
          Aceptar todas
        </button>
      </div>
    </section>
  );
}
