/**
 * Supplier content for the פודקוסט breakdown.
 *
 * Figures, labels and copy come from the Figma frame 648:6345
 * ("פודקסט - ספקים") and are reproduced exactly as drawn, including where the
 * design repeats itself: both suppliers carry the same figures and the same
 * five order rows, because both cards in the frame do.
 *
 * Values are stored pre-formatted, as the design renders them. Two of the
 * design's own inconsistencies survive here rather than being silently
 * corrected: the card reads "5 הזמנות" while its totals row reads
 * "7 הזמנות", and that totals row sums to more than the five rows above it.
 *
 * The first two entries are the frame's own, repetition included. The rest
 * are a realistic spread for the same venue — a supplier list of two
 * identical cards exercises neither the tone dots, the progress bars, nor the
 * short-list and single-order cases the page has to handle.
 */

import type { Tone } from "./dashboard";

/** One line in a supplier's orders table. */
export interface SupplierOrder {
  /** Stable key. The design shows the same reference on every row. */
  id: string;
  /** Order reference as displayed, e.g. "#10251". */
  reference: string;
  /** Share of the period's food cost, e.g. "2%". */
  share: string;
  /** Weight in kilograms, e.g. "1.5". */
  weight: string;
  /** Line cost, already formatted, e.g. "₪4,775". */
  cost: string;
}

/** The bold summary row that closes the orders table. */
export interface SupplierOrdersTotals {
  /** Right-hand cell — "7 הזמנות". */
  label: string;
  share: string;
  weight: string;
  cost: string;
}

export interface Supplier {
  /** URL segment — `/suppliers/:id`. */
  id: string;
  /** Display name, e.g. "יונימרקט". */
  name: string;
  /** Status dot beside the name. */
  tone: Tone;
  /** Number of orders in the period, drives "5 הזמנות". */
  orderCount: number;
  /** Headline spend, already formatted. */
  spend: string;
  /** Share of total food cost, e.g. "0.9%". */
  share: string;
  /** 0–100, drives the progress bar. */
  progress: number;
  /** Every order in the period. Empty is a valid state. */
  orders: SupplierOrder[];
  totals: SupplierOrdersTotals;
}

