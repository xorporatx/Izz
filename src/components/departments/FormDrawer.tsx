import type { FormEvent, ReactNode } from "react";
import { ArrowLeft } from "../icons";
import { Button } from "../ui/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "../ui/Drawer";
import "./FormDrawer.css";

export interface FormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** Optional line under the title — used to name the owning department. */
  description?: string;
  /** Primary CTA label, e.g. "הוסף מחלקה". */
  submitLabel: string;
  submitting: boolean;
  /** Whole-form failure, shown above the actions. */
  error?: string;
  onSubmit: () => void;
  children: ReactNode;
}

/**
 * The overlay both creation forms live in.
 *
 * It is the project's existing Drawer, anchored right like the main menu, so
 * the flow uses the application's own overlay pattern rather than
 * introducing a dialog system alongside it. Everything inside is one `<form>`,
 * which is what makes Enter submit and the browser's own required-field
 * semantics available.
 */
export function FormDrawer({
  open,
  onOpenChange,
  title,
  description,
  submitLabel,
  submitting,
  error,
  onSubmit,
  children,
}: FormDrawerProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    onSubmit();
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      {/* Radix wants a description or an explicit opt-out; a form without a
          subtitle takes the opt-out rather than an invented sentence. */}
      <DrawerContent className="form-drawer" aria-describedby={undefined}>
        <form className="form-drawer__form" onSubmit={handleSubmit} noValidate>
          <header className="form-drawer__header">
            <DrawerTitle className="form-drawer__title">{title}</DrawerTitle>
            {description && (
              <DrawerDescription className="form-drawer__description">
                {description}
              </DrawerDescription>
            )}
          </header>

          <div className="form-drawer__body">{children}</div>

          <footer className="form-drawer__footer">
            {error && (
              <p className="form-drawer__error" role="alert">
                {error}
              </p>
            )}

            <Button type="submit" variant="primary" block disabled={submitting}>
              {submitting ? "שומר…" : submitLabel}
              {!submitting && <ArrowLeft size={16} />}
            </Button>

            <DrawerClose asChild>
              <Button type="button" variant="secondary" block>
                חזור
              </Button>
            </DrawerClose>
          </footer>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
