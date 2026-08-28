import { useSyncExternalStore } from "react";

/**
 * Records made through the ＋ → "הזנת נתונים יומית" flow.
 *
 * הכנסות and הוצאות have no list screen anywhere in the product yet — Figma
 * frame 740:34425 draws the entry form only — so there is nowhere honest to
 * route their effect except this log. פודקוסט and לייבור are different:
 * submitting them also writes into `useSuppliers` / `useDepartments`, the
 * stores their own list pages already read, so those two have a visible
 * "current page updates" result. This store exists so all four still share
 * one real mechanism rather than three going nowhere and one going somewhere.
 */

export interface IncomeEntry {
  kind: "income";
  id: string;
  date: string;
  netSales: number;
  grossSales: number;
  credit: number;
  cash: number;
  transfers: number;
  checks: number;
  note: string;
  external: { cibus: number; wolt: number; tenbis: number; bit: number };
}

export interface PodcastEntry {
  kind: "podcast";
  id: string;
  date: string;
  category: string;
  supplierId: string;
  amountWithVat: number;
  amountWithoutVat: number;
  invoiceNumber: string;
  note: string;
}

export interface ExpenseEntry {
  kind: "expense";
  id: string;
  date: string;
  expenseType: string;
  amount: number;
  supplierOrDetail: string;
  note: string;
}

export interface LaborEntry {
  kind: "labor";
  id: string;
  date: string;
  departmentId: string;
  employeeId: string;
  rate: number;
  netHours: number;
  hours: number;
  percentage: number;
  targetAmount: number;
}

export type DailyEntry = IncomeEntry | PodcastEntry | ExpenseEntry | LaborEntry;

let entries: DailyEntry[] = [];

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

const LATENCY_MS = 420;

function wait(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

let sequence = 1;

export function useDailyEntries(): DailyEntry[] {
  return useSyncExternalStore(
    subscribe,
    () => entries,
    () => [],
  );
}

async function record<T extends DailyEntry>(entry: Omit<T, "id">): Promise<T> {
  await wait(LATENCY_MS);
  sequence += 1;
  const full = { ...entry, id: `entry-${sequence}` } as T;
  entries = [...entries, full];
  emit();
  return full;
}

export const createIncomeEntry = (input: Omit<IncomeEntry, "id" | "kind">) =>
  record<IncomeEntry>({ ...input, kind: "income" });

export const createPodcastEntry = (input: Omit<PodcastEntry, "id" | "kind">) =>
  record<PodcastEntry>({ ...input, kind: "podcast" });

export const createExpenseEntry = (input: Omit<ExpenseEntry, "id" | "kind">) =>
  record<ExpenseEntry>({ ...input, kind: "expense" });

export const createLaborEntry = (input: Omit<LaborEntry, "id" | "kind">) =>
  record<LaborEntry>({ ...input, kind: "labor" });
