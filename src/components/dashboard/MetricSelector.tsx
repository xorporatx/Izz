import type { Metric } from "../../data/dashboard";
import { Card } from "../ui/Card";
import { Progress } from "../ui/Progress";
import { ToneDot } from "../ui/ToneDot";
import "./MetricSelector.css";

export interface MetricSelectorProps {
  metric: Metric;
  isSelected: boolean;
  onClick: () => void;
  /** Id of the panel this selector drives. */
  controls: string;
}

/**
 * One financial category, acting as the control for the detail panel below.
 *
 * Reading right to left: accent dot → label → figure → comparison, then the
 * 6px bar. Selected state borders the card in the metric's own accent — the
 * colour comes from `metric.tone`, never from the call site.
 */
export function MetricSelector({
  metric,
  isSelected,
  onClick,
  controls,
}: MetricSelectorProps) {
  return (
    <Card
      as="button"
      type="button"
      className={`metric-selector metric-selector--${metric.tone}${
        isSelected ? " metric-selector--selected" : ""
      }`}
      aria-pressed={isSelected}
      aria-controls={controls}
      onClick={onClick}
    >
      <span className="metric-selector__row">
        <ToneDot tone={metric.tone} />
        <span className="metric-selector__label">{metric.label}</span>
        <span className="metric-selector__figures">
          <span className="metric-selector__value numeric">{metric.value}</span>
          <span className="metric-selector__separator" aria-hidden="true">
            /
          </span>
          <span className="metric-selector__caption numeric">
            {metric.secondaryValue}
          </span>
        </span>
      </span>

      <Progress
        value={metric.progress}
        tone={metric.tone}
        label={`${metric.label} — התקדמות`}
      />
    </Card>
  );
}
