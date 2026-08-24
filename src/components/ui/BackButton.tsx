import { ArrowLeft } from "../icons";
import "./BackButton.css";

export interface BackButtonProps {
  onClick: () => void;
  /** Accessible name. */
  label?: string;
}

/**
 * 44px round control that returns to the previous screen.
 *
 * Uses ArrowLeft — the one arrow the Figma frame draws, where it marks every
 * link button — so the back control speaks the design's own vocabulary.
 */
export function BackButton({ onClick, label = "חזרה" }: BackButtonProps) {
  return (
    <button type="button" className="back-button" aria-label={label} onClick={onClick}>
      <ArrowLeft size={20} />
    </button>
  );
}
