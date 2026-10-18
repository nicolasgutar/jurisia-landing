// The "en" mark, traced from the Enndor logo. Two tones: the accent strokes
// (top of the "e", stem of the "n") and the light strokes (tail of the "e",
// arch of the "n"), on a rounded tile. Shared by <LogoMark> and the favicon.

export const MARK_VIEWBOX = '0 0 100 100';
export const MARK_TILE_RADIUS = 24;
export const MARK_STROKE_WIDTH = 9.6;

export const MARK_PATHS: { tone: 'accent' | 'light'; d: string }[] = [
  { tone: 'accent', d: 'M22.5 53.5C16.5 50.5 13.8 45 16 39.5C18.3 33.5 26.5 31 35 31.2C43 31.5 47.8 34.6 47 38.8C46 43.5 37 46.8 24.5 49.5' },
  { tone: 'light', d: 'M16.5 59C19.5 66 26 69.6 33 69.6C40 69.6 45 65.6 47 61.5' },
  { tone: 'accent', d: 'M58.6 35.5V65.5' },
  { tone: 'light', d: 'M68 34.5C77 32.5 82.5 38 82.5 45V65.5' },
];

// The logo's own colours (the blue exploration), used for the static
// favicon files.
export const MARK_BRAND_COLORS = { tile: '#1a1714', accent: '#4aa8d8', light: '#f5f1e8' };

export function markSvg(colors: { tile: string; accent: string; light: string }) {
  const paths = MARK_PATHS.map(
    (p) => `<path stroke="${p.tone === 'accent' ? colors.accent : colors.light}" d="${p.d}"/>`,
  ).join('');
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEWBOX}">` +
    `<rect width="100" height="100" rx="${MARK_TILE_RADIUS}" fill="${colors.tile}"/>` +
    `<g fill="none" stroke-linecap="round" stroke-width="${MARK_STROKE_WIDTH}">${paths}</g></svg>`
  );
}
