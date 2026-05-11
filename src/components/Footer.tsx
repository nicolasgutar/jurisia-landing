import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black w-full py-12 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-6">
        <img
          alt="Legisia Footer Logo"
          className="h-10 w-auto opacity-100"
          src="/legisia-logo.png"
        />
        <div className="flex gap-8 text-primary-container font-headline text-xs uppercase tracking-widest text-center">
          <Link to="/" className="hover:text-primary transition-colors">Jurisprudencia</Link>
          <Link to="/precios" className="hover:text-primary transition-colors">Precios</Link>
          <Link to="/casos-de-uso" className="hover:text-primary transition-colors">Casos de Uso</Link>
        </div>
        <div className="text-primary-container/60 font-headline text-[10px] uppercase tracking-widest text-center">
          © 2024 Legisia. Digital Authority.
        </div>
      </div>
    </footer>
  );
}
