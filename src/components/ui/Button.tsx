import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * `primary`   — emerald/900 pill, the single strong action on a card.
   * `secondary` — sunken fill, 14px radius, used for "הצג פרטים" / "הצג הכל".
   * `ghost`     — chrome-only, for icon buttons in the header.
   */
  variant?: "primary" | "secondary" | "ghost";
  /** Stretches the button to the width of its container. */
  block?: boolean;
  /** Leading icon — sits at the inline-start edge (right, in RTL). */
  icon?: ReactNode;
  children?: ReactNode;
}

export function Button({
  variant = "primary",
  block = false,
  icon,
  className = "",
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn btn--${variant}${block ? " btn--block" : ""}${
        className ? ` ${className}` : ""
      }`}
      {...rest}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      {children && <span className="btn__label">{children}</span>}
    </button>
  );
}
