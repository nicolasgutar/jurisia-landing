import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, FileCheck, MessageSquare, Search, Quote } from 'lucide-react';
import SEO from '@/src/components/SEO';
import DeltaBackground from '@/src/components/DeltaBackground';
import { APP_URL, Eyebrow, PageHeader, SpotlightCard } from '@/src/components/Brand';
import { trackMetaCustomEvent } from '@/src/lib/meta-pixel';
import { cn } from '@/src/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

// Each mockup animates once when its card scrolls into view. Children use
// the "hidden"/"visible" variants propagated from the wrapper below.
function MockFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className={cn('relative overflow-hidden rounded-xl border border-white/[0.08] bg-black/60 p-5', className)}
    >
      {children}
    </motion.div>
  );
}

const results = [
  { ref: 'AC700-2023', court: 'Corte Suprema de Justicia', rel: 96 },
  { ref: 'SC4047-2021', court: 'Corte Suprema de Justicia', rel: 91 },
  { ref: 'AC330-2025', court: 'Corte Suprema de Justicia', rel: 84 },
];

function LitigioMock() {
  return (
    <MockFrame>
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70">
        <Search className="h-3.5 w-3.5 text-white/40" />
        Exequátur de sentencia de divorcio extranjera
      </div>
      <div className="space-y-2">
        {results.map((r, i) => (
          <motion.div
            key={r.ref}
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.15, duration: 0.5, ease: EASE } } }}
            className="flex items-center gap-4 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
          >
            <div className="min-w-0 flex-1">
              <p className="font-mono text-xs text-white">{r.ref}</p>
              <p className="truncate text-[11px] text-white/40">{r.court}</p>
            </div>
            <div className="h-1 w-20 overflow-hidden rounded-full bg-white/10">
              <motion.div
                variants={{ hidden: { width: 0 }, visible: { width: `${r.rel}%`, transition: { delay: 0.5 + i * 0.15, duration: 0.9, ease: EASE } } }}
                className="h-full rounded-full bg-accent"
              />
            </div>
            <span className="w-8 text-right font-mono text-[10px] text-white/50">{r.rel}%</span>
          </motion.div>
        ))}
      </div>
    </MockFrame>
  );
}

const tutelaSections = [
  { label: 'Hechos', lines: [100, 92, 64] },
  { label: 'Derechos vulnerados', lines: [88, 45] },
  { label: 'Pretensiones', lines: [96, 70] },
];

function TutelaMock() {
  let line = 0;
  return (
    <MockFrame className="bg-white/[0.03]">
      <p className="mb-4 text-center font-serif text-sm tracking-[0.2em] text-white/80">ACCIÓN DE TUTELA</p>
      <div className="space-y-4">
        {tutelaSections.map((s) => (
          <div key={s.label} className="space-y-1.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">{s.label}</p>
            {s.lines.map((w) => {
              const delay = 0.2 + line++ * 0.18;
              return (
                <motion.div
                  key={`${s.label}-${w}`}
                  variants={{ hidden: { width: 0 }, visible: { width: `${w}%`, transition: { delay, duration: 0.5, ease: 'easeOut' } } }}
                  className="h-1.5 rounded-full bg-white/20"
                />
              );
            })}
          </div>
        ))}
      </div>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="mt-2 inline-block h-3 w-px bg-white"
      />
    </MockFrame>
  );
}

const clauses = [
  { ref: 'Cl. 4.2', name: 'Penalidad por terminación', risk: 'Bajo' },
  { ref: 'Cl. 7.1', name: 'Exclusividad territorial', risk: 'Medio' },
  { ref: 'Cl. 9.3', name: 'Renuncia a reclamaciones', risk: 'Alto' },
  { ref: 'Cl. 12', name: 'Cláusula compromisoria', risk: 'Bajo' },
];

function DiligenceMock() {
  return (
    <MockFrame>
      {/* Scan line sweeping the contract */}
      <motion.div
        aria-hidden="true"
        animate={{ top: ['0%', '100%'] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'linear' }}
        className="pointer-events-none absolute inset-x-0 h-12 -translate-y-full bg-gradient-to-b from-transparent to-white/[0.06]"
      />
      <div className="space-y-2">
        {clauses.map((c, i) => (
          <motion.div
            key={c.ref}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.15 + i * 0.12 } } }}
            className={cn(
              'flex items-center gap-3 rounded-lg border px-3 py-2.5',
              c.risk === 'Alto' ? 'border-white/30 bg-white/[0.07]' : 'border-white/[0.06] bg-white/[0.02]',
            )}
          >
            <span className="w-12 font-mono text-[10px] text-white/40">{c.ref}</span>
            <span className="flex-1 truncate text-xs text-white/80">{c.name}</span>
            <span
              className={cn(
                'rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em]',
                c.risk === 'Alto' ? 'animate-pulse bg-accent text-black' : c.risk === 'Medio' ? 'border border-white/30 text-white/70' : 'text-white/35',
              )}
            >
              {c.risk}
            </span>
          </motion.div>
        ))}
      </div>
    </MockFrame>
  );
}

function PeticionMock() {
  return (
    <MockFrame className="space-y-3">
      <motion.div
        variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.5 } } }}
        className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-white px-4 py-2.5 text-xs text-black"
      >
        ¿Cuál es el plazo para responder un derecho de petición?
      </motion.div>
      <motion.div
        variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.5 } } }}
        className="max-w-[90%] space-y-2 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.04] px-4 py-3 text-xs leading-relaxed text-white/80"
      >
        <p>Por regla general, <span className="text-white">15 días hábiles</span> siguientes a su recepción.</p>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-2 py-1 font-mono text-[10px] text-white/60">
          <FileCheck className="h-3 w-3" />
          Ley 1755 de 2015 · Art. 14
        </span>
      </motion.div>
    </MockFrame>
  );
}

