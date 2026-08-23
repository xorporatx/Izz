import type { ReactNode } from "react";
import "./SectionHeader.css";

export interface SectionHeaderProps {
  /** Small emerald label — "תובנות", "משימות להיום", "יעדים". */
  title: string;
  /** Optional trailing control, shown on tablet and up. */
  action?: ReactNode;
  id?: string;
}

export function SectionHeader({ title, action, id }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h2 className="section-header__title" id={id}>
        {title}
      </h2>
      {action && <div className="section-header__action">{action}</div>}
    </div>
  );
}
