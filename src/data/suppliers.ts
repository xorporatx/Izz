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
];

/** Period totals shown above the supplier list, from the same Figma frame. */
export const foodCost = {
  title: "פודקוסט — מבטח כללי",
  spend: { label: "סה״כ הוצאה", value: "₪2,633", caption: "מ-₪303,865 מכירות" },
  ratio: { label: "פוד קוסט כולל", value: "0.9%", caption: "תקין" },
} as const;
