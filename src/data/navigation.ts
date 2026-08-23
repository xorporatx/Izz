import type { ComponentType } from "react";
import { BarChart2, CircleCheck, ClipboardCheck, Expand } from "../components/icons";
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
