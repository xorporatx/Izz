import { useSyncExternalStore } from "react";
import { seedSuppliers, type Supplier } from "../data/suppliers";

/**
 * The suppliers store.
 *
 * Mirrors `useDepartments.ts`: a supplier created on the פודקוסט tab of the
 * global Add flow has to show up in the פודקוסט list and on its own page,
 * neither of which the form owns, so the data lives in a module-level store
 * read through `useSyncExternalStore` rather than in either component.
 */

let suppliers: Supplier[] = seedSuppliers;

const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

function emit() {
  listeners.forEach((listener) => listener());
}

/** Stands in for network time, matching `useDepartments`'s treatment. */
const LATENCY_MS = 420;

function wait(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

let supplierSequence = 9200;

export function useSuppliers(): Supplier[] {
  return useSyncExternalStore(
    subscribe,
    () => suppliers,
    () => seedSuppliers,
  );
}

/**
 * Non-reactive read for `useSupplier`'s own async cache, which looks a
 * supplier up by id rather than subscribing to the whole list.
 */
export function getSuppliers(): Supplier[] {
  return suppliers;
}

export interface NewSupplier {
  name: string;
  businessNumber: string;
  email: string;
  phone: string;
  category: string;
}

export async function createSupplier(input: NewSupplier): Promise<Supplier> {
  await wait(LATENCY_MS);

  supplierSequence += 1;

  const supplier: Supplier = {
    id: `supplier-${supplierSequence}`,
    name: input.name.trim(),
    tone: "success",
    orderCount: 0,
    spend: "₪0",
    share: "0%",
    progress: 0,
    orders: [],
    totals: { label: "אין הזמנות", share: "0%", weight: "0", cost: "₪0" },
    businessNumber: input.businessNumber.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    category: input.category,
    supplierNumber: String(supplierSequence),
    isNew: true,
  };

  suppliers = [...suppliers, supplier];
  emit();
  return supplier;
}

/** The supplier number the form previews before the supplier exists. */
export function nextSupplierNumber(): string {
  return String(supplierSequence + 1);
}
