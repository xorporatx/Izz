import type { Insight } from "../../data/dashboard";
import { Button } from "../ui/Button";
import { Carousel } from "../ui/Carousel";
import { SectionHeader } from "../ui/SectionHeader";
import { ActionCard } from "./ActionCard";
import "./InsightsSection.css";

/**
 * Mobile  — snap rail of equal insight cards (the Figma behaviour).
 * Tablet+ — grid; the lead insight spans the full width and switches to the
 *           featured layout, the rest sit two-up beneath it.
 */
export function InsightsSection({ insights }: { insights: Insight[] }) {
  return (
    <section className="insights" aria-labelledby="insights-heading">
      <SectionHeader
        id="insights-heading"
        title="תובנות"
        action={<Button variant="secondary">הצג את כל התובנות</Button>}
      />

      <Carousel label="תובנות" variant="rail" trackClassName="insights__rail">
        {insights.map((insight, index) => (
          <ActionCard
            key={insight.id}
            insight={insight}
            featured={index === 0}
          />
        ))}
      </Carousel>
    </section>
  );
}
