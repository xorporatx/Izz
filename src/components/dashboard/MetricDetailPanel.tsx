import type { Metric } from "../../data/dashboard";
import { ClipboardList, Lightbulb } from "../icons";
import { BarChart } from "../ui/BarChart";
import { Card } from "../ui/Card";
import { Progress } from "../ui/Progress";
import { ToneDot } from "../ui/ToneDot";
import "./MetricDetailPanel.css";

export interface MetricDetailPanelProps {
  /** The currently selected category — the panel's only input. */
  metric: Metric;
  id: string;
}

/**
 * The contextual panel under the selectors. Every value it renders comes from
 * the one `metric` it is handed, so the panel can never disagree with the
 * selector that drove it.
 *
 * On a change the chart bars animate to their new heights in place while the
 * copy crossfades — the panel itself never unmounts.
 */
export function MetricDetailPanel({ metric, id }: MetricDetailPanelProps) {
  return (
    <Card as="section" className="metric-panel" id={id} aria-live="polite">
      <header className="metric-panel__header">
        <div className="metric-panel__title">
          <ToneDot tone={metric.tone} />
          <h3 className="metric-panel__label">{metric.label}</h3>
        </div>
        <p className="metric-panel__value numeric" key={`${metric.id}-value`}>
          {metric.value}
          <span className="metric-panel__secondary">
            {" / "}
            {metric.secondaryValue}
          </span>
        </p>
      </header>

      <div className="metric-panel__meter">
        <Progress
          value={metric.progress}
          tone={metric.tone}
          label={`${metric.label} — התקדמות`}
        />
      </div>

      <div className="metric-panel__comparison">
        <p
          className={`metric-panel__delta metric-panel__delta--${metric.comparison.direction}`}
        >
          <span className="metric-panel__delta-value numeric">
            {metric.comparison.value}
          </span>{" "}
          <span className="metric-panel__delta-label">
            {metric.comparison.label}
          </span>
        </p>
        <p className="metric-panel__period">{metric.period}</p>
      </div>

      <div className="metric-panel__body">
        <div className="metric-panel__chart">
          <BarChart
            data={metric.chart.data}
            tone={metric.tone}
            label={`${metric.label} — פילוח שבועי`}
          />
        </div>

        <div className="metric-panel__advice" key={metric.id}>
          <section className="metric-panel__block">
            <h4 className="metric-panel__block-title">
              <Lightbulb size={16} />
              <span>{metric.recommendations.title}</span>
            </h4>
            <p className="metric-panel__copy">
              <strong>{metric.recommendations.headline}</strong>
              <br />
              {metric.recommendations.description}
            </p>
          </section>

          <hr className="metric-panel__rule" />

          <section className="metric-panel__block">
            <h4 className="metric-panel__block-title">
              <ClipboardList size={16} />
              <span>{metric.task.title}</span>
            </h4>
            <div className="metric-panel__task">
              <p className="metric-panel__copy">
                <span className="metric-panel__task-lead">הפעולה הבאה:</span>{" "}
                {metric.task.description}
              </p>
              <button type="button" className="metric-panel__task-action">
                {metric.task.actionLabel}
              </button>
            </div>
          </section>
        </div>
      </div>
    </Card>
  );
}
