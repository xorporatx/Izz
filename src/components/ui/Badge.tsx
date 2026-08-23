import type { ReactNode } from "react";
import type { Tone } from "../../data/dashboard";
import "./Badge.css";

export interface BadgeProps {
  tone?: Tone;
  /** Trailing glyph — sits at the inline-end edge (left, in RTL). */
  icon?: ReactNode;
  children: ReactNode;
}

/** Small pill used for insight priority and category. */
export function Badge({ tone = "warning", icon, children }: BadgeProps) {
  return (
    <span className={`badge badge--${tone}`}>
      <span className="badge__label">{children}</span>
      {icon && <span className="badge__icon">{icon}</span>}
    </span>
  );
}
