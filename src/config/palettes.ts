// Experimental colour palettes for the landing, switchable from the hidden
// palette panel (src/components/PalettePanel.tsx). Each palette overrides
// Tailwind's --color-black / --color-white, so every existing bg-black,
// text-white/60, border-white/10... follows it, plus an accent colour and
// the three tones the delta shader (src/components/DeltaBackground.tsx)
// paints with.

export type Palette = {
  id: string;
  name: string;
  description: string;
  vars: {
    bg: string; // --color-black / --color-surface
    fg: string; // --color-white
    onSurface: string;
    muted: string; // --color-on-surface-variant
    accent: string;
  };
  delta: {
    shadow: string; // darkest channels
    highlight: string; // sandbanks
    accent: string; // ridge lines
  };
};

export const PALETTES: Palette[] = [
  {
    id: 'grafito',
    name: 'Grafito',
    description: 'Monocromo, grises fríos',
    vars: { bg: '#000000', fg: '#ffffff', onSurface: '#ededed', muted: '#a1a1a1', accent: '#9a9a9a' },
    delta: { shadow: '#000000', highlight: '#fffbf5', accent: '#fffbf5' },
  },
  {
    id: 'celeste',
    name: 'Celeste',
    description: 'Negro cálido, crema y azul',
    vars: { bg: '#110f0b', fg: '#f7f2e8', onSurface: '#ece6da', muted: '#a9a294', accent: '#4aa8d8' },
    delta: { shadow: '#0b0907', highlight: '#e3d9c6', accent: '#4aa8d8' },
  },
  {
    id: 'carmesi',
    name: 'Carmesí',
    description: 'Negro cálido, crema y vino',
    vars: { bg: '#120e0c', fg: '#f7f2e8', onSurface: '#ece6da', muted: '#ab9f93', accent: '#c7344f' },
    delta: { shadow: '#0c0807', highlight: '#e0d2c2', accent: '#b02a42' },
  },
  {
    id: 'oro',
    name: 'Oro',
    description: 'Negro cálido, crema y dorado',
    vars: { bg: '#12100a', fg: '#f8f2e4', onSurface: '#eee6d5', muted: '#ada188', accent: '#c9a257' },
    delta: { shadow: '#0b0906', highlight: '#e6d8b8', accent: '#c9a257' },
  },
  {
    id: 'navy',
    name: 'Navy',
    description: 'Azul oscuro profundo',
    vars: { bg: '#050c1a', fg: '#eef3fb', onSurface: '#e1e8f4', muted: '#8e9bb3', accent: '#7aa5ea' },
    delta: { shadow: '#030712', highlight: '#a9bddc', accent: '#5f8fd8' },
  },
];

// Celeste won; its values are also the base CSS in src/index.css.
export const DEFAULT_PALETTE = 'celeste';
export const PALETTE_STORAGE_KEY = 'enndor-palette';
export const PALETTE_EVENT = 'enndor:palette';

// The switcher is hidden from visitors: opening any page with ?paletas
// turns it on for this browser, ?paletas=off turns it off again.
const PANEL_FLAG_KEY = 'enndor-palette-panel';

export function palettePanelEnabled(): boolean {
  try {
    const param = new URLSearchParams(window.location.search).get('paletas');
    if (param !== null) {
      if (param === 'off') localStorage.removeItem(PANEL_FLAG_KEY);
      else localStorage.setItem(PANEL_FLAG_KEY, '1');
    }
    return localStorage.getItem(PANEL_FLAG_KEY) === '1';
  } catch {
    return false;
  }
}

export function getPalette(id: string | null | undefined): Palette {
  return PALETTES.find((p) => p.id === id) ?? PALETTES.find((p) => p.id === DEFAULT_PALETTE)!;
}

function paletteProps({ vars, delta }: Palette): Record<string, string> {
  return {
    '--color-black': vars.bg,
    '--color-surface': vars.bg,
    '--color-white': vars.fg,
    '--color-on-surface': vars.onSurface,
    '--color-on-surface-variant': vars.muted,
    '--color-accent': vars.accent,
    '--delta-shadow': delta.shadow,
    '--delta-highlight': delta.highlight,
    '--delta-accent': delta.accent,
  };
}

// Writes the palette's CSS variables on <html> and remembers them for this
// browser. The inline script in index.html re-applies the saved variables
// before first paint, so a chosen palette doesn't flash the default one.
export function applyPalette(palette: Palette) {
  const root = document.documentElement;
  const props = paletteProps(palette);
  root.dataset.palette = palette.id;
  for (const [name, value] of Object.entries(props)) {
    root.style.setProperty(name, value);
  }
  try {
    localStorage.setItem(PALETTE_STORAGE_KEY, JSON.stringify({ id: palette.id, props }));
  } catch {
    // Storage blocked (private mode): the palette just won't persist.
  }
  window.dispatchEvent(new CustomEvent(PALETTE_EVENT));
}

export function savedPaletteId(): string {
  try {
    return JSON.parse(localStorage.getItem(PALETTE_STORAGE_KEY) ?? '{}').id ?? DEFAULT_PALETTE;
  } catch {
    return DEFAULT_PALETTE;
  }
}
