declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

/**
 * Fires a Meta Custom Event — for actions with no Meta standard-event
 * equivalent. Must go through `trackCustom`, not `track`, which is
 * reserved for official Standard Event names.
 */
export const trackMetaCustomEvent = (eventName: string) => {
  window.fbq?.("trackCustom", eventName);
};
