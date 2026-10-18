import type { ReactNode, MouseEvent } from 'react';
import { cn } from '@/src/lib/utils';

export const APP_URL = 'https://app.legisia.co';

// The Enndor wordmark: lowercase, with the ".ai" receding.
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('font-headline font-medium tracking-[-0.04em] text-white', className)}>
      enndor<span className="text-white/40">.ai</span>
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
      <span aria-hidden="true" className="absolute left-[-4%] right-[-4%] top-[55%] h-px bg-white/60" />
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
            'radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.07), transparent 45%)',
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

export function Eyebrow({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-on-surface-variant', className)}>
      {index && <span className="text-white/30">[{index}]</span>}
      {children}
    </p>
  );
}
