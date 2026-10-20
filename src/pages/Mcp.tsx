import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Copy, FileSearch, KeyRound, Link2, PlugZap, Search, ShieldCheck } from 'lucide-react';
import SEO from '@/src/components/SEO';
import { Eyebrow, PageHeader, SpotlightCard } from '@/src/components/Brand';
import { cn } from '@/src/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;
const MCP_URL = 'https://app.enndor.ai/mcp';

type ToolDoc = {
  name: string;
  Icon: typeof Search;
  description: string;
};

const TOOLS: ToolDoc[] = [
  {
    name: 'legal_search',
    Icon: Search,
    description:
      'Busca jurisprudencia y normatividad colombiana filtrando por categoría (Corte Suprema, Corte Constitucional, Consejo de Estado, Leyes, Decretos, Códigos, y más) y tipo de fuente.',
  },
  {
    name: 'advanced_legal_search',
    Icon: FileSearch,
    description:
      'Búsqueda multi-filtro: varias categorías, sala, tipo de providencia y rango de fechas a la vez, en modo exacto o semántico.',
  },
  {
    name: 'delve_into_document',
    Icon: Link2,
    description:
      'Obtiene páginas adyacentes de un documento ya encontrado, para ampliar contexto sin perder el hilo de la búsqueda.',
  },
  {
    name: 'search / fetch',
    Icon: PlugZap,
    description:
      'Contrato estándar de búsqueda y recuperación de documentos, para clientes como ChatGPT que lo requieren.',
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

type Step = { title: ReactNode; body?: ReactNode };

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
            Abra <Strong>Configuración → Conectores</Strong> en claude.ai
          </>
        ),
        body: <>En algunas versiones aparece como <Strong>Personalizar → Conectores</Strong>.</>,
      },
      {
        title: (
          <>
            Haga clic en <Strong>Agregar conector personalizado</Strong>
          </>
        ),
      },
      {
        title: (
          <>
            Escriba el nombre <Strong>Enndor</Strong> y pegue la URL del servidor
          </>
        ),
        body: (
          <>
            <CopyBlock text={MCP_URL} />
            <p className="mt-3">No llene los campos de OAuth (Client ID / Secret): Enndor registra el cliente automáticamente.</p>
          </>
        ),
      },
      {
        title: (
          <>
            Haga clic en <Strong>Conectar</Strong> e inicie sesión en Enndor
          </>
        ),
        body: <>Se abre la página de inicio de sesión de Enndor. Entre con su cuenta o como invitado y autorice el acceso.</>,
      },
      {
        title: <>Actívelo en sus conversaciones</>,
        body: (
          <>
            En un chat nuevo, abra el menú de herramientas (el ícono <Strong>+</Strong> o de controles junto al campo de
            mensaje) y confirme que <Strong>Enndor</Strong> está activado.
          </>
        ),
      },
    ],
    note: (
      <>
        En los planes Team y Enterprise, primero un administrador debe agregar el conector en la configuración de la
        organización; después cada miembro se conecta con su propia cuenta.
      </>
    ),
  },
  {
    id: 'chatgpt',
    label: 'ChatGPT',
    intro: (
      <>
        ChatGPT admite servidores MCP personalizados en sus planes de pago. Los nombres de los menús cambian con
        frecuencia; si no encuentra una opción, busque <Strong>“servidor MCP personalizado”</Strong> en la configuración.
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
            Escriba el nombre <Strong>Enndor</Strong> y pegue la URL del servidor
          </>
        ),
        body: (
          <>
            <CopyBlock text={MCP_URL} />
            <p className="mt-3">
              En autenticación seleccione <Strong>OAuth</Strong>. No necesita ingresar credenciales: el registro del cliente es
              automático.
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
    intro: <>Para la terminal. Agregue el servidor y autentíquese con dos comandos.</>,
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
    id: 'otros',
    label: 'Otros clientes',
    intro: (
      <>
        Cualquier cliente compatible con <Strong>MCP remoto por HTTP</Strong> (Streamable HTTP) y OAuth 2.1 puede
        conectarse.
      </>
    ),
    steps: [
      {
        title: <>Use esta URL como servidor MCP remoto</>,
        body: <CopyBlock text={MCP_URL} />,
      },
      {
        title: <>Deje que el cliente negocie la autenticación</>,
        body: (
          <>
            El servidor anuncia sus metadatos OAuth en <code className="font-mono text-accent">/.well-known/oauth-protected-resource</code> y
            admite registro dinámico de clientes (RFC 7591), así que no hay credenciales que copiar.
          </>
        ),
      },
      {
        title: <>Inicie sesión en Enndor cuando se lo pida</>,
        body: <>Al autorizar, el cliente recibe acceso a las herramientas descritas más abajo.</>,
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

export default function Mcp() {
  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Conector MCP"
        description="Conecte Claude, ChatGPT o cualquier cliente MCP a la base de jurisprudencia y normatividad colombiana de Enndor. Guía paso a paso."
        canonical="https://enndor.ai/mcp"
      />

      <PageHeader
        eyebrow="Conector MCP"
        title={
          <>
            Enndor dentro de <span className="font-serif italic tracking-normal text-white/55">Claude y ChatGPT.</span>
          </>
        }
        subtitle={
          <>
            Un servidor{' '}
            <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Model Context Protocol
            </a>{' '}
            remoto que lleva la búsqueda de jurisprudencia y normatividad colombiana de Enndor a su asistente de IA
            favorito.
          </>
        }
      >
        <div className="mt-10 max-w-xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">URL del servidor</p>
          <CopyBlock text={MCP_URL} />
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

      {/* Autenticación */}
      <section className="border-y border-white/[0.06] px-6 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <Eyebrow index="02">Autenticación</Eyebrow>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <KeyRound className="h-5 w-5 text-accent" />
            </div>
          </div>
          <div className="space-y-5 lg:col-span-8">
            <p className="text-lg font-light leading-relaxed text-on-surface-variant">
              El conector usa OAuth 2.1 con PKCE y registro dinámico de clientes (RFC 7591): un cliente MCP compatible lo
              detecta automáticamente, sin pedir credenciales manualmente. Al autenticarse, se le redirige a iniciar sesión
              en Enndor; <Strong>no se requiere cuenta</Strong>, “Continuar como invitado” funciona igual de bien.
            </p>
            <p className="font-light leading-relaxed text-on-surface-variant">
              Cada sesión conectada reemplaza la anterior: solo un cliente MCP puede estar conectado a la vez por cuenta,
              independiente de su sesión en la app web.
            </p>
          </div>
        </div>
      </section>

      {/* Herramientas */}
      <section className="px-6 py-28 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Eyebrow index="03" className="mb-6">
            Herramientas disponibles
          </Eyebrow>
          <h2 className="mb-12 font-headline text-4xl font-medium tracking-[-0.03em] lg:text-5xl">
            Lo que su asistente <span className="font-serif italic tracking-normal text-white/55">puede hacer.</span>
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {TOOLS.map(({ name, Icon, description }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: EASE }}
              >
                <SpotlightCard className="h-full">
                  <div className="p-8">
                    <div className="mb-8 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <span className="font-mono text-xs text-white/25">0{i + 1}</span>
                    </div>
                    <h3 className="mb-3 font-mono text-lg text-white">{name}</h3>
                    <p className="font-light leading-relaxed text-on-surface-variant">{description}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 md:flex-row md:items-center md:p-10">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/15">
              <ShieldCheck className="h-7 w-7 text-accent" />
            </div>
            <div>
              <h3 className="font-headline text-2xl font-medium tracking-tight">Resultados verificables</h3>
              <p className="mt-2 font-light leading-relaxed text-on-surface-variant">
                Cada resultado incluye un enlace firmado al PDF original en nuestro repositorio documental, válido por una
                hora, para que pueda confirmar cada cita directamente en la fuente.
              </p>
            </div>
          </div>

          <p className="mt-16 text-sm font-light text-on-surface-variant/70">
            ¿Preguntas o problemas con el conector? Escríbanos a{' '}
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
