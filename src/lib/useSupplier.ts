import { useEffect, useState } from "react";
import { suppliers, type Supplier } from "../data/suppliers";

/**
 * Supplier lookup for the detail pages.
 *
 * The data is local, but the detail page is reached by URL and will eventually
 * be served by an API, so the read is modelled as asynchronous from the start:
 * the page renders a skeleton on a cold open and the resolved supplier is
 * cached, so returning to one it has already seen is instant rather than
 * flashing the skeleton a second time.
 */

/** Stands in for network time on the first read of a supplier. */
const LATENCY_MS = 260;

const cache = new Map<string, Supplier | null>();

function loadSupplier(id: string): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      cache.set(id, suppliers.find((entry) => entry.id === id) ?? null);
      resolve();
    }, LATENCY_MS);
  });
}

export type SupplierState =
  /** Nothing to show yet — render the skeleton. */
  | { status: "loading"; supplier: null }
  | { status: "ready"; supplier: Supplier }
  /** The id in the URL matches no supplier. */
  | { status: "missing"; supplier: null };

function readCache(id: string): SupplierState {
  const cached = cache.get(id);
  if (cached === undefined) return { status: "loading", supplier: null };
  if (cached === null) return { status: "missing", supplier: null };
  return { status: "ready", supplier: cached };
}

export function useSupplier(id: string): SupplierState {
  // The cache is the source of truth and is read during render, so a supplier
  // that is already resolved needs no state change to show. This counter only
  // exists to re-render once a pending load lands.
  const [, setResolved] = useState(0);

  useEffect(() => {
    if (cache.has(id)) return;

    let active = true;
    loadSupplier(id).then(() => {
      if (active) setResolved((count) => count + 1);
    });
    return () => {
      active = false;
    };
  }, [id]);

  return readCache(id);
}
