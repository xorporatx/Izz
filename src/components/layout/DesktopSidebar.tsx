import { menuItems } from "../../data/navigation";
import { Menu, Plus } from "../icons";
import "./DesktopSidebar.css";

export interface DesktopSidebarProps {
  venue: string;
  active: string;
  onSelect: (id: string) => void;
  /** Opens the full category menu. */
  onOpenMenu: () => void;
}

/**
 * Persistent navigation, fixed to the right because the product is RTL.
 *
 * 264px from 1200px up; between 768px and 1199px it collapses to an 84px
 * icon rail. Below 768px it is not rendered at all — the mobile bottom bar
 * and header take over.
 *
 * It lists every category off `menuItems`, the same source as the burger
 * menu, so the two never drift. The bottom bar keeps the four-item
 * `navItems` — it has two slots either side of the ＋ and cannot grow.
 */
export function DesktopSidebar({
  venue,
  active,
  onSelect,
  onOpenMenu,
}: DesktopSidebarProps) {
  return (
    <aside className="sidebar" aria-label="ניווט ראשי">
      <div className="sidebar__brand">
        <span className="sidebar__wordmark">
          <span className="sidebar__name">IzzBizz</span>
          <span className="sidebar__venue">{venue}</span>
        </span>
      </div>

      <button
        type="button"
        className="sidebar__item sidebar__burger"
        title="תפריט"
        aria-haspopup="dialog"
        onClick={onOpenMenu}
      >
        <Menu size={20} className="sidebar__icon" />
        <span className="sidebar__label">תפריט</span>
      </button>

      <ul className="sidebar__nav">
        {menuItems.map(({ id, label, Icon, badge }) => (
          <li key={id}>
            <button
              type="button"
              className={`sidebar__item${
                id === active ? " sidebar__item--active" : ""
              }`}
              aria-current={id === active ? "page" : undefined}
              title={label}
              onClick={() => onSelect(id)}
            >
              <Icon size={20} className="sidebar__icon" />
              <span className="sidebar__label">{label}</span>
              {badge && <span className="sidebar__badge">{badge}</span>}
            </button>
          </li>
        ))}
      </ul>

      <button type="button" className="sidebar__action" title="פעולה חדשה">
        <Plus size={16} />
        <span className="sidebar__label">פעולה חדשה</span>
      </button>
    </aside>
  );
}
