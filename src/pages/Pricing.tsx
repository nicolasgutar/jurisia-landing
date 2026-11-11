import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, MessageSquare, Plug, Plus, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/src/components/SEO';
import { APP_URL, Eyebrow, PageHeader, SpotlightCard } from '@/src/components/Brand';
import { trackMetaCustomEvent } from '@/src/lib/meta-pixel';
import { cn } from '@/src/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

// Plans, prices and limits mirror the App's /planes page — keep in sync with
// App/lib/billing/plans.ts (prices) and App/lib/ai/entitlements.ts (limits).
const PLANS_URL = `${APP_URL}/planes`;

type Plan = {
  id: 'free' | 'mcp' | 'full';
  name: string;
  tagline: string;
  price: string;
  description: string;
  features: string[];
  footnote?: ReactNode;
  cta: string;
  href: string;
  icon: ReactNode;
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Gratis',
    tagline: 'Para empezar',
    price: '$0',
    description: 'Para conocer Enndor y resolver consultas puntuales.',
    features: [
      '10 mensajes a la semana en Enndor',
      'Todas las funciones: búsqueda de jurisprudencia y normatividad, redacción de documentos y análisis de archivos',
      'Consulta las sentencias y normas en el visor (sin descargarlas)',
      'Prueba Enndor dentro de Claude o ChatGPT: 20 consultas a la semana',
    ],
    cta: 'Crear cuenta gratis',
    href: APP_URL,
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    id: 'mcp',
    name: 'Enndor MCP',
    tagline: 'Enndor dentro de Claude o ChatGPT',
    price: '$29.900',
    description:
      'Para quienes ya trabajan con Claude o ChatGPT y quieren que respondan con la jurisprudencia y las normas colombianas de Enndor, citando la fuente.',
    features: [
      'Consultas ilimitadas desde Claude, ChatGPT y otros asistentes compatibles',
      '30 mensajes a la semana en la app de Enndor',
      'Descarga de sentencias y normas',
      'Todas las funciones de la app',
    ],
    footnote: (
      <>
        Usas tu propia cuenta de Claude o ChatGPT; según el asistente, los conectores pueden requerir un plan pago de ese
        servicio.{' '}
        <Link to="/mcp" className="text-accent hover:underline">
          ¿Cómo funciona?
        </Link>
      </>
    ),
    cta: 'Elegir MCP',
    href: PLANS_URL,
    icon: <Plug className="h-5 w-5" />,
  },
  {
    id: 'full',
    name: 'Enndor Full',
    tagline: 'Todo Enndor, sin límites',
    price: '$63.900',
    description: 'Para quienes usan Enndor todos los días. Sin contar mensajes ni pensar en límites.',
    features: [
      'Mensajes ilimitados en la app de Enndor',
      'Consultas ilimitadas desde Claude, ChatGPT y otros asistentes',
      'Todas las funciones: búsqueda avanzada, redacción de documentos y análisis de archivos',
      'Descarga de sentencias y normas',
      'No necesitas saber qué es MCP: todo funciona directamente en Enndor',
    ],
    cta: 'Elegir Full',
    href: PLANS_URL,
    icon: <Sparkles className="h-5 w-5" />,
    highlight: true,
  },
];

const comparisonTiers = ['Invitado', 'Gratis', 'MCP', 'Full'] as const;

const comparison: { label: string; values: [string, string, string, string] }[] = [
  { label: 'Precio', values: ['Gratis', 'Gratis', '$29.900/mes', '$63.900/mes'] },
  { label: 'Mensajes en Enndor a la semana', values: ['3', '10', '30', 'Ilimitados'] },
  { label: 'Consultas desde Claude o ChatGPT a la semana', values: ['No incluido', '20', 'Ilimitadas', 'Ilimitadas'] },
  { label: 'Búsqueda, redacción y análisis de archivos', values: ['✓', '✓', '✓', '✓'] },
  { label: 'Descargar sentencias y normas', values: ['—', '—', '✓', '✓'] },
];

const pillars = [
  { title: 'Zero Data Retention', desc: 'Tus consultas son privadas: no se usan para entrenar modelos de IA ni se almacenan de forma permanente.' },
  { title: 'Fuentes verificables', desc: 'Cada respuesta cita la sentencia o norma original, sincronizada con las fuentes oficiales colombianas.' },
  { title: 'Disponibilidad 24/7', desc: 'Infraestructura de clase empresarial para garantizar acceso cuando más se necesita.' },
];

