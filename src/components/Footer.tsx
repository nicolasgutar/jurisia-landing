import type { SVGProps } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Facebook } from 'lucide-react';
import { Wordmark } from '@/src/components/Brand';

// lucide-react has no TikTok icon — same outline style as the others
// (glyph from Tabler Icons, MIT).
function TikTok(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
    </svg>
  );
}

// The social handles are still the LegisIA ones until the accounts are renamed.
const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/legisia/', Icon: Linkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/legisiaco/', Icon: Instagram },
  { name: 'TikTok', href: 'https://www.tiktok.com/@legisiaco', Icon: TikTok },
  { name: 'Facebook', href: 'https://www.facebook.com/legisiaco', Icon: Facebook },
];

const linkClass = 'text-sm text-on-surface-variant transition-colors hover:text-white';

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/[0.06] bg-black">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-10 pt-16 md:grid-cols-12 md:px-8">
        <div className="space-y-4 md:col-span-5">
          <Wordmark withMark className="text-2xl" />
          <p className="max-w-xs text-sm font-light leading-relaxed text-on-surface-variant">
            Inteligencia artificial para el derecho colombiano. Antes conocida como LegisIA.
          </p>
          <div className="flex gap-5 pt-2">
            {socialLinks.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-on-surface-variant transition-colors hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-3 md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/30">Producto</p>
          <div className="flex flex-col gap-2">
            <Link to="/" className={linkClass}>Jurisprudencia</Link>
            <Link to="/precios" className={linkClass}>Precios</Link>
            <Link to="/casos-de-uso" className={linkClass}>Casos de Uso</Link>
            <Link to="/mcp" className={linkClass}>Enndor x Claude</Link>
          </div>
        </div>

        <div className="space-y-3 md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/30">Recursos</p>
          <div className="flex flex-col gap-2">
            {/* Served by the App through nginx, not SPA routes: plain <a> */}
            <a href="/blog" className={linkClass}>Blog</a>
            <a href="/jurisprudencia" className={linkClass}>Base de Jurisprudencia</a>
            <Link to="/politica-de-tratamiento-de-datos" className={linkClass}>Política de Tratamiento de Datos</Link>
            <Link to="/terminos-y-condiciones" className={linkClass}>Términos y Condiciones</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 pb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 md:flex-row md:justify-between md:px-8">
        <span>© {new Date().getFullYear()} Enndor • PVGA S.A.S. Todos los derechos reservados.</span>
        <span>Hecho en Colombia</span>
      </div>

      {/* Oversized wordmark bleeding off the bottom edge */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="outline-text -mb-[0.28em] text-center font-headline text-[26vw] font-medium leading-none tracking-[-0.06em]">
          enndor
        </p>
      </div>
    </footer>
  );
}
