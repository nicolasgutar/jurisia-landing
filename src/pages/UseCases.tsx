import { motion } from 'motion/react';
import { GavelIcon, Description, ShieldIcon, ChatBubble, Verified, RocketLaunch, ArrowForward } from '@/src/components/Icons';

export default function UseCases() {
  return (
    <main className="pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-[#000000] min-h-screen">
      {/* Hero Header */}
      <header className="max-w-4xl mb-24">
        <span className="text-primary font-sans uppercase tracking-widest text-xs mb-4 block">Aplicación Práctica</span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface tracking-tight mb-8 font-headline">
          JurisIA en el ejercicio profesional.
        </h1>
        <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed font-sans font-light">
          Transformamos la complejidad jurídica en eficiencia operativa a través de IA especializada en el marco legal colombiano.
        </p>
      </header>

      {/* New: No más Alucinaciones Section */}
      <section className="mb-32">
        <div className="bg-surface-container-low card-border rounded-xl p-8 md:p-12 border-l-4 border-l-primary flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-shrink-0 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Verified className="text-primary w-12 h-12" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4 tracking-tight font-headline">No más Alucinaciones</h2>
            <p className="text-on-surface-variant text-xl leading-relaxed max-w-3xl font-sans font-light">
              Toda la base legal es verificable directamente, garantizando precisión absoluta en cada caso. Nuestra tecnología elimina la incertidumbre de la IA generativa tradicional.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32">
        {/* Case 1: Preparación de Litigio */}
        <div className="md:col-span-7 bg-[#000000] card-border p-8 lg:p-12 flex flex-col justify-between transition-all duration-300 hover:border-primary/30 group rounded-xl">
          <div>
            <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
              <GavelIcon className="text-primary w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold text-on-surface mb-4 font-headline">Preparación de Litigio</h3>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-md font-sans font-light">
              Búsqueda de precedentes exactos en minutos. Identifique líneas jurisprudenciales sólidas que respalden su teoría del caso con precisión quirúrgica.
            </p>
          </div>
          <div className="mt-12 h-48 w-full bg-white/5 rounded overflow-hidden relative">
            <img 
              alt="Digital legal dashboard showing complex networks of precedents" 
              className="w-full h-full object-cover mix-blend-luminosity opacity-40 group-hover:opacity-60 transition-opacity" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBje20xEVz6EwHlHuvzg5wTDZ-KFAVLvM2xFrf1H0dqETATnc2E1G_ZzCURQVio51Qk-jtnosX3w9r16Kx25dUxrF6FsbtEh_tYYDXgEdPEnPHdhdS_tqaV6ksZnR_uwLjaN4Z2ajTdam9o_97-KYtoTa83JMGq0QO2AC_-ArFrHFgISjOwhsNnOkPMHlhRrayRT_e2K2mT9zWc6s5MrCduN844a0FU7sT1wyTxeJXP98mYkR-FJhYrsyOQbIQ5CZYmKQjqLBq_K2qh"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          </div>
        </div>

        {/* Case 2: Redacción de Tutelas */}
        <div className="md:col-span-5 bg-[#000000] card-border p-8 lg:p-10 flex flex-col transition-all duration-300 hover:border-primary/30 group rounded-xl">
          <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
            <Description className="text-primary w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-on-surface mb-4 font-headline">Redacción de Tutelas</h3>
          <p className="text-on-surface-variant leading-relaxed font-sans font-light">
            Generación de borradores estructurados con base en jurisprudencia vigente. Automatice la protección de derechos fundamentales con argumentos actualizados.
          </p>
          <div className="mt-auto pt-8 flex items-center gap-2 text-primary font-medium group cursor-pointer font-sans">
            <span>Comenzar Ahora</span>
            <ArrowForward className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Case 3: Debida Diligencia */}
        <div className="md:col-span-5 bg-[#000000] card-border p-8 lg:p-10 flex flex-col transition-all duration-300 hover:border-primary/30 group rounded-xl">
          <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
            <ShieldIcon className="text-primary w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-on-surface mb-4 font-headline">Debida Diligencia (Due Diligence)</h3>
          <p className="text-on-surface-variant leading-relaxed font-sans font-light">
            Análisis masivo de contratos para identificar riesgos y cláusulas abusivas. Mitigue contingencias legales mediante escaneo profundo impulsado por IA.
          </p>
          <div className="mt-auto pt-8 flex items-center gap-2 text-primary font-medium group cursor-pointer font-sans">
            <span>Comenzar Ahora</span>
            <ArrowForward className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Case 4: Derecho de Petición */}
        <div className="md:col-span-7 bg-[#000000] card-border p-8 lg:p-12 flex flex-col md:flex-row gap-8 items-center transition-all duration-300 hover:border-primary/30 group rounded-xl">
          <div className="flex-1">
            <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors">
              <ChatBubble className="text-primary w-8 h-8" />
            </div>
            <h3 className="text-3xl font-bold text-on-surface mb-4 font-headline">Derecho de Petición</h3>
            <p className="text-on-surface-variant text-lg leading-relaxed font-sans font-light">
              Respuesta rápida y fundamentada a solicitudes ciudadanas. Gestione volúmenes altos de peticiones manteniendo la calidad jurídica en cada respuesta.
            </p>
            <div className="mt-6 flex items-center gap-2 text-primary font-medium group cursor-pointer font-sans">
              <span>Comenzar Ahora</span>
              <ArrowForward className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          <div className="w-full md:w-1/3 aspect-square bg-white/5 rounded-full overflow-hidden relative group-hover:scale-105 transition-transform">
            <img 
              alt="Abstract visualization of digital ink" 
              className="w-full h-full object-cover opacity-50" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJFd4IBjIlpPzxpYi2Va6lYSzzU9dI_L2gCNpxPs1s0HfAkzjrBc-fmdAsrvc0lsEqlF5EKU-DAOvwrn95WiiwYU8q27nwJC-JnukqrrDj8D8-isXFR2Mpvxn8HMXcxZq53bct4IwtCEFjtIYJO2PmyiVBZOvIdFmY8KiaDN3UW0VoxM7uXyp4uytes7hAt9-E1FEihcjd1J6po22ch-DbiDiuziBNKBcUT0ct0gRNJ-SeCGmp4RylgxfdOYJmYZ0y9a4VpHG61_Gt"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>
      </section>

      {/* Feature Request / Suggestion Section */}
      <section className="max-w-5xl mx-auto">
        <div className="p-[1px] rounded-lg bg-gradient-to-b from-primary/20 to-transparent">
          <div className="bg-[#000000] p-12 lg:p-20 text-center flex flex-col items-center rounded-lg">
            <span className="text-primary font-sans text-sm uppercase tracking-[0.2em] mb-6">Co-creación Digital</span>
            <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-8 max-w-2xl font-headline">¿Su necesidad no está listada?</h2>
            <p className="text-on-surface-variant text-xl mb-12 max-w-xl font-sans font-light">
              Estamos expandiendo las fronteras del derecho digital. Cuéntenos qué proceso desea automatizar.
            </p>
            <a className="metallic-cta px-12 py-5 text-on-primary font-bold text-lg rounded tracking-tight hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-xl shadow-primary/10 font-headline" href="#">
              Proponer Solución
              <RocketLaunch className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
