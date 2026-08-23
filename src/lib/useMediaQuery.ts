import { useSyncExternalStore } from "react";

/**
 * Subscribes to a media query.
 *
 * Layout is CSS-only everywhere in this project. This exists for the one case
 * CSS cannot express: choosing between two different overlay primitives — an
 * anchored Radix popover on desktop and a vaul bottom sheet on touch — which
 * is the pattern shadcn documents for responsive pickers.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false, // server / pre-hydration: assume the mobile sheet
  );
}
