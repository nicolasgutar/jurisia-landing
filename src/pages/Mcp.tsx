import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronDown, Copy, FileSearch, KeyRound, Link2, MessageSquareQuote, Search, ShieldCheck } from 'lucide-react';
import SEO from '@/src/components/SEO';
import { Eyebrow, PageHeader, SpotlightCard } from '@/src/components/Brand';
import { cn } from '@/src/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;
const MCP_URL = 'https://app.enndor.ai/mcp';

// What a lawyer can ask for, in their words. The MCP tool behind each one
// is listed in the "Detalles técnicos" section for developers.
type Capability = {
  title: string;
  Icon: typeof Search;
  description: string;
  example: string;
};

const CAPABILITIES: Capability[] = [
  {
    title: 'Buscar jurisprudencia y normas',
    Icon: Search,
    description:
      'Su asistente consulta la base de Enndor: sentencias de las Altas Cortes, leyes, decretos, códigos y conceptos de entidades como la DIAN.',
    example: 'Busca jurisprudencia reciente de la Corte Constitucional sobre tutela por servicios de salud.',
  },
  {
    title: 'Búsquedas con filtros',
    Icon: FileSearch,
    description:
      'Combine corporación, sala, tipo de providencia y rango de fechas en una sola consulta, buscando términos exactos o ideas.',
    example: 'Encuentra autos de la Sala Civil de la Corte Suprema entre 2021 y 2024 sobre exequátur.',
  },
  {
    title: 'Leer más de un documento',
    Icon: Link2,
    description:
      'Cuando encuentra una sentencia relevante, su asistente puede leer las páginas siguientes para darle el contexto completo.',
    example: 'Lee las consideraciones completas de esa sentencia y resume la regla de decisión.',
  },
  {
    title: 'Citar la fuente original',
    Icon: MessageSquareQuote,
    description:
      'Cada resultado trae el enlace al PDF oficial, para que usted verifique la cita antes de usarla en un escrito.',
    example: 'Dame el enlace a la providencia original para revisarla.',
  },
];

