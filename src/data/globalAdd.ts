/**
 * The ＋ button's flow: "הזנת נתונים יומית", from Figma frame 740:34425.
 *
 * One drawer, four tabs — הכנסות / פודקוסט / הוצאות / לייבור — each recording
 * a different kind of daily figure. The tab order below is the frame's own
 * right-to-left order; it is also the array order, since the tab strip lays
 * out in document order under `dir="rtl"`.
 */

export type GlobalAddTabId = "income" | "podcast" | "expense" | "labor";

export interface GlobalAddTab {
  id: GlobalAddTabId;
  label: string;
}

export const globalAddTabs: GlobalAddTab[] = [
  { id: "income", label: "הכנסות" },
  { id: "podcast", label: "פודקוסט" },
  { id: "expense", label: "הוצאות" },
  { id: "labor", label: "לייבור" },
];

export interface Option {
  id: string;
  label: string;
}

/** "קטגוריה" on the פודקוסט tab. */
export const podcastCategories: Option[] = [
  { id: "vegetables", label: "ירקות ופירות" },
  { id: "meat", label: "בשר ודגים" },
  { id: "dairy", label: "מוצרי חלב" },
  { id: "dry-goods", label: "מוצרי יבש" },
  { id: "beverages", label: "משקאות" },
  { id: "packaging", label: "אריזות" },
];

/** "סוג הוצאה" on the הוצאות tab. */
export const expenseTypes: Option[] = [
  { id: "rent", label: "שכירות" },
  { id: "utilities", label: "חשמל ומים" },
  { id: "maintenance", label: "אחזקה ותיקונים" },
  { id: "marketing", label: "שיווק ופרסום" },
  { id: "equipment", label: "ציוד" },
  { id: "other", label: "אחר" },
];

/**
 * "מחלקה" on the הוסף ספק חדש form — the supplier's own billing category.
 * Deliberately not `useDepartments`' HR departments: a supplier is billed
 * under a category, not managed inside an org chart.
 */
export const supplierCategories: Option[] = [
  { id: "kitchen", label: "מטבח" },
  { id: "beverages", label: "משקאות" },
  { id: "cleaning", label: "ניקיון ותחזוקה" },
  { id: "packaging", label: "אריזות" },
  { id: "general", label: "כללי" },
];
