import type { SVGProps } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Facebook } from 'lucide-react';

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

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/legisia/', Icon: Linkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/legisiaco/', Icon: Instagram },
  { name: 'TikTok', href: 'https://www.tiktok.com/@legisiaco', Icon: TikTok },
  { name: 'Facebook', href: 'https://www.facebook.com/legisiaco', Icon: Facebook },
];

export default function Footer() {
  return (
    <footer className="bg-black w-full py-12 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-6">
        <div className="flex items-center gap-3">
          <img
            alt="Legisia Footer Logo"
            className="h-10 w-10 rounded-full object-cover"
            src="/legisia-icon.jpg"
          />
          <span className="font-headline font-extrabold text-xl tracking-tight text-white">LegisIA</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-on-surface-variant font-headline text-xs uppercase tracking-widest text-center">
          <Link to="/" className="hover:text-primary transition-colors">Jurisprudencia</Link>
          <Link to="/precios" className="hover:text-primary transition-colors">Precios</Link>
          <Link to="/casos-de-uso" className="hover:text-primary transition-colors">Casos de Uso</Link>
          <Link to="/politica-de-tratamiento-de-datos" className="hover:text-primary transition-colors">Política de Tratamiento de Datos</Link>
        </div>
        <div className="flex gap-6">
          {socialLinks.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
        <div className="text-on-surface-variant/60 font-headline text-[10px] uppercase tracking-widest text-center">
          © {new Date().getFullYear()} Legisia • PVGA S.A.S. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
