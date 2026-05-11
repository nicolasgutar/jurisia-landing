import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, CheckCircle, FileCheck, Gavel, FileText, Lock, Plus, Lightbulb } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import SEO from '@/src/components/SEO';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Legisia',
  applicationCategory: 'LegalApplication',
  operatingSystem: 'Web',
  description: 'Plataforma de inteligencia artificial especializada en jurisprudencia y legislación colombiana. Acceso semántico a la Corte Constitucional, Corte Suprema y Consejo de Estado con Zero Data Retention.',
  url: 'https://legisia.co',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'COP' },
  inLanguage: 'es-CO',
  publisher: {
    '@type': 'Organization',
    name: 'Legisia',
    url: 'https://legisia.co',
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'jurisprudencia' | 'normatividad'>('jurisprudencia');

  const knowledgeBase = {
    jurisprudencia: ["Corte Constitucional", "Corte Suprema", "Consejo de Estado", "SIC"],
    normatividad: ["Leyes", "Decretos", "Código Civil", "Código Penal", "Código de Comercio"]
  };

  return (
    <div className="relative">
      <SEO
        title="Legisia | Inteligencia Artificial para el Derecho Colombiano"
        description="Precisión jurídica sin precedentes. IA especializada en jurisprudencia y legislación colombiana — Corte Constitucional, Corte Suprema, Consejo de Estado. Zero Data Retention garantizado."
        canonical="https://legisia.co/"
        jsonLd={jsonLd}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
        </div>
        
        <div className="max-w-screen-xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              La autoridad en Derecho Colombiano
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-extrabold font-headline leading-tight tracking-tight text-on-surface">
              Legisia: La inteligencia artificial que <span className="text-primary">evoluciona el derecho.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-on-surface-variant max-w-xl font-light leading-relaxed">
              Precisión jurídica sin precedentes. Potenciado por modelos de lenguaje de última generación optimizados exclusivamente para la legislación y jurisprudencia colombiana.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="https://app.legisia.co" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-10 py-4 text-lg font-bold rounded-lg flex items-center justify-center gap-2 group hover:bg-on-surface transition-all duration-200">
                Comenzar Ahora
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </a>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-center gap-3 pt-4">
              <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-3 h-3" />
                ZERO DATA RETENTION (ZDR) ACTIVE
              </div>
              <span className="text-xs text-on-surface-variant/60 italic font-light">Tus datos nunca son usados para entrenar modelos.</span>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center items-center h-[400px] bg-black"
          >
            <img
              alt="Legal AI Icon"
              className="w-64 h-auto object-contain opacity-90"
              src="/logo.png"
            />
          </motion.div>
        </div>
      </section>

      {/* No más Alucinaciones Section */}
      <section className="py-24 px-8 bg-black relative border-y border-white/5">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-white/5">
              <img
                alt="Jurisprudencia verificable"
                className="w-full h-auto"
                src="/product-screenshot.png"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 order-1 md:order-2"
          >
            <div className="inline-flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase">
              <CheckCircle className="w-4 h-4" />
              Veracidad Garantizada
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold font-headline leading-tight">No más Alucinaciones</h2>
            <p className="text-xl text-on-surface-variant font-light leading-relaxed">
              Elimine el riesgo de información errónea. En Legisia, cada respuesta se fundamenta en jurisprudencia y normativa vigente directamente verificable dentro de la plataforma. Acceda a las fuentes originales sincronizadas en tiempo real con las Altas Cortes.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
                <FileCheck className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-semibold text-on-surface uppercase tracking-wide">Fuentes 100% Reales</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capacidades Section */}
      <section className="py-24 px-8 bg-black">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-20 text-center space-y-4">
            <h2 className="text-sm font-bold text-primary tracking-[0.3em] uppercase">Capacidades del Sistema</h2>
            <h3 className="text-4xl font-headline font-extrabold">Potencia Legal de Vanguardia</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Búsqueda avanzada en Altas Cortes",
                desc: "Acceso semántico profundo a la jurisprudencia de la Corte Constitucional, Corte Suprema y Consejo de Estado. Encuentre el precedente exacto en segundos.",
                icon: Gavel,
                link: "Explorar Jurisprudencia"
              },
              {
                title: "Redacción de Tutelas y Contratos",
                desc: "Editor asistido por IA para generar borradores técnicos de acciones de tutela, contratos comerciales y demandas, alineados con los estándares procesales.",
                icon: FileText,
                link: "Ver Editor"
              },
              {
                title: "Análisis Privado de Expedientes",
                desc: "Suba PDFs y DOCX con total tranquilidad. Identificación automática de riesgos contractuales y líneas jurisprudenciales aplicables a su caso concreto.",
                icon: Lock,
                link: "Analizar Expediente"
              }
            ].map((cap, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-primary/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                    <cap.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold font-headline mb-4">{cap.title}</h4>
                  <p className="text-on-surface-variant font-light leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform cursor-pointer">
                  {cap.link} <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacidad Section */}
      <section className="py-24 px-8 bg-black border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-sm font-bold text-primary tracking-[0.3em] uppercase">Infraestructura de Privacidad</h2>
            <h3 className="text-4xl font-headline font-extrabold leading-tight">Privacidad Absoluta: Zero Data Retention</h3>
          </div>
          <div className="space-y-8">
            <p className="text-xl text-on-surface leading-relaxed text-center font-light">
              En Legisia, garantizamos que sus datos nunca son utilizados para entrenar modelos de IA y no se almacenan de forma permanente, asegurando la total confidencialidad de su información profesional.
            </p>
          </div>
        </div>
      </section>

      {/* Knowledge Base Section */}
      <section className="py-24 bg-black border-b border-white/5">
        <div className="max-w-4xl mx-auto px-8">
          <div className="mb-12 text-center">
            <h3 className="text-2xl font-bold font-headline mb-4">Base de Conocimiento Actualizada</h3>
            <p className="text-on-surface-variant font-light">Sincronización mes a mes con las fuentes oficiales</p>
          </div>
          
          <div className="flex justify-center border-b border-white/10 mb-8">
            <button 
              onClick={() => setActiveTab('jurisprudencia')}
              className={cn(
                "px-8 py-3 font-headline font-bold text-sm uppercase tracking-widest transition-all border-b-2",
                activeTab === 'jurisprudencia' ? "text-on-surface border-primary" : "text-on-surface-variant border-transparent hover:text-on-surface"
              )}
            >
              Jurisprudencia
            </button>
            <button 
              onClick={() => setActiveTab('normatividad')}
              className={cn(
                "px-8 py-3 font-headline font-bold text-sm uppercase tracking-widest transition-all border-b-2",
                activeTab === 'normatividad' ? "text-on-surface border-primary" : "text-on-surface-variant border-transparent hover:text-on-surface"
              )}
            >
              Normatividad
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {knowledgeBase[activeTab].map((source, i) => (
              <motion.div 
                key={source}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-white/5 p-4 rounded-lg border border-white/10 text-center"
              >
                <p className="text-xs font-bold text-on-surface uppercase tracking-tight">{source}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-bold uppercase tracking-widest">
              Nuevas fuentes próximamente <Plus className="w-3 h-3" />
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-24 px-8 bg-black">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h3 className="text-3xl font-headline font-extrabold">Ayúdanos a transformar el derecho</h3>
          <p className="text-on-surface-variant font-light">Legisia crece con la retroalimentación de los abogados colombianos. ¿Hay alguna función específica que necesites para tu práctica diaria?</p>
          <a href="https://forms.gle/CnXoCz6VGoy9aM5f7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-on-surface px-8 py-4 text-lg font-bold rounded-lg hover:bg-primary hover:text-on-primary transition-all duration-300 group">
            Sugerir Funcionalidad
            <Lightbulb className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </a>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-8 relative overflow-hidden bg-black">
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <h2 className="text-5xl lg:text-7xl font-extrabold font-headline leading-tight">Únete a la nueva era del derecho.</h2>
          <p className="text-xl text-on-surface-variant font-light max-w-2xl mx-auto">
            Deje de perder horas en tareas mecánicas. Permita que la tecnología de Legisia potencie su despacho hoy mismo con seguridad garantizada.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="https://app.legisia.co" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-12 py-5 text-xl font-bold rounded-lg shadow-xl hover:bg-on-surface transition-all duration-200">
              Comenzar Ahora
            </a>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[140px] rounded-full pointer-events-none"></div>
      </section>
    </div>
  );
}

// Map Lucide icons to the names used in the component
function ArrowForward(props: any) { return <ArrowRight {...props} /> }
