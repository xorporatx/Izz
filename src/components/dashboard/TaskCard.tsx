import type { Task } from "../../data/dashboard";
import { Card } from "../ui/Card";
import { Checkbox } from "../ui/Checkbox";
import { ToneDot } from "../ui/ToneDot";
import "./TaskCard.css";

export interface TaskCardProps {
  task: Task;
  done: boolean;
  onToggle: (done: boolean) => void;
}

export function TaskCard({ task, done, onToggle }: TaskCardProps) {
  return (
    <Card
      as="article"
      className={`task-card${done ? " task-card--done" : ""}`}
      aria-labelledby={`task-${task.id}`}
    >
      <header className="task-card__row">
        <Checkbox checked={done} onChange={onToggle} label={task.title} />
        <ToneDot tone={task.tone} />
        <span className="task-card__status">{task.status}</span>
      </header>

      <h3 className="task-card__title" id={`task-${task.id}`}>
        {task.title}
      </h3>
      <p className="task-card__description">{task.description}</p>
    </Card>
  );
}
