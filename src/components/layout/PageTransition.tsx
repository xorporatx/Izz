import { useEffect, useState, type ReactNode } from "react";
import "./PageTransition.css";

export type TransitionDirection = "forward" | "back";

export interface PageTransitionProps {
  /** Identifies the page on screen; `null` when the stack is empty. */
  pageKey: string | null;
  /** Which way the stack moved — decides which edge each page travels to. */
  direction: TransitionDirection;
  children: ReactNode;
}

/** Fallback in case `animationend` never arrives (background tab, etc.). */
const CLEANUP_MS = 500;

interface Snapshot {
  key: string | null;
  node: ReactNode;
}

interface Leaving extends Snapshot {
  key: string;
  direction: TransitionDirection;
}

/**
 * The mobile page stack.
 *
 * Pages are layered over whatever is already rendered rather than replacing
 * it, so the screen underneath keeps its DOM — and therefore its scroll
 * position and component state — while a supplier page is open. Going back
 * reveals it untouched.
 *
 * A page leaving the stack has already been dropped from the route by the
 * time this renders, so the last one is held here for the length of its exit
 * animation.
 */
export function PageTransition({
  pageKey,
  direction,
  children,
}: PageTransitionProps) {
  const [shown, setShown] = useState<Snapshot>({ key: pageKey, node: children });
  const [leaving, setLeaving] = useState<Leaving | null>(null);

  // Adjusting state while rendering: React re-runs this component with the new
  // values before committing, so the arriving page has its animation class on
  // its very first frame.
  if (shown.key !== pageKey) {
    if (shown.key !== null) {
      setLeaving({ key: shown.key, node: shown.node, direction });
    }
    setShown({ key: pageKey, node: children });
  }

  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(() => setLeaving(null), CLEANUP_MS);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  return (
    <>
      {leaving && (
        <div
          key={`leaving-${leaving.key}`}
          className={`page-transition page-transition--leave-${leaving.direction}`}
          aria-hidden="true"
          onAnimationEnd={() => setLeaving(null)}
        >
          {leaving.node}
        </div>
      )}

      {pageKey !== null && (
        <div
          key={pageKey}
          className={`page-transition page-transition--enter-${direction}`}
        >
          {children}
        </div>
      )}
    </>
  );
}
