// Cookie consent (PPTDP art. 22). Same cookie name and values as the App's
// lib/cookie-consent.ts: the choice is shared across enndor.ai and
// app.enndor.ai. index.html loads PostHog and the Meta Pixel only when it is
// "all".

export const CONSENT_COOKIE = 'enndor_cookie_consent';
export type CookieConsent = 'all' | 'necessary';

const OPEN_SETTINGS_EVENT = 'enndor:open-cookie-settings';
const ONE_YEAR_S = 60 * 60 * 24 * 365;

declare global {
  interface Window {
    __enndorLoadAnalytics?: () => void;
  }
}

function cookieDomain() {
  const host = window.location.hostname;
  return host === 'enndor.ai' || host.endsWith('.enndor.ai') ? '; domain=.enndor.ai' : '';
}

export function readCookieConsent(): CookieConsent | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(all|necessary)`));
  return (match?.[1] as CookieConsent | undefined) ?? null;
}

export function writeCookieConsent(value: CookieConsent) {
  const secure = window.location.protocol === 'https:' ? '; secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${ONE_YEAR_S}; samesite=lax${cookieDomain()}${secure}`;
}

/** Removes analytics/advertising cookies already set (on revocation). */
export function clearTrackingCookies() {
  for (const entry of document.cookie.split('; ')) {
    const name = entry.split('=')[0];
    if (name.startsWith('ph_') || name === '_fbp' || name === '_fbc') {
      for (const domain of ['', cookieDomain()]) {
        document.cookie = `${name}=; path=/; max-age=0${domain}`;
      }
    }
  }
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

export function onOpenCookieSettings(listener: () => void) {
  window.addEventListener(OPEN_SETTINGS_EVENT, listener);
  return () => window.removeEventListener(OPEN_SETTINGS_EVENT, listener);
}
