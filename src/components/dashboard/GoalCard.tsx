import type { Goal } from "../../data/dashboard";
import { Card } from "../ui/Card";
import { Progress } from "../ui/Progress";
import { ToneDot } from "../ui/ToneDot";
import "./GoalCard.css";

/**
 * Mirrors the Figma goal card: labels align to the right, the figures to the
 * left, and the 6px bar fills from the right because the page is RTL.
 */
export function GoalCard({ goal }: { goal: Goal }) {
  return (
    <Card as="article" className="goal-card" aria-labelledby={`goal-${goal.id}`}>
      <header className="goal-card__head">
        <div className="goal-card__meta">
          <ToneDot tone={goal.tone} />
          <h3 className="goal-card__label" id={`goal-${goal.id}`}>
            {goal.label}
          </h3>
        </div>
        <p className="goal-card__value numeric">{goal.value}</p>
      </header>

      <div className="goal-card__context">
        <p className={`goal-card__deadline goal-card__deadline--${goal.tone}`}>
          {goal.deadline}
        </p>
        <p className="goal-card__baseline">{goal.baseline}</p>
      </div>

      <div className="goal-card__meter">
        <Progress
          value={goal.progress}
          tone={goal.tone}
          label={`${goal.label} — התקדמות`}
        />
        <span className="goal-card__percent numeric">{goal.progress}%</span>
      </div>
    </Card>
  );
}
