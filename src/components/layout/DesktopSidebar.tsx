import { navItems } from "../../data/navigation";
import { BarChart2, Plus } from "../icons";
import "./DesktopSidebar.css";

export interface DesktopSidebarProps {
  venue: string;
  active: string;
  onSelect: (id: string) => void;
}

/**
 * Persistent navigation, fixed to the right because the product is RTL.
 *
 * 264px from 1200px up; between 768px and 1199px it collapses to an 84px
 * icon rail. Below 768px it is not rendered at all — the mobile bottom bar
 * and header take over.
 */
export function DesktopSidebar({
  venue,
  active,
  onSelect,
}: DesktopSidebarProps) {
  return (
    <aside className="sidebar" aria-label="ניווט ראשי">
      <div className="sidebar__brand">
        <span className="sidebar__mark" aria-hidden="true">
          <BarChart2 size={18} />
        </span>
        <span className="sidebar__wordmark">
          <span className="sidebar__name">IzzBizz</span>
          <span className="sidebar__venue">{venue}</span>
        </span>
      </div>

      <ul className="sidebar__nav">
        {navItems.map(({ id, label, Icon }) => (
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
