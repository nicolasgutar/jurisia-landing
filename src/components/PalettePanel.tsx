import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Palette as PaletteIcon, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { PALETTES, applyPalette, applyPaletteFavicon, getPalette, savedPaletteId, DEFAULT_PALETTE } from '@/src/config/palettes';

// Hidden palette switcher for trying out brand colours. Collapsed to a faint
// corner button; "P" toggles it, Escape closes it. The choice is remembered
// per browser (see applyPalette).
export default function PalettePanel() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(DEFAULT_PALETTE);

  useEffect(() => {
    const saved = savedPaletteId();
    setActive(saved);
    // The inline script in index.html restores the colours; the tab icon
    // needs the palette definition, so it's restored here.
    if (saved !== DEFAULT_PALETTE) applyPaletteFavicon(getPalette(saved));
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('input, textarea, [contenteditable="true"]')) return;
      if (e.key === 'Escape') setOpen(false);
      if ((e.key === 'p' || e.key === 'P') && !e.metaKey && !e.ctrlKey && !e.altKey) setOpen((o) => !o);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const choose = (id: string) => {
    setActive(id);
    applyPalette(getPalette(id));
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-72 origin-bottom-right overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-2xl backdrop-blur-xl"
            role="dialog"
            aria-label="Paleta de colores"
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">Paleta de colores</p>
              <button onClick={() => setOpen(false)} aria-label="Cerrar" className="text-white/40 transition-colors hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="p-2">
              {PALETTES.map((p) => {
                const selected = p.id === active;
                return (
                  <li key={p.id}>
                    <button
                      onClick={() => choose(p.id)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                        selected ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]',
                      )}
                    >
                      {/* Swatch: background with the foreground and accent on it */}
                      <span
                        className="relative flex h-9 w-9 shrink-0 items-center justify-center gap-0.5 rounded-lg border border-white/10"
                        style={{ background: p.vars.bg }}
                      >
                        <span className="h-3.5 w-1.5 rounded-full" style={{ background: p.vars.fg }} />
                        <span className="h-3.5 w-1.5 rounded-full" style={{ background: p.vars.accent }} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm text-white">{p.name}</span>
                        <span className="block truncate text-xs text-white/45">{p.description}</span>
                      </span>
                      {selected && <Check className="h-4 w-4 shrink-0 text-accent" />}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="border-t border-white/[0.08] px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
              Tecla P para abrir · Esc para cerrar
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Cambiar paleta de colores"
        aria-expanded={open}
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all duration-300 hover:opacity-100',
          open ? 'opacity-100' : 'opacity-30',
        )}
      >
        <PaletteIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
