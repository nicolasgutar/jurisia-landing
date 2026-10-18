import type { ReactNode, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import DeltaBackground from '@/src/components/DeltaBackground';
import { MARK_PATHS, MARK_STROKE_WIDTH, MARK_TILE_RADIUS, MARK_VIEWBOX } from '@/src/lib/logo';

export const APP_URL = 'https://app.enndor.ai';

// The "en" mark. Strokes take the active palette's accent and light tones;
// the tile is a step lighter than the page so it reads on dark backgrounds.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox={MARK_VIEWBOX} className={cn('shrink-0', className)} aria-hidden="true">
      <rect
        width="100"
        height="100"
        rx={MARK_TILE_RADIUS}
        style={{ fill: 'color-mix(in srgb, var(--color-white) 9%, var(--color-black))' }}
      />
      <g fill="none" strokeLinecap="round" strokeWidth={MARK_STROKE_WIDTH}>
        {MARK_PATHS.map((p) => (
          <path key={p.d} d={p.d} className={p.tone === 'accent' ? 'stroke-accent' : 'stroke-white'} />
        ))}
      </g>
    </svg>
  );
}

// The Enndor wordmark: lowercase, with the ".ai" in the accent colour.
// `withMark` puts the "en" tile in front, sized to the text.
export function Wordmark({ className, withMark = false }: { className?: string; withMark?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-[0.4em] font-headline font-medium tracking-[-0.04em] text-white', className)}>
      {withMark && <LogoMark className="h-[1.45em] w-[1.45em]" />}
      <span>
        enndor<span className="text-accent">.ai</span>
      </span>
    </span>
  );
}

// The old name, struck through. Used wherever we refer to LegisIA so the
// rename reads at a glance (including inside user testimonials, where the
// original wording is kept).
export function FormerName({ children = 'Legisia', className }: { children?: ReactNode; className?: string }) {
  return (
    <span className={cn('relative inline-block text-white/40', className)}>
      {children}
      <span aria-hidden="true" className="absolute left-[-4%] right-[-4%] top-[55%] h-px bg-accent" />
      <span className="sr-only"> (ahora Enndor)</span>
    </span>
  );
}

// Card with a soft light that follows the pointer.
export function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };
  return (
    <div
      onMouseMove={onMove}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-colors duration-500 hover:border-white/20',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 45%)',
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// Infinite horizontal ticker. Items are rendered twice so the -50% loop
// is seamless.
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn('mask-fade-x overflow-hidden', className)}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {items.map((item) => (
              <span
                key={item}
                className="flex items-center gap-8 whitespace-nowrap px-4 font-mono text-xs uppercase tracking-[0.2em] text-on-surface-variant"
              >
                {item}
                <span className="h-1 w-1 rounded-full bg-white/25" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

// Inner-page hero: a dimmed strip of the delta backdrop fading into black,
// with the title revealing line by line.
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-black px-6 pb-20 pt-40 md:px-8 md:pb-28 md:pt-48">
      <DeltaBackground className="opacity-50 [mask-image:linear-gradient(to_bottom,black_20%,transparent)]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
          className="mt-8 max-w-5xl font-headline text-5xl font-medium leading-[1] tracking-[-0.045em] text-white sm:text-6xl lg:text-8xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
            className="mt-8 max-w-xl text-lg font-light leading-relaxed text-white/65"
          >
            {subtitle}
          </motion.p>
        )}
        {children}
      </div>
    </header>
  );
}

export function Eyebrow({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-on-surface-variant', className)}>
      {index && <span className="text-accent/80">[{index}]</span>}
      {children}
    </p>
  );
}
