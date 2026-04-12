import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black w-full py-12 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-6">
        <img 
          alt="JurisIA Footer Logo" 
          className="h-8 w-auto opacity-100" 
          src="https://lh3.googleusercontent.com/aida/ADBb0ui_EGOarMXhOoAtr4PyOd5paI-EZcqjHAbgHlL34G-yl73E2nOMoU_uc_VAsTm2H3aYdDHZA2xFYVFDO7TyKpikaE-75Br2MSptsRNFU_mopAeGjClOnpJPifNXzlBwG9VgfN12bZilg1xRCS_Fo18OT8sC0v2h0QLP54Fqky_cwsrwI0kazrWMHx1Vff8NPkIyJZpnP8-LUYOqBHePy2-vHy1fChDWEP4E_GzJ_VBDE1ypypob7O1mgxAkXumZug6h1vgM8P-WBg"
          referrerPolicy="no-referrer"
        />
        <div className="flex gap-8 text-primary-container font-headline text-xs uppercase tracking-widest text-center">
          <Link to="/" className="hover:text-primary transition-colors">Jurisprudencia</Link>
          <Link to="/precios" className="hover:text-primary transition-colors">Precios</Link>
          <Link to="/casos-de-uso" className="hover:text-primary transition-colors">Casos de Uso</Link>
        </div>
        <div className="text-primary-container/60 font-headline text-[10px] uppercase tracking-widest text-center">
          © 2024 JurisIA. Digital Authority.
        </div>
      </div>
    </footer>
  );
}
