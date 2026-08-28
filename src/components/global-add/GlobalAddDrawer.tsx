import type { FormEvent, ReactNode } from "react";
import type { GlobalAddTabId } from "../../data/globalAdd";
import { globalAddTabs } from "../../data/globalAdd";
import { ArrowLeft, X } from "../icons";
import { Button } from "../ui/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "../ui/Drawer";
import "./GlobalAddDrawer.css";

export interface GlobalAddDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: GlobalAddTabId;
  onTabChange: (tab: GlobalAddTabId) => void;
  submitLabel?: string;
  submitting: boolean;
  error?: string;
  onSubmit: () => void;
  children: ReactNode;
}

/**
 * The ＋ button's destination: "הזנת נתונים יומית" (frame 740:34425).
 *
 * One drawer, one `<form>`, four tabs — הכנסות / פודקוסט / הוצאות / לייבור —
 * that swap the fields without closing the overlay or losing the header and
 * footer. It is built directly on the project's `Drawer` rather than on
 * `FormDrawer`: that shell assumes a single fixed title, and this one's
 * title never changes while its content does, driven by the tab strip
 * instead.
 *
 * The shell owns nothing about *what* a tab records — that is each Tab*Form
 * component, passed in as `children` — only the open/close/tab/submit
 * mechanics every tab shares.
 */
export function GlobalAddDrawer({
  open,
  onOpenChange,
  activeTab,
  onTabChange,
  submitLabel = "שמור",
  submitting,
  error,
  onSubmit,
  children,
}: GlobalAddDrawerProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    onSubmit();
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="global-add" aria-describedby={undefined}>
        <form className="global-add__form" onSubmit={handleSubmit} noValidate>
          <header className="global-add__header">
            <DrawerClose className="global-add__close" aria-label="סגירה">
              <X size={20} />
            </DrawerClose>
            <DrawerTitle className="global-add__title">
              הזנת נתונים יומית
            </DrawerTitle>
          </header>

          <div
            className="global-add__tabs"
            role="tablist"
            aria-label="סוג הזנה"
          >
            {globalAddTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={tab.id === activeTab}
                className={`global-add__tab${
                  tab.id === activeTab ? " global-add__tab--active" : ""
                }`}
                onClick={() => onTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="global-add__body">{children}</div>

          <footer className="global-add__footer">
            {error && (
              <p className="global-add__error" role="alert">
                {error}
              </p>
            )}

            <Button type="submit" variant="primary" block disabled={submitting}>
              {submitting ? "שומר…" : submitLabel}
              {!submitting && <ArrowLeft size={16} />}
            </Button>
          </footer>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
