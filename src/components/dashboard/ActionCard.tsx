import type { Insight } from "../../data/dashboard";
import { ArrowLeft, Circle, Sparkles } from "../icons";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import "./ActionCard.css";

export interface ActionCardProps {
  insight: Insight;
  /**
   * Marks the lead insight. Below 1200px it changes nothing; from 1200px up
   * the card widens its three findings into a row and puts the CTAs inline,
   * so it gains horizontal space instead of height.
   */
  featured?: boolean;
}

export function ActionCard({ insight, featured = false }: ActionCardProps) {
  return (
    <Card
      as="article"
      className={`action-card${featured ? " action-card--featured" : ""}`}
      aria-labelledby={`insight-${insight.id}`}
    >
      <header className="action-card__badges">
        <Badge tone="success" icon={<Sparkles size={12} />}>
          {insight.category}
        </Badge>
        <Badge tone={insight.priority.tone} icon={<Circle size={12} />}>
          {insight.priority.label}
        </Badge>
      </header>

      <div className="action-card__body">
        <h3 className="action-card__title" id={`insight-${insight.id}`}>
          {insight.title}
        </h3>

        <div className="action-card__findings">
          <div className="action-card__finding">
            <p className="action-card__term">מה זיהינו</p>
            <p className="action-card__detail">{insight.observation}</p>
          </div>
          <div className="action-card__finding">
            <p className="action-card__term">למה זה קרה</p>
            <p className="action-card__detail">{insight.cause}</p>
          </div>
          <div className="action-card__finding action-card__finding--action">
            <p className="action-card__term">הפעולה המומלצת</p>
            <p className="action-card__detail">{insight.action}</p>
          </div>
        </div>
      </div>

      <footer className="action-card__footer">
        <Button variant="primary" block icon={<ArrowLeft size={16} />}>
          צור משימה
        </Button>
        <Button variant="secondary" block>
          הצג פרטים
        </Button>
      </footer>
    </Card>
  );
}