export const suppliers: Supplier[] = [
  {
    id: "unimarket",
    name: "יונימרקט",
    tone: "success",
    orderCount: 5,
    spend: "₪30,887",
    share: "0.9%",
    progress: 75,
    orders: [
      { id: "unimarket-1", reference: "#10251", share: "2%", weight: "2", cost: "₪4,775" },
      { id: "unimarket-2", reference: "#10251", share: "1.0%", weight: "1.5", cost: "₪5,125" },
      { id: "unimarket-3", reference: "#10251", share: "1.0%", weight: "1", cost: "₪4,450" },
      { id: "unimarket-4", reference: "#10251", share: "1.0%", weight: "2", cost: "₪3,550" },
      { id: "unimarket-5", reference: "#10251", share: "1.0%", weight: "2", cost: "₪3,550" },
    ],
    totals: {
      label: "7 הזמנות",
      share: "22%",
      weight: "20",
      cost: "₪22,388",
    },
  },
  {
    id: "zano-dagim",
    name: "זאנו דגים",
    tone: "success",
    orderCount: 5,
    spend: "₪30,887",
    share: "0.9%",
    progress: 75,
    orders: [
      { id: "zano-1", reference: "#10251", share: "2%", weight: "2", cost: "₪4,775" },
      { id: "zano-2", reference: "#10251", share: "1.0%", weight: "1.5", cost: "₪5,125" },
      { id: "zano-3", reference: "#10251", share: "1.0%", weight: "1", cost: "₪4,450" },
      { id: "zano-4", reference: "#10251", share: "1.0%", weight: "2", cost: "₪3,550" },
      { id: "zano-5", reference: "#10251", share: "1.0%", weight: "2", cost: "₪3,550" },
    ],
    totals: {
      label: "7 הזמנות",
      share: "22%",
      weight: "20",
      cost: "₪22,388",
    },
  },
  {
    id: "yarkot-hasade",
    name: "ירקות השדה",
    tone: "warning",
    orderCount: 12,
    spend: "₪18,240",
    share: "0.6%",
    progress: 58,
    orders: [
      { id: "yarkot-1", reference: "#10412", share: "0.9%", weight: "14", cost: "₪2,180" },
      { id: "yarkot-2", reference: "#10398", share: "0.7%", weight: "11.5", cost: "₪1,640" },
      { id: "yarkot-3", reference: "#10377", share: "1.2%", weight: "18", cost: "₪2,910" },
      { id: "yarkot-4", reference: "#10355", share: "0.5%", weight: "8", cost: "₪1,220" },
    ],
    totals: {
      label: "12 הזמנות",
      share: "14%",
      weight: "126",
      cost: "₪18,240",
    },
  },
  {
    id: "basar-hagalil",
    name: "בשר הגליל",
    tone: "danger",
    orderCount: 8,
    spend: "₪41,505",
    share: "1.4%",
    progress: 92,
    orders: [
      { id: "basar-1", reference: "#10440", share: "2.4%", weight: "32", cost: "₪9,850" },
      { id: "basar-2", reference: "#10421", share: "1.8%", weight: "24", cost: "₪7,320" },
      { id: "basar-3", reference: "#10402", share: "2.1%", weight: "28", cost: "₪8,640" },
      { id: "basar-4", reference: "#10381", share: "1.5%", weight: "19", cost: "₪5,910" },
      { id: "basar-5", reference: "#10360", share: "1.1%", weight: "15", cost: "₪4,470" },
    ],
    totals: {
      label: "8 הזמנות",
      share: "31%",
      weight: "168",
      cost: "₪41,505",
    },
  },
  {
    id: "mashkaot-gal",
    name: "משקאות גל",
    tone: "success",
    orderCount: 3,
    spend: "₪6,120",
    share: "0.2%",
    progress: 24,
    orders: [
      { id: "gal-1", reference: "#10433", share: "0.3%", weight: "46", cost: "₪2,640" },
      { id: "gal-2", reference: "#10391", share: "0.2%", weight: "38", cost: "₪1,980" },
      { id: "gal-3", reference: "#10344", share: "0.2%", weight: "31", cost: "₪1,500" },
    ],
    totals: {
      label: "3 הזמנות",
      share: "5%",
      weight: "115",
      cost: "₪6,120",
    },
  },
  {
    /* One order in the period — the short-list case the preview has to hold. */
    id: "arizot-plus",
    name: "אריזות פלוס",
    tone: "success",
    orderCount: 1,
    spend: "₪1,340",
    share: "0.1%",
    progress: 9,
    orders: [
      { id: "arizot-1", reference: "#10428", share: "0.1%", weight: "6", cost: "₪1,340" },
    ],
    totals: {
      label: "הזמנה אחת",
      share: "1%",
      weight: "6",
      cost: "₪1,340",
    },
  },
  {
    /* Signed this period but nothing ordered yet — the empty-table case. */
    id: "tachanot-yerushalayim",
    name: "טחנות ירושלים",
    tone: "success",
    orderCount: 0,
    spend: "₪0",
    share: "0%",
    progress: 0,
    orders: [],
    totals: {
      label: "אין הזמנות",
      share: "0%",
      weight: "0",
      cost: "₪0",
    },
  },
];

/** Period totals shown above the supplier list, from the same Figma frame. */
export const foodCost = {
  title: "פודקוסט — מבטח כללי",
  /**
   * The shekel sign trails the digits, as the frame draws it. Order here is
   * what decides it: "₪2,633" and "2,633₪" are both one left-to-right bidi
   * run, so the element's `direction` cannot flip them — only the string can.
   */
  spend: { label: "סה״כ הוצאה", value: "2,633₪", caption: "מ-303,865₪ מכירות" },
  /** `tone: "good"` turns the figure and its caption green, as in the frame. */
  ratio: {
    label: "פוד קוסט כולל",
    value: "0.9%",
    caption: "תקין",
    tone: "good",
  },
} as const;

/**
 * "אין הזמנות" / "הזמנה אחת" / "12 הזמנות".
 *
 * Hebrew does not take the plural at one, and reads better with a word than
 * a zero, so the count cannot simply be interpolated into "N הזמנות".
 */
export function orderCountLabel(count: number): string {
  if (count === 0) return "אין הזמנות";
  if (count === 1) return "הזמנה אחת";
  return `${count} הזמנות`;
}
