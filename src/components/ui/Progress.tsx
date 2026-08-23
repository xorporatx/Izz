import type { Tone } from "../../data/dashboard";
import "./Progress.css";

export interface ProgressProps {
  /** 0–100. Clamped. */
  value: number;
  tone?: Tone;
  /** Accessible name, e.g. "התקדמות יעד הכנסות חודשי". */
  label: string;
}

/**
 * 6px track. The fill grows from the inline-start edge, which under
 * `direction: rtl` is the right — no manual mirroring involved.
 */
export function Progress({ value, tone = "warning", label }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className="progress"
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`progress__fill progress__fill--${tone}`}
        style={{ inlineSize: `${clamped}%` }}
      />
    </div>
  );
}
