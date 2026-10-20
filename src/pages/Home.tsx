import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, Shield, FileCheck, Gavel, FileText, Lock, Plus, Lightbulb } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import SEO from '@/src/components/SEO';
import StatsSection from '@/src/components/StatsSection';
import DeltaBackground from '@/src/components/DeltaBackground';
import { APP_URL, Eyebrow, FormerName, Marquee, SpotlightCard, Wordmark } from '@/src/components/Brand';
import { trackMetaCustomEvent } from '@/src/lib/meta-pixel';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://enndor.ai/#organization',
      name: 'Enndor',
      alternateName: ['Enndor.ai', 'LegisIA'],
      legalName: 'PVGA S.A.S.',
      url: 'https://enndor.ai',
      logo: 'https://enndor.ai/brand/enndor-icon-512.png',
      // Keep in sync with socialLinks in src/components/Footer.tsx
      sameAs: [
        'https://www.linkedin.com/company/legisia/',
        'https://www.instagram.com/enndor.ai/',
        'https://www.tiktok.com/@legisiaco',
        'https://www.facebook.com/legisiaco',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://enndor.ai/#website',
      name: 'Enndor',
      alternateName: 'LegisIA',
      url: 'https://enndor.ai',
      inLanguage: 'es-CO',
      publisher: { '@id': 'https://enndor.ai/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Enndor',
      alternateName: 'LegisIA',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Legal',
      operatingSystem: 'Web',
      description:
        'Asistente jurídico con inteligencia artificial especializado en derecho colombiano. Búsqueda semántica en jurisprudencia de la Corte Constitucional, Corte Suprema de Justicia, Consejo de Estado, SIC y Comunidad Andina, y en normatividad (leyes, decretos, códigos, DIAN, CREG y superintendencias). Zero Data Retention.',
      url: APP_URL,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'COP' },
      inLanguage: 'es-CO',
      publisher: { '@id': 'https://enndor.ai/#organization' },
    },
  ],
};

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Keep in sync with App/lib/legal-filters.ts's LEGAL_CATEGORIES — that's
// the canonical list of what's actually indexed and searchable.
const knowledgeBase = {
  jurisprudencia: [
    'Corte Constitucional',
    'Corte Suprema',
    'Consejo de Estado',
    'SIC',
    'Comunidad Andina',
  ],
  normatividad: [
    'Leyes',
    'Decretos',
    'Código Civil',
    'Código Penal',
    'Código de Comercio',
    'Código General del Proceso',
    'CPACA',
    'DIAN',
    'Mintransporte',
    'Supersociedades',
    'CREG',
    'Superservicios',
  ],
};

// What the rename does and doesn't touch, for existing users.
const unchanged = [
  {
    title: 'Tu cuenta',
    desc: 'Entras con el mismo correo y la misma contraseña. No tienes que registrarte de nuevo.',
  },
  {
    title: 'Tus conversaciones',
    desc: 'Todo tu historial, documentos y borradores siguen exactamente donde los dejaste.',
  },
  {
    title: 'La base de conocimiento',
    desc: 'La misma jurisprudencia y normatividad colombiana, sincronizada mes a mes con las fuentes oficiales.',
  },
  {
    title: 'Tu privacidad',
    desc: 'Zero Data Retention: tus datos nunca se usan para entrenar modelos de IA.',
  },
];

// Testimonials predate the rename, so their original wording ("Legisia") is
// kept and rendered struck through next to the new name.
const testimonials = [
  {
    quote: (
      <>
        Definitivamente <FormerName /> Enndor es lo máximo, me ha servido demasiado. Tengo unos casos que no son de mi especialidad y la he usado demasiado para orientarme. Todos los abogados de mi oficina la usan. Funciona super bien, da más de lo que uno pide.
      </>
    ),
    role: 'Socio, Firma de Abogados',
  },
  {
    quote: (
      <>
        <FormerName /> Enndor es demasiado útil para el negocio de Energía. Aunque yo no sea abogado, cada que llega un proyecto o una nueva oportunidad es muy bueno para revisar bajo qué figura legal se puede implementar.
      </>
    ),
    role: 'CFO, empresa de Energía',
  },
  {
    quote: (
      <>
        Desde que conozco esta IA, he venido usándola. Me ha ido muy bien. Hasta ahora es la mejor herramienta para la búsqueda de jurisprudencia. En la oficina somos 30 abogados y nos ha gustado.
      </>
    ),
    role: 'Asociado, Firma de abogados',
  },
];

