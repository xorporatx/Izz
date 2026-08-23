import type { Tone } from "../../data/dashboard";
import "./ToneDot.css";

/** 8px status dot that terminates every metric / goal / task header row. */
export function ToneDot({ tone }: { tone: Tone }) {
  return <span className={`tone-dot tone-dot--${tone}`} aria-hidden="true" />;
}
