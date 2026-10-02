import { PlugZap, Search, FileSearch, KeyRound, Link2, ShieldCheck } from 'lucide-react';
import SEO from '@/src/components/SEO';

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

export default function Mcp() {
  return (
    <main className="pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-[#000000] min-h-screen">
      <SEO
        title="Conector MCP"
        description="Conecte Claude, ChatGPT o cualquier cliente MCP a la base de jurisprudencia y normatividad colombiana de Legisia."
        canonical="https://legisia.co/mcp"
      />

      <header className="max-w-4xl mb-20">
        <span className="text-primary font-sans uppercase tracking-widest text-xs mb-4 block">
          Para desarrolladores
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface tracking-tight mb-8 font-headline">
          Conector MCP de Legisia.
        </h1>
        <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed font-sans font-light">
          Un servidor{' '}
          <a
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Model Context Protocol
          </a>{' '}
          remoto que expone la misma búsqueda de jurisprudencia y normatividad colombiana de la app a
          cualquier cliente MCP — Claude, ChatGPT, o su propia integración.
        </p>
      </header>

      {/* Connection */}
      <section className="mb-24 max-w-4xl">
        <h2 className="text-3xl font-bold text-on-surface mb-6 font-headline">Conexión</h2>
        <p className="text-on-surface-variant text-lg leading-relaxed font-sans font-light mb-6">
          La URL del servidor es:
        </p>
        <code className="block bg-white/5 card-border rounded-lg px-6 py-4 text-primary font-mono text-sm md:text-base break-all">
          https://app.legisia.co/mcp
        </code>
      </section>

      {/* Auth */}
      <section className="mb-24 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <KeyRound className="text-primary w-7 h-7" />
          <h2 className="text-3xl font-bold text-on-surface font-headline">Autenticación</h2>
        </div>
        <p className="text-on-surface-variant text-lg leading-relaxed font-sans font-light mb-6">
          El conector usa OAuth 2.1 con PKCE y registro dinámico de clientes (RFC 7591) — un cliente MCP
          compatible lo detecta automáticamente, sin necesidad de pedir credenciales manualmente. Al
          autenticarse, se le redirige a iniciar sesión en Legisia; <strong className="text-on-surface">no se requiere
          cuenta</strong> — "Continuar como invitado" funciona igual de bien.
        </p>
        <p className="text-on-surface-variant text-base leading-relaxed font-sans font-light">
          Cada sesión conectada de esta forma reemplaza la anterior: solo un cliente MCP puede estar
          conectado a la vez por cuenta, independiente de su sesión en la app web.
        </p>
      </section>

      {/* Claude Code CLI */}
      <section className="mb-24 max-w-4xl">
        <h2 className="text-3xl font-bold text-on-surface mb-6 font-headline">
          Conectar desde Claude Code
        </h2>
        <pre className="bg-white/5 card-border rounded-lg px-6 py-5 overflow-x-auto mb-4">
          <code className="text-primary font-mono text-sm md:text-base">
            claude mcp add --transport http legisia https://app.legisia.co/mcp{'\n'}
            claude mcp login legisia
          </code>
        </pre>
        <p className="text-on-surface-variant text-base leading-relaxed font-sans font-light">
          El segundo comando abre el navegador para completar el inicio de sesión. Una vez conectado,{' '}
          <code className="text-primary font-mono text-sm">claude mcp list</code> debe mostrar{' '}
          <code className="text-primary font-mono text-sm">legisia</code> como conectado.
        </p>
      </section>

      {/* Claude.ai / ChatGPT */}
      <section className="mb-24 max-w-4xl">
        <h2 className="text-3xl font-bold text-on-surface mb-6 font-headline">
          Conectar desde Claude.ai o ChatGPT
        </h2>
        <p className="text-on-surface-variant text-lg leading-relaxed font-sans font-light">
          En la configuración de conectores de su cliente, agregue un conector personalizado con la URL
          de arriba. El cliente iniciará el flujo de autenticación automáticamente.
        </p>
      </section>

      {/* Tools */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold text-on-surface mb-10 font-headline max-w-4xl">
          Herramientas disponibles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {TOOLS.map(({ name, Icon, description }) => (
            <div
              key={name}
              className="bg-[#000000] card-border p-8 rounded-xl transition-all duration-300 hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded bg-white/5 flex items-center justify-center mb-6">
                <Icon className="text-primary w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3 font-headline font-mono">
                {name}
              </h3>
              <p className="text-on-surface-variant leading-relaxed font-sans font-light">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Verifiability */}
      <section className="max-w-4xl">
        <div className="bg-surface-container-low card-border rounded-xl p-8 md:p-12 border-l-4 border-l-primary flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-shrink-0 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="text-primary w-12 h-12" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4 tracking-tight font-headline">
              Resultados verificables
            </h2>
            <p className="text-on-surface-variant text-xl leading-relaxed max-w-3xl font-sans font-light">
              Cada resultado incluye un enlace firmado al PDF original en nuestro repositorio documental,
              válido por una hora, para que pueda confirmar cada cita directamente en la fuente.
            </p>
          </div>
        </div>
      </section>

      <p className="text-on-surface-variant/60 text-sm font-sans mt-20 max-w-4xl">
        ¿Preguntas o problemas con el conector? Escríbanos a{' '}
        <a href="mailto:soporte@legisia.co" className="text-primary hover:underline">
          soporte@legisia.co
        </a>
        .
      </p>
    </main>
  );
}
