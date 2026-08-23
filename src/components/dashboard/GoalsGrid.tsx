import type { Goal } from "../../data/dashboard";
import { Button } from "../ui/Button";
import { SectionHeader } from "../ui/SectionHeader";
import { GoalCard } from "./GoalCard";
import "./GoalsGrid.css";

/**
 * Mobile — stacked, as in Figma, with the footer button underneath.
 * Tablet — two columns. Desktop — three equal columns across the full width.
 */
export function GoalsGrid({ goals }: { goals: Goal[] }) {
  return (
    <section className="goals" aria-labelledby="goals-heading">
      <SectionHeader
        id="goals-heading"
        title="יעדים"
        action={<Button variant="secondary">הצג את כל היעדים</Button>}
      />

      <ul className="goals__grid">
        {goals.map((goal) => (
          <li key={goal.id} className="goals__cell">
            <GoalCard goal={goal} />
          </li>
        ))}
      </ul>

      <div className="goals__footer">
        <Button variant="secondary" block>
          הצג את כל היעדים
        </Button>
      </div>
    </section>
  );
}