const faqs = [
  {
    q: '¿Cómo se cobra?',
    a: 'Con Mercado Pago, mensualmente y en pesos colombianos. La suscripción se renueva sola cada mes hasta que la canceles.',
  },
  {
    q: '¿Puedo cancelar cuando quiera?',
    a: 'Sí, desde la página de planes en la app y sin permanencia. Conservas tu plan hasta el final del periodo que ya pagaste y luego pasas al plan Gratis.',
  },
  {
    q: '¿Necesito tarjeta de crédito para el plan Gratis?',
    a: 'No. El registro es inmediato y no te pedimos ningún medio de pago.',
  },
  {
    q: '¿Puedo pasar del plan MCP al Full?',
    a: 'Sí. Al suscribirte a Full cancelamos automáticamente tu plan MCP para que no se te cobren ambos. El mes en curso del plan MCP no se reembolsa de forma proporcional.',
  },
  {
    q: '¿Necesito pagar Claude o ChatGPT?',
    a: 'Solo si quieres usar Enndor desde esos asistentes. Necesitas tu propia cuenta, y según el asistente los conectores pueden requerir uno de sus planes pagos. Si solo usas la app de Enndor, no necesitas nada más.',
  },
  {
    q: '¿Qué pasa si llego al límite de la semana?',
    a: 'Tu cupo se renueva el lunes a la medianoche (hora de Colombia). Si no quieres esperar, mejora tu plan y sigue de inmediato.',
  },
  {
    q: '¿Mis consultas se usan para entrenar modelos?',
    a: 'Nunca. Operamos con Zero Data Retention: tus datos no se usan para entrenar modelos de IA y no se almacenan de forma permanente.',
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

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: EASE }}
      className="relative h-full"
    >
      {plan.highlight && <div className="absolute -inset-6 -z-10 rounded-full bg-white/[0.05] blur-[80px]" />}
      <div
        className={cn(
          'relative flex h-full flex-col rounded-3xl border p-8 backdrop-blur-sm',
          plan.highlight ? 'glow-border border-white/20 bg-white/[0.04]' : 'border-white/10 bg-white/[0.02]'
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white">
            {plan.icon}
          </span>
          {plan.highlight && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Más completo
            </span>
          )}
        </div>

        <h2 className="mt-8 font-headline text-2xl font-medium tracking-tight text-white">{plan.name}</h2>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">{plan.tagline}</p>

        <div className="my-8 flex items-end gap-3">
          <span className="metallic-text font-headline text-6xl font-light leading-none tracking-[-0.05em]">{plan.price}</span>
          <span className="pb-1.5 font-mono text-xs uppercase tracking-[0.2em] text-white/40">COP / mes</span>
        </div>

        <p className="text-sm font-light leading-relaxed text-on-surface-variant">{plan.description}</p>

        <ul className="mt-8 space-y-4">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-black">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="text-sm leading-relaxed text-white/85">{feature}</span>
            </li>
          ))}
        </ul>

        {plan.footnote && <p className="mt-6 text-xs font-light leading-relaxed text-white/45">{plan.footnote}</p>}

        <div className="mt-auto pt-10">
          <a
            href={plan.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackMetaCustomEvent('ClickToApp')}
            className={cn(
              'group flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium transition-all duration-300 active:scale-[0.99]',
              plan.highlight
                ? 'bg-white text-black hover:bg-white/85'
                : 'border border-white/20 text-white hover:border-white/40 hover:bg-white/10'
            )}
          >
            {plan.cta}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Precios"
        description="Planes de Enndor: Gratis, Enndor MCP ($29.900/mes) para usar Enndor dentro de Claude o ChatGPT, y Enndor Full ($63.900/mes) sin límites. IA especializada en jurisprudencia y normatividad colombiana."
        canonical="https://enndor.ai/precios"
      />

      <PageHeader
        eyebrow="Planes y precios"
        title={
          <>
            El acceso a la justicia debe ser <span className="font-serif italic tracking-normal text-white/55">ágil.</span>
          </>
        }
      />

      {/* Planes */}
      <section className="px-6 pb-28 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow index="01" className="mb-12">Elige tu plan</Eyebrow>
          <div className="grid items-stretch gap-6 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
          <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
            Pago mensual con Mercado Pago • Sin permanencia • Cancela cuando quieras
          </p>
        </div>
      </section>

      {/* Comparación */}
      <section className="border-t border-white/[0.06] px-6 py-28 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow index="02" className="mb-6">Compara los planes</Eyebrow>
          <h2 className="mb-12 font-headline text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
            Todo claro, <span className="font-serif italic tracking-normal text-white/55">sin letra pequeña.</span>
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="p-4" />
                  {comparisonTiers.map((tier) => (
                    <th
                      key={tier}
                      className={cn(
                        'p-4 text-center font-mono text-[11px] font-normal uppercase tracking-[0.2em]',
                        tier === 'Full' ? 'text-accent' : 'text-white/60'
                      )}
                    >
                      {tier}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-white/[0.06] last:border-0">
                    <td className="p-4 font-light text-on-surface-variant">{row.label}</td>
                    {row.values.map((value, i) => (
                      <td key={comparisonTiers[i]} className="p-4 text-center tabular-nums text-white/85">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs font-light text-white/40">
            Los límites semanales se renuevan el lunes a la medianoche (hora de Colombia). Invitado es el acceso sin cuenta.
          </p>
        </div>
      </section>

      {/* Pilares */}
      <section className="border-y border-white/[0.06] px-6 py-28 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow index="03" className="mb-12">Incluido en todos los planes</Eyebrow>
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
            <Eyebrow index="04">Preguntas frecuentes</Eyebrow>
            <h2 className="font-headline text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
              Antes de <span className="font-serif italic tracking-normal text-white/55">suscribirte.</span>
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
