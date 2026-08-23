import type { Tone } from "../../data/dashboard";
import "./BarChart.css";

export interface BarChartProps {
  /** Listed in RTL reading order — the first entry sits on the right. */
  data: { day: string; value: number }[];
  tone?: Tone;
  /** Accessible description of the series. */
  label: string;
}

/**
 * The weekly column chart in the metric detail panel. Bars are sized against
 * the largest value in the series and animate to their new heights when the
 * series changes, because the day keys are stable across categories.
 *
 * RTL flow puts א on the right without any mirroring.
 */
export function BarChart({ data, tone = "warning", label }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="bar-chart" role="img" aria-label={label}>
      {data.map((point) => (
        <div className="bar-chart__column" key={point.day}>
          <div className="bar-chart__track">
            <div
              className={`bar-chart__bar bar-chart__bar--${tone}`}
              style={{ blockSize: `${(point.value / max) * 100}%` }}
            />
          </div>
          <span className="bar-chart__label">{point.day}</span>
        </div>
      ))}
    </div>
  );
}
