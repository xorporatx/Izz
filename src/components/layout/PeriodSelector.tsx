import { periods, type PeriodId } from "../../data/dashboard";
import "./PeriodSelector.css";

export interface PeriodSelectorProps {
  value: PeriodId;
  onChange: (value: PeriodId) => void;
}

/**
 * היום · השבוע · החודש · 12 חודשים אחרונים · השנה
 *
 * Reads right to left; the selected period is the emerald pill. On mobile the
 * row scrolls horizontally under a fade, on desktop it sits inline in the
 * header.
 */
export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <div
      className="period-selector no-scrollbar"
      role="tablist"
      aria-label="טווח זמן"
    >
      {periods.map((period) => (
        <button
          key={period.id}
          type="button"
          role="tab"
          aria-selected={period.id === value}
          className={`period-selector__item${
            period.id === value ? " period-selector__item--active" : ""
          }`}
          onClick={() => onChange(period.id)}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
