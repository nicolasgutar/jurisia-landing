import { Link } from 'react-router-dom';
import SEO from '@/src/components/SEO';

export default function NotFound() {
  return (
    <div className="pt-40 pb-32 px-8 min-h-screen flex flex-col items-center text-center">
      <SEO
        title="Página no encontrada"
        description="La página que buscas no existe o fue movida."
        noindex
      />
      <p className="text-sm font-bold text-primary tracking-[0.3em] uppercase mb-6">Error 404</p>
      <h1 className="text-4xl lg:text-6xl font-extrabold font-headline mb-6">Página no encontrada</h1>
      <p className="text-on-surface-variant font-light max-w-md mb-10">
        La página que buscas no existe o fue movida.
      </p>
      <Link to="/" className="bg-white text-black px-8 py-4 font-bold rounded-lg hover:bg-on-surface transition-all duration-200">
        Volver al inicio
      </Link>
    </div>
  );
}
