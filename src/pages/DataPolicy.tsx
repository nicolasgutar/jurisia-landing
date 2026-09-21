import { Download, ExternalLink, Shield } from 'lucide-react';
import SEO from '@/src/components/SEO';

export default function DataPolicy() {
  const pdfUrl = '/politica-de-tratamiento-de-datos.pdf';

  return (
    <div className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen flex flex-col">
      <SEO
        title="Política de Tratamiento de Datos Personales | LegisIA"
        description="Política de Privacidad y Tratamiento de Datos Personales de LegisIA (PVGA S.A.S.). Documento normativo oficial."
        canonical="https://legisia.co/politica-de-tratamiento-de-datos"
      />

      {/* Header */}
      <header className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-primary text-xs uppercase tracking-widest font-headline mb-3">
            <Shield className="w-4 h-4" />
            <span>Documento Legal Oficial</span>
          </div>
          <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-2">
            Política de Privacidad y Tratamiento de Datos
          </h1>
          <p className="text-xs text-on-surface-variant font-sans">
            PVGA S.A.S. (NIT 902.029.993-7) • Versión 2.0 (16 de septiembre de 2026)
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <a
            href={pdfUrl}
            download="260916 Legisia - PPTDP.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-white text-black hover:bg-slate-200 transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            Descargar PDF
          </a>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold bg-white/5 text-white hover:bg-white/10 border border-white/10 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Abrir en pestaña
          </a>
        </div>
      </header>

      {/* PDF Viewer Container */}
      <div className="flex-1 w-full bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl min-h-[750px] lg:min-h-[900px] flex flex-col">
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=0`}
          title="Política de Privacidad y Tratamiento de Datos Personales — Legisia"
          className="w-full flex-1 min-h-[750px] lg:min-h-[900px] border-0"
        />
      </div>
    </div>
  );
}
