import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, Plus } from 'lucide-react';
import SEO from '@/src/components/SEO';
import { APP_URL, Eyebrow, PageHeader, SpotlightCard } from '@/src/components/Brand';
import { trackMetaCustomEvent } from '@/src/lib/meta-pixel';
import { cn } from '@/src/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

const included = [
  { title: 'Zero Data Retention', desc: 'Tus consultas son privadas y no se almacenan en nuestros servidores.' },
  { title: 'Altas Cortes indexadas', desc: 'Acceso completo a Constitucional, Suprema y Consejo de Estado.' },
  { title: 'Redacción de documentos', desc: 'Borradores automáticos basados en jurisprudencia vigente.' },
  { title: 'Velocidad neuronal', desc: 'Resultados analíticos en segundos, optimizando tu tiempo.' },
];

const pillars = [
  { title: 'Seguridad jurídica', desc: 'Validación cruzada de fuentes oficiales del sistema judicial colombiano para máxima precisión.' },
  { title: 'Comunidad activa', desc: 'Únete a una red de profesionales legales que colaboran con sus sugerencias para el desarrollo.' },
  { title: 'Disponibilidad 24/7', desc: 'Infraestructura robusta de clase empresarial para garantizar acceso cuando más se necesita.' },
];

const faqs = [
  {
    q: '¿Enndor es realmente gratis?',
    a: 'Sí. Durante la fase de lanzamiento y co-creación, Enndor es gratuito y de acceso ilimitado para todos los abogados colombianos.',
  },
  {
    q: '¿Necesito tarjeta de crédito para registrarme?',
    a: 'No. El registro es inmediato y no te pedimos ningún medio de pago.',
  },
  {
    q: '¿Habrá planes de pago en el futuro?',
    a: 'En el futuro introduciremos planes premium con funcionalidades avanzadas, pero nuestro compromiso con el acceso a la base legal colombiana siempre se mantendrá firme.',
  },
  {
    q: '¿Mis consultas se usan para entrenar modelos?',
    a: 'Nunca. Operamos con Zero Data Retention: tus datos no se usan para entrenar modelos de IA y no se almacenan de forma permanente.',
  },
  {
    q: '¿Qué pasó con LegisIA?',
    a: 'LegisIA ahora se llama Enndor. Es el mismo producto y el mismo equipo: tu cuenta y tus conversaciones siguen exactamente igual.',
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-white/[0.08]">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-white/[0.08]">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className={cn('font-headline text-lg tracking-tight transition-colors sm:text-xl', isOpen ? 'text-white' : 'text-white/70 group-hover:text-white')}>
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70"
              >
                <Plus className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 font-light leading-relaxed text-on-surface-variant">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Precios"
        description="Enndor es gratuito para todos los abogados colombianos en su fase de co-creación. Acceso ágil a la justicia mediante inteligencia artificial especializada en derecho colombiano."
        canonical="https://legisia.co/precios"
      />

      <PageHeader
        eyebrow="Estructura de costos"
        title={
          <>
            El acceso a la justicia debe ser <span className="font-serif italic tracking-normal text-white/55">ágil.</span>
          </>
        }
      />

      {/* Plan */}
      <section className="overflow-hidden px-6 pb-28 md:px-8">
        <div className="mx-auto grid max-w-7xl items-stretch gap-12 lg:grid-cols-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="flex flex-col justify-between gap-12 lg:col-span-5"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }} className="space-y-6">
              <Eyebrow index="01">Co-creación</Eyebrow>
              <h2 className="font-headline text-3xl font-medium tracking-[-0.03em] sm:text-4xl">Co-creando el futuro del derecho</h2>
              <p className="text-lg font-light leading-relaxed text-on-surface-variant">
                Actualmente, <span className="text-white">Enndor</span> es gratuito para todos los abogados colombianos. Estamos en fase de co-creación y valoramos tu feedback para construir la herramienta definitiva.
              </p>
            </motion.div>
            <motion.figure
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
              className="border-l border-white/20 pl-6"
            >
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Visión de futuro</p>
              <blockquote className="font-serif text-2xl italic leading-snug text-white/80 sm:text-3xl">
                “En el futuro introduciremos planes premium con funcionalidades avanzadas, pero nuestro compromiso con el acceso a la base legal colombiana siempre se mantendrá firme.”
              </blockquote>
            </motion.figure>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: EASE }}
            className="lg:col-span-7"
          >
            <div className="relative h-full">
              <div className="absolute -inset-10 -z-10 rounded-full bg-white/[0.05] blur-[100px]" />
              <div className="glow-border relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm md:p-12">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="font-headline text-2xl font-medium tracking-tight text-white sm:text-3xl">Acceso gratuito ilimitado</h2>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">Fase de lanzamiento & beta abierta</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                    Vigente
                  </span>
                </div>

                <div className="my-12 flex items-end gap-3">
                  <span className="metallic-text font-headline text-8xl font-light leading-none tracking-[-0.06em] sm:text-9xl">$0</span>
                  <span className="pb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/40">COP / mes</span>
                </div>

                <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {included.map((item, i) => (
                    <motion.li
                      key={item.title}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: EASE }}
                      className="flex gap-3"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-black">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{item.title}</p>
                        <p className="mt-1 text-sm font-light leading-relaxed text-on-surface-variant">{item.desc}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-auto pt-12">
                  <a
                    href={APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackMetaCustomEvent('ClickToApp')}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-base font-medium text-black transition-all duration-300 hover:bg-white/85 active:scale-[0.99]"
                  >
                    Comenzar Ahora Gratis
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                    Sin tarjeta de crédito • Registro inmediato
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pilares */}
      <section className="border-y border-white/[0.06] px-6 py-28 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow index="02" className="mb-12">Lo que respalda el plan</Eyebrow>
          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              >
                <SpotlightCard className="h-full">
                  <div className="p-8">
                    <span className="font-mono text-xs text-white/30">0{i + 1}</span>
                    <h3 className="mb-3 mt-10 font-headline text-xl font-medium tracking-tight">{p.title}</h3>
                    <p className="font-light leading-relaxed text-on-surface-variant">{p.desc}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-28 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <Eyebrow index="03">Preguntas frecuentes</Eyebrow>
            <h2 className="font-headline text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
              Todo claro, <span className="font-serif italic tracking-normal text-white/55">sin letra pequeña.</span>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <Faq />
          </div>
        </div>
      </section>
    </div>
  );
}
