import type { PeriodId } from "../../data/dashboard";
import { Bell } from "../icons";
import { MonthPicker } from "./MonthPicker";
import { PeriodSelector } from "./PeriodSelector";
import "./DashboardHeader.css";

export interface DashboardHeaderProps {
  venue: string;
  greeting: string;
  date: Date;
  period: PeriodId;
  onPeriodChange: (period: PeriodId) => void;
  onDateChange: (date: Date) => void;
}

/**
 * Desktop header. Greeting and venue on the right, controls to their left;
 * from 1200px everything settles onto one row, below that the controls wrap
 * to a second line.
 */
export function DashboardHeader({
  venue,
  greeting,
  date,
  period,
  onPeriodChange,
  onDateChange,
}: DashboardHeaderProps) {
  return (
    <header className="dash-header">
      <div className="dash-header__inner">
        <div className="dash-header__lead">
          <p className="dash-header__greeting">{greeting}</p>
          <h1 className="dash-header__title">{venue}</h1>
        </div>

        <div className="dash-header__controls">
          <MonthPicker date={date} onDateChange={onDateChange} />

          <PeriodSelector value={period} onChange={onPeriodChange} />

          <button
            type="button"
            className="dash-header__bell"
            aria-label="התראות"
          >
            <Bell size={16} />
            <span className="dash-header__dot" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
