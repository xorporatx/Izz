import type { ComponentType } from "react";
import {
  BarChart2,
  BellDot,
  ChartLine,
  CircleCheck,
  CircleUser,
  ClipboardCheck,
  ClipboardList,
  Expand,
  FileUp,
  Platter,
  Receipt,
  Settings,
  UserCheck,
} from "../components/icons";
import type { IconProps } from "../components/icons";

export interface NavItem {
  id: string;
  label: string;
  Icon: ComponentType<IconProps>;
}

/**
 * Single source of truth for navigation, shared by the mobile bottom bar and
 * the desktop sidebar.
 *
 * The order is the RTL reading order of the Figma bottom bar: right to left,
 * בקרה → יעדים → (the ＋ action) → הוצאות → משימות. The mobile bar splits the
 * list either side of the action button; the sidebar stacks it top to bottom.
 */
export const navItems: NavItem[] = [
  { id: "control", label: "בקרה", Icon: BarChart2 },
  { id: "goals", label: "יעדים", Icon: CircleCheck },
  { id: "expenses", label: "הוצאות", Icon: Expand },
  { id: "tasks", label: "משימות", Icon: ClipboardCheck },
];

export interface MenuItem extends NavItem {
  /** Small pill after the label — the Figma menu marks קבלות as new. */
  badge?: string;
}

/**
 * The full category list behind the burger.
 *
 * The four ids that also appear in `navItems` are deliberately the same
 * strings, so selecting בקרה / הוצאות / יעדים / משימות from the menu moves the
 * sidebar and bottom-bar highlight with it. The rest are destinations the
 * dashboard does not render yet; they select and close like the others.
 */
export const menuItems: MenuItem[] = [
  { id: "control", label: "בקרה", Icon: BarChart2 },
  { id: "food-cost", label: "פודקוסט", Icon: Platter },
  { id: "labor-cost", label: "לייבור קוסט", Icon: UserCheck },
  { id: "expenses", label: "הוצאות", Icon: Expand },
  { id: "settings", label: "הגדרות", Icon: Settings },
  { id: "profile", label: "פרופיל", Icon: CircleUser },
  { id: "tasks", label: "כל המשימות", Icon: ClipboardList },
  { id: "uploads", label: "העלאת קבצים", Icon: FileUp },
  { id: "notifications", label: "התראות", Icon: BellDot },
  { id: "goals", label: "יעדים", Icon: ChartLine },
  { id: "receipts", label: "קבלות", Icon: Receipt, badge: "חדש" },
];
