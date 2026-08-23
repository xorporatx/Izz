import { useCallback, useEffect, useRef, useState } from "react";
import type { Metric } from "../../data/dashboard";
import { ChevronLeft, ChevronRight } from "../icons";
import { MetricSelector } from "./MetricSelector";
import "./MetricSelectorGroup.css";

export interface MetricSelectorGroupProps {
  metrics: Metric[];
  selectedId: string;
  onSelect: (id: string) => void;
  /** Id of the detail panel the group drives. */
  controls: string;
}

/**
 * The row of category selectors. Horizontally scrollable at every size —
 * five cards never fit comfortably across, and scrolling keeps each one wide
 * enough to read at a glance.
 *
 * Arrow buttons overlay the row's edges on pointer devices and step one card
 * at a time; each hides once the row reaches that end. Touch just swipes.
 */
export function MetricSelectorGroup({
  metrics,
  selectedId,
  onSelect,
  controls,
}: MetricSelectorGroupProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  const syncEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    // RTL scrollLeft runs 0 → negative; the magnitude is the distance moved.
    const travelled = Math.abs(track.scrollLeft);
    setEdges({
      atStart: travelled <= 1,
      atEnd: max <= 1 || travelled >= max - 1,
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    syncEdges();
    track.addEventListener("scroll", syncEdges, { passive: true });
    const observer = new ResizeObserver(syncEdges);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", syncEdges);
      observer.disconnect();
    };
  }, [syncEdges]);

  /**
   * Steps one card. Works off element geometry rather than the sign of
   * scrollLeft, so it does not depend on the browser's RTL scroll convention.
   */
  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const cells = Array.from(track.children) as HTMLElement[];
    const box = track.getBoundingClientRect();
    const leading = cells.findIndex((cell) => {
      const cellBox = cell.getBoundingClientRect();
      return cellBox.left >= box.left - 1 && cellBox.right <= box.right + 1;
    });
    const from = leading === -1 ? 0 : leading;
    const target = cells[Math.max(0, Math.min(cells.length - 1, from + direction))];
    target?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  return (
    <div className="metric-selectors">
      <div
        ref={trackRef}
        className="metric-selectors__track no-scrollbar"
        role="group"
        aria-label="קטגוריות פיננסיות"
      >
        {metrics.map((metric) => (
          <div className="metric-selectors__cell" key={metric.id}>
            <MetricSelector
              metric={metric}
              isSelected={metric.id === selectedId}
              onClick={() => onSelect(metric.id)}
              controls={controls}
            />
          </div>
        ))}
      </div>

      {/* RTL: back sits on the right and points right; forward on the left. */}
      <button
        type="button"
        className={`metric-selectors__arrow metric-selectors__arrow--prev${
          edges.atStart ? " metric-selectors__arrow--hidden" : ""
        }`}
        onClick={() => step(-1)}
        disabled={edges.atStart}
        aria-label="קטגוריות קודמות"
      >
        <ChevronRight size={18} />
      </button>

      <button
        type="button"
        className={`metric-selectors__arrow metric-selectors__arrow--next${
          edges.atEnd ? " metric-selectors__arrow--hidden" : ""
        }`}
        onClick={() => step(1)}
        disabled={edges.atEnd}
        aria-label="קטגוריות נוספות"
      >
        <ChevronLeft size={18} />
      </button>
    </div>
  );
}