function CopyBlock({ text, multiline = false }: { text: string; multiline?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (e.g. insecure context): the text stays selectable.
    }
  };
  return (
    <div className="group relative mt-3 rounded-xl border border-white/10 bg-white/[0.03]">
      <pre className={cn('overflow-x-auto px-5 py-4 pr-14 font-mono text-sm text-accent', !multiline && 'whitespace-nowrap')}>
        <code>{text}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copiado' : 'Copiar'}
        className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:border-white/25 hover:text-white"
      >
        {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

type StepImage = {
  src: string;
  alt: string;
  caption: ReactNode;
  width: number;
  height: number;
  // Max display width; tall dialogs are shown narrower than wide menus.
  className?: string;
};

type Step = { title: ReactNode; body?: ReactNode; image?: StepImage };

type ClientGuide = {
  id: string;
  label: string;
  intro: ReactNode;
  steps: Step[];
  note?: ReactNode;
};

const Strong = ({ children }: { children: ReactNode }) => <strong className="font-medium text-white">{children}</strong>;

const GUIDES: ClientGuide[] = [
  {
    id: 'claude',
    label: 'Claude',
    intro: (
      <>
        Para <Strong>claude.ai</Strong>, la app de escritorio y la app móvil. Lo configura una vez en la web y queda
        disponible en todos sus dispositivos.
      </>
    ),
    steps: [
      {
        title: (
          <>
            En un chat de claude.ai, haga clic en el botón <Strong>+</Strong>
          </>
        ),
        body: (
          <>
            Luego vaya a <Strong>Conectores → Agregar conector → Agregar conector personalizado</Strong>.
          </>
        ),
        image: {
          src: '/images/guia-claude-conector.webp',
          alt: 'Menú de Claude: botón +, Conectores, Agregar conector y Agregar conector personalizado',
          caption: (
            <>
              <Strong>+</Strong> → Conectores → Agregar conector → <Strong>Agregar conector personalizado</Strong>
            </>
          ),
          width: 785,
          height: 342,
          className: 'max-w-2xl',
        },
      },
      {
        title: (
          <>
            Escriba el nombre <Strong>Enndor</Strong>, pegue la dirección y haga clic en <Strong>Continuar</Strong>
          </>
        ),
        body: <CopyBlock text={MCP_URL} />,
        image: {
          src: '/images/guia-claude-nombre-direccion.webp',
          alt: 'Diálogo Agregar conector personalizado con el nombre Enndor y la dirección https://app.enndor.ai/mcp',
          caption: <>Nombre: Enndor · Dirección: app.enndor.ai/mcp</>,
          width: 547,
          height: 489,
          className: 'max-w-md',
        },
      },
      {
        title: (
          <>
            Deje marcadas las <Strong>opciones por defecto</Strong> y haga clic en <Strong>Agregar</Strong>
          </>
        ),
        body: <>Claude detecta solo la forma de conectarse; no hace falta cambiar nada en esta pantalla.</>,
        image: {
          src: '/images/guia-claude-oauth.webp',
          alt: 'Pantalla de opciones del conector con los valores por defecto y el botón Agregar',
          caption: <>Opciones por defecto → Agregar</>,
          width: 556,
          height: 680,
          className: 'max-w-sm',
        },
      },
      {
        title: <>Inicie sesión en Enndor</>,
        body: (
          <>
            Claude lo lleva a la página de Enndor. Entre con su cuenta, con Google o como invitado. Al terminar vuelve a
            Claude y <Strong>Enndor queda conectado</Strong>.
          </>
        ),
        image: {
          src: '/images/guia-claude-login.webp',
          alt: 'Página de inicio de sesión de Enndor',
          caption: <>Inicio de sesión de Enndor</>,
          width: 414,
          height: 708,
          className: 'max-w-xs',
        },
      },
      {
        title: (
          <>
            Recomendado: permita que Claude use Enndor sin preguntar cada vez
          </>
        ),
        body: (
          <>
            Vaya a <Strong>+ → Conectores → Administrar conectores → Enndor</Strong>. En <Strong>Permisos de herramientas</Strong>,
            elija <Strong>Permitir siempre</Strong> para las herramientas de solo lectura. Son búsquedas y lecturas: Enndor
            nunca modifica nada en su cuenta.
          </>
        ),
        image: {
          src: '/images/guia-claude-permisos.webp',
          alt: 'Permisos de herramientas de Enndor en Claude con la opción Permitir siempre',
          caption: <>Administrar conectores → Enndor → Permitir siempre</>,
          width: 791,
          height: 504,
          className: 'max-w-2xl',
        },
      },
      {
        title: <>Úselo en sus conversaciones</>,
        body: (
          <>
            Desde <Strong>+ → Conectores</Strong>, confirme que el interruptor de <Strong>Enndor</Strong> está encendido y
            pregúntele a Claude como lo haría con un colega.
          </>
        ),
      },
    ],
  },
  {
    id: 'chatgpt',
    label: 'ChatGPT',
    intro: (
      <>
        Disponible en los planes de pago de ChatGPT. En su configuración, Enndor se agrega como un{' '}
        <Strong>“servidor MCP personalizado”</Strong> (así se llaman los conectores externos en ChatGPT). Los nombres de los
        menús cambian con frecuencia; si no encuentra una opción, búsquela por ese nombre.
      </>
    ),
    steps: [
      {
        title: (
          <>
            Abra <Strong>Configuración → Apps y conectores</Strong>
          </>
        ),
        body: (
          <>
            Si se lo pide, active el <Strong>Modo desarrollador</Strong> en <Strong>Configuración avanzada</Strong> y acepte la
            advertencia de seguridad.
          </>
        ),
      },
      {
        title: (
          <>
            Elija <Strong>Crear</Strong> o <Strong>Agregar servidor MCP personalizado</Strong>
          </>
        ),
      },
      {
        title: (
          <>
            Escriba el nombre <Strong>Enndor</Strong> y pegue la dirección de Enndor
          </>
        ),
        body: (
          <>
            <CopyBlock text={MCP_URL} />
            <p className="mt-3">
              Si le pide un método de autenticación, elija <Strong>OAuth</Strong> y deje lo demás vacío: no hace falta ninguna
              clave.
            </p>
          </>
        ),
      },
      {
        title: (
          <>
            Haga clic en <Strong>Crear</Strong> e inicie sesión en Enndor
          </>
        ),
        body: <>ChatGPT abre la página de inicio de sesión de Enndor. Entre con su cuenta o como invitado y autorice el acceso.</>,
      },
      {
        title: <>Selecciónelo en cada conversación</>,
        body: (
          <>
            Desde el botón <Strong>+</Strong> del campo de mensaje, elija <Strong>Enndor</Strong> en la lista de herramientas o
            de modo desarrollador.
          </>
        ),
      },
    ],
    note: (
      <>
        En los espacios de trabajo Business y Enterprise, un administrador debe habilitar el uso de servidores MCP
        personalizados para los miembros.
      </>
    ),
  },
  {
    id: 'claude-code',
    label: 'Claude Code',
    intro: <>Para quienes usan Claude Code en la terminal. Se conecta con dos comandos.</>,
    steps: [
      {
        title: <>Agregue el servidor y abra el inicio de sesión</>,
        body: (
          <CopyBlock
            multiline
            text={`claude mcp add --transport http enndor ${MCP_URL}\nclaude mcp login enndor`}
          />
        ),
      },
      {
        title: <>Complete el inicio de sesión en el navegador</>,
        body: <>El segundo comando abre Enndor en su navegador. Entre con su cuenta o como invitado y autorice el acceso.</>,
      },
      {
        title: <>Confirme la conexión</>,
        body: (
          <>
            <CopyBlock text="claude mcp list" />
            <p className="mt-3">
              Debe aparecer <code className="font-mono text-accent">enndor</code> como conectado.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: 'otras',
    label: 'Otras apps',
    intro: (
      <>
        Muchas otras aplicaciones de IA permiten agregar “conectores” o “integraciones” externas. Si la suya tiene esa
        opción, puede conectar Enndor con la misma dirección.
      </>
    ),
    steps: [
      {
        title: (
          <>
            Busque la opción <Strong>Agregar conector</Strong> o <Strong>Integraciones</Strong> en su app
          </>
        ),
      },
      {
        title: <>Pegue la dirección de Enndor</>,
        body: <CopyBlock text={MCP_URL} />,
      },
      {
        title: <>Inicie sesión en Enndor cuando se lo pida</>,
        body: <>No hay contraseñas ni claves que copiar: la conexión se autoriza iniciando sesión en Enndor.</>,
      },
    ],
  },
];

function ClientGuides() {
  const [active, setActive] = useState(GUIDES[0].id);
  const guide = GUIDES.find((g) => g.id === active) ?? GUIDES[0];

  return (
    <div>
      {/* Segmented "slider" radio: the white pill slides to the selected app. */}
      <div
        role="radiogroup"
        aria-label="Aplicación"
        className="relative inline-flex max-w-full flex-wrap gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1 sm:flex-nowrap sm:rounded-full"
      >
        {GUIDES.map((g) => (
          <button
            key={g.id}
            type="button"
            role="radio"
            aria-checked={active === g.id}
            onClick={() => setActive(g.id)}
            className={cn(
              'relative rounded-full px-5 py-2 text-sm transition-colors duration-300',
              active === g.id ? 'text-black' : 'text-on-surface-variant hover:text-white',
            )}
          >
            {active === g.id && (
              <motion.span
                layoutId="mcp-client"
                className="absolute inset-0 rounded-full bg-white"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative font-medium">{g.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={guide.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mt-10"
        >
          <p className="max-w-2xl text-lg font-light leading-relaxed text-on-surface-variant">{guide.intro}</p>
          <ol className="mt-10 border-t border-white/[0.08]">
            {guide.steps.map((step, i) => (
              <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/[0.08] py-7 sm:grid-cols-[3.5rem_1fr]">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <div className="min-w-0">
                  <h3 className="font-headline text-lg font-medium tracking-tight text-white sm:text-xl">{step.title}</h3>
                  {step.body && <div className="mt-2 font-light leading-relaxed text-on-surface-variant">{step.body}</div>}
                  {step.image && (
                    <figure className="mt-5">
                      <img
                        src={step.image.src}
                        alt={step.image.alt}
                        width={step.image.width}
                        height={step.image.height}
                        loading="lazy"
                        decoding="async"
                        className={cn('h-auto w-full rounded-xl border border-white/10', step.image.className ?? 'max-w-2xl')}
                      />
                      <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
                        {step.image.caption}
                      </figcaption>
                    </figure>
                  )}
                </div>
              </li>
            ))}
          </ol>
          {guide.note && (
            <p className="mt-6 max-w-2xl border-l border-accent/60 pl-4 text-sm font-light leading-relaxed text-on-surface-variant">
              {guide.note}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Google HowTo rich-result data for the main (Claude) walkthrough.
const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo conectar Enndor a Claude',
  description:
    'Conecte la base de jurisprudencia y normatividad colombiana de Enndor a Claude para consultar sentencias y normas desde su asistente de IA.',
  inLanguage: 'es-CO',
  totalTime: 'PT3M',
  step: [
    {
      '@type': 'HowToStep',
      name: 'En un chat de claude.ai, haga clic en + → Conectores → Agregar conector → Agregar conector personalizado',
      image: 'https://enndor.ai/images/guia-claude-conector.webp',
    },
    {
      '@type': 'HowToStep',
      name: `Escriba el nombre Enndor, pegue la dirección ${MCP_URL} y haga clic en Continuar`,
      image: 'https://enndor.ai/images/guia-claude-nombre-direccion.webp',
    },
    {
      '@type': 'HowToStep',
      name: 'Deje marcadas las opciones por defecto y haga clic en Agregar',
      image: 'https://enndor.ai/images/guia-claude-oauth.webp',
    },
    {
      '@type': 'HowToStep',
      name: 'Inicie sesión en Enndor; al volver a Claude, Enndor queda conectado',
      image: 'https://enndor.ai/images/guia-claude-login.webp',
    },
    {
      '@type': 'HowToStep',
      name: 'En Administrar conectores → Enndor, elija Permitir siempre para las herramientas de solo lectura',
      image: 'https://enndor.ai/images/guia-claude-permisos.webp',
    },
  ],
};

const TECH_DETAILS: { label: string; value: ReactNode }[] = [
  { label: 'Protocolo', value: <>Model Context Protocol (MCP), transporte Streamable HTTP</> },
  { label: 'Servidor', value: <code className="font-mono text-accent">{MCP_URL}</code> },
  {
    label: 'Autenticación',
    value: (
      <>
        OAuth 2.1 con PKCE y registro dinámico de clientes (RFC 7591). Metadatos en{' '}
        <code className="font-mono text-accent">/.well-known/oauth-protected-resource</code>.
      </>
    ),
  },
  {
    label: 'Herramientas',
    value: (
      <code className="font-mono text-accent">legal_search · advanced_legal_search · delve_into_document · search · fetch</code>
    ),
  },
  { label: 'Sesiones', value: <>Un cliente conectado a la vez por cuenta; cada conexión nueva reemplaza la anterior.</> },
];

export default function Mcp() {
  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Enndor para Claude y ChatGPT: jurisprudencia colombiana en su asistente de IA"
        description="Conecte Enndor a Claude o ChatGPT y consulte sentencias, leyes y decretos colombianos desde su asistente de IA, con enlace a la fuente original. Guía paso a paso en 2 minutos."
        canonical="https://enndor.ai/mcp"
        jsonLd={howToJsonLd}
      />

      <PageHeader
        eyebrow="Enndor x Claude"
        title={
          <>
            Enndor dentro de <span className="font-serif italic tracking-normal text-white/55">Claude y ChatGPT.</span>
          </>
        }
        subtitle={
          <>
            Consulte la jurisprudencia y normatividad colombiana de Enndor sin salir de su asistente de IA. Claude o
            ChatGPT buscan en nuestra base, citan la fuente y le entregan el enlace a la sentencia original.
          </>
        }
      >
        <div className="mt-10 max-w-xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Dirección de conexión</p>
          <CopyBlock text={MCP_URL} />
          <p className="mt-3 text-sm font-light text-white/50">La configuración toma unos 2 minutos y es gratuita.</p>
        </div>
      </PageHeader>

      {/* Guía por aplicación */}
      <section className="px-6 pb-28 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <Eyebrow index="01" className="mb-8">
              Cómo conectarlo
            </Eyebrow>
            <ClientGuides />
          </div>
        </div>
      </section>

      {/* Qué puede pedirle */}
      <section className="border-t border-white/[0.06] px-6 py-28 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow index="02" className="mb-6">
            Qué puede pedirle
          </Eyebrow>
          <h2 className="mb-12 font-headline text-4xl font-medium tracking-[-0.03em] lg:text-5xl">
            Pregúntele como a un colega, <span className="font-serif italic tracking-normal text-white/55">con fuentes reales.</span>
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {CAPABILITIES.map(({ title, Icon, description, example }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: EASE }}
              >
                <SpotlightCard className="h-full">
                  <div className="flex h-full flex-col p-8">
                    <div className="mb-8 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <span className="font-mono text-xs text-white/25">0{i + 1}</span>
                    </div>
                    <h3 className="mb-3 font-headline text-xl font-medium tracking-tight text-white">{title}</h3>
                    <p className="font-light leading-relaxed text-on-surface-variant">{description}</p>
                    <p className="mt-auto pt-6 font-serif text-lg italic leading-snug text-white/70">“{example}”</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seguridad e inicio de sesión */}
      <section className="border-y border-white/[0.06] px-6 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <Eyebrow index="03">Seguridad</Eyebrow>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <KeyRound className="h-5 w-5 text-accent" />
            </div>
          </div>
          <div className="space-y-5 lg:col-span-8">
            <p className="text-lg font-light leading-relaxed text-on-surface-variant">
              Al conectar, Claude o ChatGPT le piden <Strong>iniciar sesión en Enndor</Strong> una sola vez. Nunca comparte su
              contraseña con ellos: Enndor solo autoriza el acceso a la búsqueda. Puede usar su cuenta o entrar como
              invitado.
            </p>
            <p className="font-light leading-relaxed text-on-surface-variant">
              Por seguridad, cada cuenta de Enndor puede estar conectada a una sola app a la vez: si conecta otra, la
              anterior se desconecta.
            </p>
            <div className="flex items-start gap-3 pt-2">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="font-light leading-relaxed text-on-surface-variant">
                Cada resultado incluye un enlace al PDF original, válido por una hora, para que confirme cada cita
                directamente en la fuente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detalles técnicos (para desarrolladores) */}
      <section className="px-6 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <details className="group max-w-4xl rounded-2xl border border-white/[0.08] bg-white/[0.02] [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5">
              <span>
                <span className="block font-headline text-lg font-medium text-white">Detalles técnicos</span>
                <span className="block text-sm font-light text-on-surface-variant">Para desarrolladores e integraciones propias</span>
              </span>
              <ChevronDown className="h-5 w-5 shrink-0 text-white/50 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <dl className="border-t border-white/[0.08] px-6 py-2">
              {TECH_DETAILS.map((d) => (
                <div key={d.label} className="grid gap-1 border-b border-white/[0.06] py-4 last:border-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">{d.label}</dt>
                  <dd className="break-words text-sm font-light leading-relaxed text-on-surface-variant">{d.value}</dd>
                </div>
              ))}
            </dl>
          </details>

          <p className="mt-12 text-sm font-light text-on-surface-variant/70">
            ¿Necesita ayuda para conectarlo? Escríbanos a{' '}
            <a href="mailto:soporte@legisia.co" className="text-accent hover:underline">
              soporte@legisia.co
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