const capabilities = [
  {
    title: 'Búsqueda avanzada en Altas Cortes',
    desc: 'Acceso semántico profundo a la jurisprudencia de la Corte Constitucional, Corte Suprema y Consejo de Estado. Encuentre el precedente exacto en segundos.',
    icon: Gavel,
    link: 'Explorar Jurisprudencia',
  },
  {
    title: 'Redacción de Tutelas y Contratos',
    desc: 'Editor asistido por IA para generar borradores técnicos de acciones de tutela, contratos comerciales y demandas, alineados con los estándares procesales.',
    icon: FileText,
    link: 'Ver Editor',
  },
  {
    title: 'Análisis Privado de Expedientes',
    desc: 'Suba PDFs y DOCX con total tranquilidad. Identificación automática de riesgos contractuales y líneas jurisprudenciales aplicables a su caso concreto.',
    icon: Lock,
    link: 'Analizar Expediente',
  },
];

const NEW_NAME = 'enndor.ai'.split('');

function RenameHero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black">
      <DeltaBackground />
      {/* Darken the edges so the type always has contrast over the texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_50%_52%,color-mix(in_srgb,var(--color-black)_45%,transparent)_0%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-white/70 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Nuevo nombre · Misma misión
        </motion.div>

        <h1 className="flex flex-col items-center">
          {/* Old name: fades in, gets struck through, then recedes */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: [0, 1, 1, 0.45], y: 0 }}
            transition={{ duration: 2, delay: 0.4, times: [0, 0.25, 0.6, 1], ease: 'easeOut' }}
            className="relative font-serif text-4xl italic text-white/80 sm:text-6xl"
          >
            Legisia
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 1.2, ease: EASE }}
              className="absolute left-[-8%] right-[-8%] top-[54%] h-[2px] origin-left bg-accent"
            />
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="my-4 font-mono text-[11px] uppercase tracking-[0.35em] text-white/50 sm:my-6"
          >
            ahora es
          </motion.span>

          <span className="sr-only">Enndor.ai</span>
          <span
            aria-hidden="true"
            className="flex font-headline text-[22vw] font-medium leading-[0.85] tracking-[-0.06em] text-white sm:text-[10rem] lg:text-[13rem]"
          >
            {NEW_NAME.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: '0.35em', filter: 'blur(16px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 2 + i * 0.07, ease: EASE }}
                className={cn('inline-block', i >= 6 && 'text-accent')}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.9, ease: EASE }}
          className="mt-10 flex max-w-xl flex-col items-center gap-8"
        >
          <p className="text-base font-light leading-relaxed text-white/70 sm:text-lg">
            La inteligencia artificial que evoluciona el derecho colombiano tiene un nuevo nombre. Misma precisión, mismas fuentes, misma cuenta.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMetaCustomEvent('ClickToApp')}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:bg-white/85"
            >
              Comenzar Ahora
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#cambio"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-black/20 px-7 py-3.5 text-sm text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              ¿Qué cambia?
            </a>
          </div>
        </motion.div>
      </div>

      {/* Editorial corner details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.4 }}
        className="relative z-10 mx-auto hidden w-full max-w-7xl items-end justify-between px-8 pb-8 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 md:flex"
      >
        <span>4.7110° N, 74.0721° W</span>
        <a href="#cambio" className="flex items-center gap-2 transition-colors hover:text-white">
          Desplázate
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ArrowDown className="h-3 w-3" />
          </motion.span>
        </a>
        <span>Derecho colombiano · IA</span>
      </motion.div>
    </section>
  );
}

function RenameExplainer() {
  return (
    <section id="cambio" className="relative scroll-mt-16 bg-black px-6 py-28 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="space-y-8 lg:col-span-5"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow index="01">El cambio</Eyebrow>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-headline text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Cambia el nombre.
            <br />
            <span className="font-serif text-white/50 italic tracking-normal">Nada más.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-md text-lg font-light leading-relaxed text-on-surface-variant">
            <FormerName>LegisIA</FormerName> ahora es <Wordmark className="font-normal" />. Es el mismo producto y el mismo equipo, con un nombre más corto y pensado para todo lo que viene.
          </motion.p>
        </motion.div>

        <div className="lg:col-span-7">
          {unchanged.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
              className="group grid grid-cols-[3rem_1fr] gap-4 border-t border-white/[0.08] py-8 last:border-b sm:grid-cols-[4rem_1fr_auto]"
            >
              <span className="font-mono text-xs text-white/30">0{i + 1}</span>
              <div className="space-y-2">
                <h3 className="font-headline text-xl font-medium tracking-tight sm:text-2xl">{item.title}</h3>
                <p className="max-w-md font-light leading-relaxed text-on-surface-variant">{item.desc}</p>
              </div>
              <span className="hidden self-start rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 transition-colors group-hover:border-accent group-hover:text-accent sm:block">
                Sin cambios
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollWord({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

// Privacy statement that lights up word by word as it scrolls through view.
function ScrollRevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className="font-headline text-3xl font-light leading-[1.2] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
      {words.map((word, i) => (
        <span key={i}>
          <ScrollWord word={word} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        </span>
      ))}
    </p>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'jurisprudencia' | 'normatividad'>('jurisprudencia');

  return (
    <div className="relative">
      <SEO
        title="Enndor (antes LegisIA) | Inteligencia Artificial para el Derecho Colombiano"
        description="LegisIA ahora es Enndor. IA especializada en jurisprudencia y legislación colombiana — Corte Constitucional, Corte Suprema, Consejo de Estado. Zero Data Retention garantizado."
        canonical="https://enndor.ai/"
        jsonLd={jsonLd}
      />

      <RenameHero />

      <RenameExplainer />

      <StatsSection />

      {/* No más Alucinaciones */}
      <section className="relative overflow-hidden bg-black px-6 py-28 md:px-8 md:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="order-2 lg:order-1 lg:col-span-7"
          >
            <div className="relative">
              <div className="absolute -inset-8 rounded-[2rem] bg-white/[0.04] blur-3xl" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                <img
                  alt="Enndor respondiendo una consulta jurídica con la sentencia original de la Corte Suprema abierta al lado"
                  className="h-auto w-full grayscale-[0.3]"
                  src="/images/product-screenshot.webp"
                  width={1440}
                  height={658}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="order-1 space-y-6 lg:order-2 lg:col-span-5"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow index="02">Veracidad garantizada</Eyebrow>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-headline text-4xl font-medium leading-[1.05] tracking-[-0.03em] lg:text-5xl">
              No más <span className="font-serif italic tracking-normal text-white/60">alucinaciones.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg font-light leading-relaxed text-on-surface-variant">
              Elimine el riesgo de información errónea. En Enndor, cada respuesta se fundamenta en jurisprudencia y normativa vigente directamente verificable dentro de la plataforma. Acceda a las fuentes originales sincronizadas con las Altas Cortes.
            </motion.p>
            <motion.div variants={fadeUp} className="flex items-center gap-4 pt-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5">
                <FileCheck className="h-5 w-5 text-white" />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-on-surface">Fuentes 100% reales</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Capacidades */}
      <section className="bg-black px-6 py-28 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-6">
              <Eyebrow index="03">Capacidades del sistema</Eyebrow>
              <h2 className="font-headline text-4xl font-medium tracking-[-0.03em] lg:text-5xl">
                Potencia legal de vanguardia
              </h2>
            </div>
            <p className="max-w-sm font-light text-on-surface-variant">
              Un asistente entrenado para pensar como abogado colombiano, con las fuentes siempre a la vista.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              >
                <SpotlightCard className="h-full">
                  <a href={APP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackMetaCustomEvent('ClickToApp')} className="flex h-full flex-col justify-between p-8">
                    <div>
                      <div className="mb-10 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white">
                          <cap.icon className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-xs text-white/25">0{i + 1}</span>
                      </div>
                      <h3 className="mb-4 font-headline text-xl font-medium tracking-tight">{cap.title}</h3>
                      <p className="font-light leading-relaxed text-on-surface-variant">{cap.desc}</p>
                    </div>
                    <div className="mt-10 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/60 transition-all duration-300 group-hover:gap-3 group-hover:text-white">
                      {cap.link} <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </a>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacidad */}
      <section className="border-y border-white/[0.06] bg-black px-6 py-32 md:px-8 md:py-44">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="flex flex-wrap items-center gap-4">
            <Eyebrow index="04">Infraestructura de privacidad</Eyebrow>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
              <Shield className="h-3 w-3" />
              Zero Data Retention activo
            </span>
          </div>
          <ScrollRevealText text="En Enndor garantizamos que sus datos nunca son utilizados para entrenar modelos de IA y no se almacenan de forma permanente. La confidencialidad de su información profesional es total." />
        </div>
      </section>

      {/* Base de conocimiento */}
      <section className="overflow-hidden bg-black py-28">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <div className="mb-12 space-y-6 text-center">
            <Eyebrow index="05" className="justify-center">Base de conocimiento</Eyebrow>
            <h2 className="font-headline text-3xl font-medium tracking-[-0.03em] lg:text-4xl">Actualizada mes a mes con las fuentes oficiales</h2>
          </div>

          <div className="mb-10 flex justify-center">
            <div className="relative inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
              {(['jurisprudencia', 'normatividad'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'relative rounded-full px-6 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300',
                    activeTab === tab ? 'text-black' : 'text-on-surface-variant hover:text-white',
                  )}
                >
                  {activeTab === tab && (
                    <motion.span layoutId="kb-tab" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />
                  )}
                  <span className="relative">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {knowledgeBase[activeTab].map((source, i) => (
              <motion.div
                key={`${activeTab}-${source}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center transition-colors hover:border-white/25"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-on-surface">{source}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-6 text-center">
            {/* Served by the App through nginx, not an SPA route: plain <a> */}
            <a href="/jurisprudencia" className="group inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white">
              Explora las sentencias más consultadas, resumidas y con texto completo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
              Nuevas fuentes próximamente <Plus className="h-3 w-3" />
            </div>
          </div>
        </div>

        <Marquee
          className="mt-20 border-y border-white/[0.06] py-5"
          items={[...knowledgeBase.jurisprudencia, ...knowledgeBase.normatividad]}
        />
      </section>

      {/* Testimonios */}
      <section className="bg-black px-6 py-28 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 space-y-6">
            <Eyebrow index="06">Lo que dicen nuestros usuarios</Eyebrow>
            <h2 className="font-headline text-4xl font-medium tracking-[-0.03em] lg:text-5xl">
              Confianza real de <span className="font-serif italic tracking-normal text-white/60">profesionales.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              >
                <SpotlightCard className="h-full">
                  <figure className="flex h-full flex-col p-8">
                    <span className="mb-6 font-serif text-6xl leading-none text-white/20">“</span>
                    <blockquote className="flex-1 font-light leading-relaxed text-on-surface-variant">{t.quote}</blockquote>
                    <figcaption className="mt-8 border-t border-white/[0.08] pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface">
                      {t.role}
                    </figcaption>
                  </figure>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback */}
      <section className="bg-black px-6 py-24 md:px-8">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <h2 className="font-headline text-3xl font-medium tracking-[-0.03em]">Ayúdanos a transformar el derecho</h2>
          <p className="font-light text-on-surface-variant">Enndor crece con la retroalimentación de los abogados colombianos. ¿Hay alguna función específica que necesites para tu práctica diaria?</p>
          <a href="https://forms.gle/CnXoCz6VGoy9aM5f7" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-3.5 text-sm text-on-surface transition-all duration-300 hover:border-white hover:bg-white hover:text-black">
            Sugerir Funcionalidad
            <Lightbulb className="h-4 w-4 transition-transform group-hover:rotate-12" />
          </a>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden bg-black px-6 py-36 md:px-8">
        <DeltaBackground className="opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,color-mix(in_srgb,var(--color-black)_30%,transparent)_0%,var(--color-black)_85%)]" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="relative z-10 mx-auto max-w-4xl space-y-10 text-center"
        >
          <motion.h2 variants={fadeUp} className="font-headline text-5xl font-medium leading-[1] tracking-[-0.04em] lg:text-7xl">
            Únete a la nueva era
            <br />
            <span className="font-serif italic tracking-normal text-white/60">del derecho.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg font-light text-white/70">
            Deje de perder horas en tareas mecánicas. Permita que Enndor potencie su despacho hoy mismo, con seguridad garantizada.
          </motion.p>
          <motion.div variants={fadeUp}>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMetaCustomEvent('ClickToApp')}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-9 py-4 text-base font-medium text-black transition-all duration-300 hover:bg-white/85"
            >
              Comenzar Ahora
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
