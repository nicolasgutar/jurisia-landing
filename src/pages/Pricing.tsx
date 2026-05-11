import { motion } from 'motion/react';
import { ShieldIcon, AccountBalance, EditNote, Bolt, VerifiedUser, Group, CloudDone, Visibility } from '@/src/components/Icons';
import SEO from '@/src/components/SEO';

export default function Pricing() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <SEO
        title="Precios | Legisia"
        description="Legisia es gratuito para todos los abogados colombianos en su fase de co-creación. Acceso ágil a la justicia mediante inteligencia artificial especializada en derecho colombiano."
        canonical="https://legisia.co/precios"
      />

      {/* Hero Section */}
      <header className="text-center mb-24">
        <span className="font-sans text-xs uppercase tracking-[0.4em] text-primary/80 mb-6 block">Estructura de Costos</span>
        <h1 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tighter text-on-surface leading-[1.1]">
          El acceso a la justicia <br/> debe ser <span style={{ background: 'linear-gradient(135deg, #ffffff 0%, #a8bad4 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>ágil</span>.
        </h1>
      </header>

      {/* Main Pricing Logic: Single Prominent Card Asymmetric Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Context & Vision Column */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-12">
          <div className="space-y-6">
            <h2 className="font-headline text-3xl font-bold text-white">Co-creando el futuro del derecho</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Actualmente, <span className="text-white font-medium">Legisia</span> es gratuito para todos los abogados colombianos. Estamos en fase de co-creación y valoramos tu feedback para construir la herramienta definitiva.
            </p>
          </div>
          <div className="p-8 bg-black border border-white/10 rounded-xl relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">
              <Visibility className="w-[10rem] h-[10rem]" />
            </div>
            <h3 className="font-sans text-xs uppercase tracking-widest text-primary/80 mb-4">Visión de Futuro</h3>
            <p className="text-on-surface-variant leading-relaxed italic text-sm">
              "En el futuro, introduciremos planes premium con funcionalidades avanzadas, pero nuestro compromiso con el acceso a la base legal colombiana siempre se mantendrá firme."
            </p>
          </div>
        </div>

        {/* The Hero Pricing Card */}
        <div className="lg:col-span-7">
          <div className="relative h-full">
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full -z-10"></div>
            <div className="glass-panel border border-white/10 p-10 md:p-14 h-full rounded-2xl flex flex-col justify-between shadow-2xl relative">
              <div>
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <h4 className="font-headline text-4xl font-bold text-white mb-2">Acceso Gratuito Ilimitado</h4>
                    <p className="text-primary/90 font-medium tracking-wide text-sm">Fase de Lanzamiento & Beta Abierta</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest">Vigente</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-12">
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <ShieldIcon className="text-primary w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm mb-1">Zero Data Retention</p>
                        <p className="text-xs text-on-surface-variant leading-relaxed">Tus consultas son privadas y no se almacenan en nuestros servidores.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <AccountBalance className="text-primary w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm mb-1">Altas Cortes Indexadas</p>
                        <p className="text-xs text-on-surface-variant leading-relaxed">Acceso completo a Constitucional, Suprema y Consejo de Estado.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <EditNote className="text-primary w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm mb-1">Redacción de Documentos</p>
                        <p className="text-xs text-on-surface-variant leading-relaxed">Borradores automáticos basados en jurisprudencia vigente.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <Bolt className="text-primary w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm mb-1">Velocidad Neuronal</p>
                        <p className="text-xs text-on-surface-variant leading-relaxed">Resultados analíticos en segundos, optimizando tu tiempo.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-10 border-t border-white/5">
                <a href="https://app.legisia.co" target="_blank" rel="noopener noreferrer" className="block w-full metallic-gradient text-black py-5 rounded-xl font-bold text-lg text-center hover:brightness-110 active:scale-[0.99] transition-all duration-300 shadow-xl shadow-primary/10">
                  Comenzar Ahora Gratis
                </a>
                <p className="text-center text-on-surface-variant text-[10px] mt-6 uppercase tracking-[0.2em] opacity-50">
                  Sin tarjeta de crédito • Registro inmediato • Legisia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Anchor: Comparison Table Simulation (Editorial Style) */}
      <section className="mt-32 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div className="p-12 border-r border-white/5">
            <VerifiedUser className="text-primary mb-6 w-8 h-8" />
            <h5 className="font-headline text-lg font-bold mb-4 text-white">Seguridad Jurídica</h5>
            <p className="text-on-surface-variant text-sm leading-relaxed">Validación cruzada de fuentes oficiales del sistema judicial colombiano para máxima precisión.</p>
          </div>
          <div className="p-12 border-r border-white/5 bg-white/[0.02]">
            <Group className="text-primary mb-6 w-8 h-8" />
            <h5 className="font-headline text-lg font-bold mb-4 text-white">Comunidad Activa</h5>
            <p className="text-on-surface-variant text-sm leading-relaxed">Únete a una red de profesionales legales que colaboran con sus sugerencias para el desarrollo.</p>
          </div>
          <div className="p-12">
            <CloudDone className="text-primary mb-6 w-8 h-8" />
            <h5 className="font-headline text-lg font-bold mb-4 text-white">Disponibilidad 24/7</h5>
            <p className="text-on-surface-variant text-sm leading-relaxed">Infraestructura robusta de clase empresarial para garantizar acceso cuando más se necesita.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