const cases = [
  {
    title: 'Preparación de litigio',
    desc: 'Búsqueda de precedentes exactos en minutos. Identifique líneas jurisprudenciales sólidas que respalden su teoría del caso con precisión quirúrgica.',
    mock: <LitigioMock />,
    span: 'md:col-span-7',
  },
  {
    title: 'Redacción de tutelas',
    desc: 'Generación de borradores estructurados con base en jurisprudencia vigente. Automatice la protección de derechos fundamentales con argumentos actualizados.',
    mock: <TutelaMock />,
    span: 'md:col-span-5',
  },
  {
    title: 'Debida diligencia',
    desc: 'Análisis masivo de contratos para identificar riesgos y cláusulas abusivas. Mitigue contingencias legales mediante escaneo profundo impulsado por IA.',
    mock: <DiligenceMock />,
    span: 'md:col-span-5',
  },
  {
    title: 'Derecho de petición',
    desc: 'Respuesta rápida y fundamentada a solicitudes ciudadanas. Gestione volúmenes altos de peticiones manteniendo la calidad jurídica en cada respuesta.',
    mock: <PeticionMock />,
    span: 'md:col-span-7',
  },
];

const steps = [
  { icon: MessageSquare, title: 'Pregunta', desc: 'Describa su caso o consulta en lenguaje natural, como se lo contaría a un colega.' },
  { icon: Search, title: 'Búsqueda en fuentes', desc: 'Enndor busca en jurisprudencia y normatividad colombiana indexada de fuentes oficiales.' },
  { icon: Quote, title: 'Respuesta citada', desc: 'Recibe una respuesta fundamentada, con la providencia original a un clic para verificarla.' },
];

export default function UseCases() {
  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Casos de Uso"
        description="Descubra cómo Enndor transforma la práctica jurídica en Colombia: preparación de litigios, redacción de tutelas, due diligence contractual y derechos de petición con IA especializada."
        canonical="https://enndor.ai/casos-de-uso"
      />

      <PageHeader
        eyebrow="Aplicación práctica"
        title={
          <>
            Enndor en el <span className="font-serif italic tracking-normal text-white/55">ejercicio profesional.</span>
          </>
        }
        subtitle="Transformamos la complejidad jurídica en eficiencia operativa a través de IA especializada en el marco legal colombiano."
      />

      {/* Cómo funciona */}
      <section className="px-6 pb-28 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Eyebrow index="01">Cómo funciona</Eyebrow>
            <p className="max-w-md font-light text-on-surface-variant">
              <span className="text-white">No más alucinaciones:</span> toda la base legal es verificable directamente, en cada respuesta.
            </p>
          </div>
          <div className="relative grid gap-10 md:grid-cols-3 md:gap-6">
            {/* Connector line drawing across the three steps */}
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.4, ease: EASE }}
              className="absolute left-6 right-6 top-6 hidden h-px origin-left bg-gradient-to-r from-accent via-white/20 to-white/5 md:block"
            />
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.25, ease: EASE }}
                className="relative space-y-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black text-white">
                  <s.icon className="h-5 w-5" />
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">Paso 0{i + 1}</p>
                <h3 className="font-headline text-xl font-medium tracking-tight">{s.title}</h3>
                <p className="max-w-xs font-light leading-relaxed text-on-surface-variant">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos */}
      <section className="border-t border-white/[0.06] px-6 py-28 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 space-y-6">
            <Eyebrow index="02">Casos de uso</Eyebrow>
            <h2 className="font-headline text-4xl font-medium tracking-[-0.03em] lg:text-5xl">
              Del expediente a la respuesta, <span className="font-serif italic tracking-normal text-white/55">en minutos.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            {cases.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: EASE }}
                className={c.span}
              >
                <SpotlightCard className="h-full">
                  <div className="flex h-full flex-col p-6 md:p-8">
                    {c.mock}
                    <div className="mt-8 flex items-baseline gap-4">
                      <span className="font-mono text-xs text-white/30">0{i + 1}</span>
                      <h3 className="font-headline text-2xl font-medium tracking-tight">{c.title}</h3>
                    </div>
                    <p className="mt-3 max-w-lg font-light leading-relaxed text-on-surface-variant">{c.desc}</p>
                    <a
                      href={APP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackMetaCustomEvent('ClickToApp')}
                      className="mt-auto flex items-center gap-2 pt-8 font-mono text-xs uppercase tracking-[0.2em] text-white/60 transition-all duration-300 hover:gap-3 hover:text-white"
                    >
                      Comenzar Ahora <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sugerencias */}
      <section className="relative overflow-hidden px-6 py-36 md:px-8">
        <DeltaBackground className="opacity-50" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,color-mix(in_srgb,var(--color-black)_30%,transparent)_0%,var(--color-black)_85%)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative z-10 mx-auto flex max-w-3xl flex-col items-center space-y-8 text-center"
        >
          <Eyebrow>Co-creación digital</Eyebrow>
          <h2 className="font-headline text-4xl font-medium leading-[1.05] tracking-[-0.04em] md:text-6xl">
            ¿Su necesidad <span className="font-serif italic tracking-normal text-white/60">no está listada?</span>
          </h2>
          <p className="max-w-xl text-lg font-light text-white/70">
            Estamos expandiendo las fronteras del derecho digital. Cuéntenos qué proceso desea automatizar.
          </p>
          <a
            href="https://forms.gle/CnXoCz6VGoy9aM5f7"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-medium text-black transition-all duration-300 hover:bg-white/85"
          >
            Proponer Solución
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
