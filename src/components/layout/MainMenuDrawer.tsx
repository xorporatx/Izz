import { currentUser } from "../../data/dashboard";
import { menuItems } from "../../data/navigation";
import { ChevronLeft, X } from "../icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "../ui/Drawer";
import "./MainMenuDrawer.css";

export interface MainMenuDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  venue: string;
  active: string;
  onSelect: (id: string) => void;
}

/**
 * The full category list, opened by the burger in the sidebar and in the
 * mobile header.
 *
 * It is a right-anchored vaul drawer — the product is RTL, so the panel
 * enters from the same edge the sidebar lives on and the dashboard dims
 * away to its left. `direction="right"` resolves to the physical right edge
 * regardless of `dir`, which is what the Figma frame shows.
 */
export function MainMenuDrawer({
  open,
  onOpenChange,
  venue,
  active,
  onSelect,
}: MainMenuDrawerProps) {
  const select = (id: string) => {
    onSelect(id);
    onOpenChange(false);
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="menu" aria-describedby={undefined}>
        <div className="menu__top">
          <DrawerClose className="menu__close" aria-label="סגירת התפריט">
            <X size={22} />
          </DrawerClose>
        </div>

        <header className="menu__identity">
          <DrawerTitle className="menu__greeting">
            שלום {currentUser.name},
          </DrawerTitle>
          <DrawerDescription className="menu__venue">{venue}</DrawerDescription>
        </header>

        <button type="button" className="menu__switch">
          <span className="menu__switch-label">החלף סניף</span>
          <ChevronLeft size={20} className="menu__switch-chevron" />
        </button>

        <nav className="menu__nav" aria-label="כל הקטגוריות">
          <ul className="menu__list">
            {menuItems.map(({ id, label, Icon, badge }) => (
              <li key={id}>
                <button
                  type="button"
                  className={`menu__item${
                    id === active ? " menu__item--active" : ""
                  }`}
                  aria-current={id === active ? "page" : undefined}
                  onClick={() => select(id)}
                >
                  <Icon size={22} className="menu__icon" />
                  <span className="menu__label">{label}</span>
                  {badge && <span className="menu__badge">{badge}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="menu__account">
          <button type="button" className="menu__user">
            <span className="menu__avatar" aria-hidden="true">
              {currentUser.name.charAt(0)}
            </span>
            <span className="menu__user-text">
              <span className="menu__user-action">החלף משתמש</span>
              <span className="menu__user-email">{currentUser.email}</span>
            </span>
            <ChevronLeft size={20} className="menu__user-chevron" />
          </button>
        </footer>
      </DrawerContent>
    </Drawer>
  );
}
