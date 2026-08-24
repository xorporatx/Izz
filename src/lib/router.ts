import { useSyncExternalStore } from "react";

/**
 * The app's routing.
 *
 * Four screens and one linear stack do not justify a routing dependency, so
 * this is the History API directly: `pushState` for a forward move, the
 * browser's own `popstate` for back. The address bar, the hardware/browser
 * back button and an in-app back control therefore all drive the same state,
 * and a supplier page is a real, shareable URL rather than a piece of
 * component state.
 */

export type Route =
  | { kind: "dashboard" }
  | { kind: "food-cost" }
  | { kind: "supplier"; supplierId: string }
  | { kind: "supplier-orders"; supplierId: string };

export const paths = {
  dashboard: "/",
  foodCost: "/food-cost",
  supplier: (id: string) => `/suppliers/${encodeURIComponent(id)}`,
  supplierOrders: (id: string) => `/suppliers/${encodeURIComponent(id)}/orders`,
};

/** Unknown paths fall back to the dashboard rather than rendering nothing. */
export function parseRoute(pathname: string): Route {
  const segments = pathname.split("/").filter(Boolean).map(decodeURIComponent);

  if (segments[0] === "food-cost" && segments.length === 1) {
    return { kind: "food-cost" };
  }

  if (segments[0] === "suppliers" && segments[1]) {
    if (segments[2] === "orders") {
      return { kind: "supplier-orders", supplierId: segments[1] };
    }
    if (segments.length === 2) {
      return { kind: "supplier", supplierId: segments[1] };
    }
  }

  return { kind: "dashboard" };
}

/**
 * How deep the route sits in the stack. The page transition compares the
 * previous depth with the next one to decide which way to slide.
 */
export function routeDepth(route: Route): number {
  switch (route.kind) {
    case "dashboard":
    case "food-cost":
      return 0;
    case "supplier":
      return 1;
    case "supplier-orders":
      return 2;
  }
}

const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  window.addEventListener("popstate", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
  };
}

function getPathname() {
  return window.location.pathname;
}

/** Re-renders on every history change, whichever side caused it. */
export function usePathname(): string {
  return useSyncExternalStore(subscribe, getPathname, () => paths.dashboard);
}

export function navigate(to: string, options: { replace?: boolean } = {}) {
  if (to === window.location.pathname) return;

  if (options.replace) {
    window.history.replaceState(null, "", to);
  } else {
    window.history.pushState(null, "", to);
  }

  // `pushState` does not fire `popstate`, so subscribers are told directly.
  listeners.forEach((listener) => listener());
}

/**
 * Steps back through history when there is somewhere to go back to, and falls
 * back to `fallback` when the supplier page was opened cold from a deep link.
 */
export function back(fallback: string = paths.foodCost) {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }
  navigate(fallback, { replace: true });
}
