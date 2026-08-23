import type { PeriodId } from "../../data/dashboard";
import { Bell, Menu } from "../icons";
import { MonthPicker } from "./MonthPicker";
import { PeriodSelector } from "./PeriodSelector";
import "./MobileTopBar.css";

export interface MobileTopBarProps {
  venue: string;
  date: Date;
  period: PeriodId;
  onPeriodChange: (period: PeriodId) => void;
  onDateChange: (date: Date) => void;
}

/**
 * The mobile chrome from Figma: page header (menu · venue · notifications),
 * the day picker and the period row.
 *
 * The iOS status bar drawn in the frame is device chrome rather than product
 * UI, so it is deliberately not reproduced here.
 */
export function MobileTopBar({
  venue,
  date,
  period,
  onPeriodChange,
  onDateChange,
}: MobileTopBarProps) {
  return (
    <div className="mobile-top-bar">
      <div className="mobile-top-bar__header">
        <button type="button" className="mobile-top-bar__icon" aria-label="תפריט">
          <Menu size={20} />
        </button>

        <p className="mobile-top-bar__venue">{venue}</p>

        <button
          type="button"
          className="mobile-top-bar__icon mobile-top-bar__icon--badged"
          aria-label="התראות"
        >
          <Bell size={16} />
          <span className="mobile-top-bar__dot" aria-hidden="true" />
        </button>
      </div>

      <div className="mobile-top-bar__day-picker">
        <MonthPicker date={date} onDateChange={onDateChange} />
      </div>

      <div className="mobile-top-bar__periods">
        <PeriodSelector value={period} onChange={onPeriodChange} />
      </div>
    </div>
  );
}
