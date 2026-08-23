import { useState } from "react";
import { goals, insights, metrics, tasks } from "../data/dashboard";
import { GoalsGrid } from "../components/dashboard/GoalsGrid";
import { InsightsSection } from "../components/dashboard/InsightsSection";
import { MetricDetailPanel } from "../components/dashboard/MetricDetailPanel";
import { MetricSelectorGroup } from "../components/dashboard/MetricSelectorGroup";
import { TasksSection } from "../components/dashboard/TasksSection";
import "./Dashboard.css";

export interface DashboardProps {
  completedTasks: ReadonlySet<string>;
  onToggleTask: (id: string, done: boolean) => void;
}

const PANEL_ID = "metric-detail-panel";

/**
 * Information architecture is identical on every breakpoint — financial
 * summary, insights, tasks, goals. Only the arrangement changes.
 *
 * The metric row is a selector, not five independent cards: `selectedMetric`
 * is the single source of truth and the panel below derives everything it
 * shows from the matching entry, so the two cannot fall out of sync.
 */
export function Dashboard({ completedTasks, onToggleTask }: DashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState(metrics[0].id);
  const activeMetric =
    metrics.find((metric) => metric.id === selectedMetric) ?? metrics[0];

  return (
    <div className="dashboard">
      <section className="dashboard__summary" aria-label="סיכום פיננסי">
        <MetricSelectorGroup
          metrics={metrics}
          selectedId={activeMetric.id}
          onSelect={setSelectedMetric}
          controls={PANEL_ID}
        />
        <MetricDetailPanel metric={activeMetric} id={PANEL_ID} />
      </section>

      <div className="dashboard__grid">
        <div className="dashboard__primary">
          <InsightsSection insights={insights} />
        </div>

        <div className="dashboard__secondary">
          <TasksSection
            tasks={tasks}
            completed={completedTasks}
            onToggle={onToggleTask}
          />
        </div>
      </div>

      <GoalsGrid goals={goals} />
    </div>
  );
}
