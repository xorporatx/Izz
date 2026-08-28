import { Menu, Plus } from "../icons";
import { Logo } from "../ui/Logo";
import "./DesktopSidebar.css";

export interface DesktopSidebarProps {
  /** Opens the full category menu. */
  onOpenMenu: () => void;
  /** Opens the global add flow — "הזנת נתונים יומית". */
  onOpenAdd: () => void;
}

/**
 * Persistent navigation rail, fixed to the right because the product is RTL.
 *
 * Collapsed at every size and never expands: it carries the brand mark, the
 * burger, and the one primary action. Every destination lives in the menu the
 * burger opens, so there is a single list of categories rather than a rail
 * that duplicates it.
 *
 * Below 768px it is not rendered at all — the mobile bottom bar and header
 * take over.
 */
export function DesktopSidebar({ onOpenMenu, onOpenAdd }: DesktopSidebarProps) {
  return (
    <aside className="sidebar" aria-label="ניווט ראשי">
      <Logo size={36} className="sidebar__mark" />

      <button
        type="button"
        className="sidebar__item sidebar__burger"
        title="תפריט"
        aria-label="תפריט"
        aria-haspopup="dialog"
        onClick={onOpenMenu}
      >
        <Menu size={20} className="sidebar__icon" />
      </button>

      <span className="sidebar__spacer" aria-hidden="true" />

      <button
        type="button"
        className="sidebar__action"
        title="פעולה חדשה"
        aria-label="פעולה חדשה"
        aria-haspopup="dialog"
        onClick={onOpenAdd}
      >
        <Plus size={18} />
      </button>
    </aside>
  );
}
