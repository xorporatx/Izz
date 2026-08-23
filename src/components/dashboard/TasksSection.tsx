import type { Task } from "../../data/dashboard";
import { Button } from "../ui/Button";
import { Carousel } from "../ui/Carousel";
import { SectionHeader } from "../ui/SectionHeader";
import { TaskCard } from "./TaskCard";
import "./TasksSection.css";

export interface TasksSectionProps {
  tasks: Task[];
  completed: ReadonlySet<string>;
  onToggle: (id: string, done: boolean) => void;
}

/**
 * Mobile  — snap rail, one task at a time, plus the "הצג את כל המשימות"
 *           footer button from Figma.
 * Tablet  — two-up grid.
 * Desktop — a single scannable column in the narrow dashboard track; the
 *           footer button moves up into the section header.
 */
export function TasksSection({
  tasks,
  completed,
  onToggle,
}: TasksSectionProps) {
  return (
    <section className="tasks" aria-labelledby="tasks-heading">
      <SectionHeader
        id="tasks-heading"
        title="משימות להיום"
        action={<Button variant="secondary">הצג את כל המשימות</Button>}
      />

      <Carousel label="משימות להיום" variant="rail" trackClassName="tasks__rail">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            done={completed.has(task.id)}
            onToggle={(done) => onToggle(task.id, done)}
          />
        ))}
      </Carousel>

      <div className="tasks__footer">
        <Button variant="secondary" block>
          הצג את כל המשימות
        </Button>
      </div>
    </section>
  );
}
