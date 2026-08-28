import { navItems } from "../../data/navigation";
import { Plus } from "../icons";
import "./MobileBottomNav.css";

export interface MobileBottomNavProps {
  active: string;
  onSelect: (id: string) => void;
  /** Opens the global add flow — "הזנת נתונים יומית". */
  onOpenAdd: () => void;
}

/**
 * The floating bottom bar from Figma. Two nav pairs either side of the
 * circular ＋ action; RTL flow puts בקרה at the far right and משימות at the
 * far left, exactly as drawn.
 */
export function MobileBottomNav({ active, onSelect, onOpenAdd }: MobileBottomNavProps) {
  const [leading, trailing] = [navItems.slice(0, 2), navItems.slice(2)];

  const renderItem = ({ id, label, Icon }: (typeof navItems)[number]) => (
    <button
      key={id}
      type="button"
      className={`mobile-nav__item${
        id === active ? " mobile-nav__item--active" : ""
      }`}
      aria-current={id === active ? "page" : undefined}
      onClick={() => onSelect(id)}
    >
      <Icon size={22} />
      <span className="mobile-nav__label">{label}</span>
    </button>
  );

  return (
    <nav className="mobile-nav" aria-label="ניווט ראשי">
      <div className="mobile-nav__group">{leading.map(renderItem)}</div>

      <button
        type="button"
        className="mobile-nav__action"
        aria-label="פעולה חדשה"
        aria-haspopup="dialog"
        onClick={onOpenAdd}
      >
        <Plus size={16} />
      </button>

      <div className="mobile-nav__group">{trailing.map(renderItem)}</div>
    </nav>
  );
}
