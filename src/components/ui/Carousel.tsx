import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "../icons";
import "./Carousel.css";

export interface CarouselProps {
  /** Accessible name for the scroll region. */
  label: string;
  /**
   * `responsive` — a rail on mobile that the consuming section restyles into
   * a grid from 768px up.
   * `rail` — stays a slider at every size, with arrow controls on pointer
   * devices.
   */
  variant?: "responsive" | "rail";
  /**
   * Extra class on the track. Sections use it to set slide widths, or to
   * redefine the track as a grid at their own breakpoints — the carousel
   * itself stays layout agnostic.
   */
  trackClassName?: string;
  children: ReactNode[];
}

/**
 * Snap-scrolling rail with a pill page indicator, as drawn in Figma.
 *
 * The only script here reflects the *actual* scroll position back into the
 * controls and steps between slides — interaction, not layout. Slide sizing
 * and any grid fallback live in CSS.
 */
export function Carousel({
  label,
  variant = "responsive",
  trackClassName,
  children,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const syncActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackBox = track.getBoundingClientRect();
    const centre = trackBox.left + trackBox.width / 2;
    let best = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    Array.from(track.children).forEach((child, index) => {
      const box = (child as HTMLElement).getBoundingClientRect();
      const distance = Math.abs(box.left + box.width / 2 - centre);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = index;
      }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    syncActive();
    track.addEventListener("scroll", syncActive, { passive: true });
    return () => track.removeEventListener("scroll", syncActive);
  }, [syncActive]);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(children.length - 1, index));
    const child = trackRef.current?.children[clamped] as
      | HTMLElement
      | undefined;
    child?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const multiple = children.length > 1;

  return (
    <div className={`carousel carousel--${variant}`}>
      <div
        ref={trackRef}
        className={`carousel__track no-scrollbar${
          trackClassName ? ` ${trackClassName}` : ""
        }`}
        role="group"
        aria-label={label}
        tabIndex={0}
      >
        {children}
      </div>

      {multiple && (
        <div className="carousel__controls">
          <div className="carousel__dots" role="tablist" aria-label={`${label} — ניווט`}>
            {children.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`${index + 1} מתוך ${children.length}`}
                className={`carousel__dot${
                  index === active ? " carousel__dot--active" : ""
                }`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>

          <div className="carousel__arrows">
            {/* RTL: back is the right-pointing chevron, and DOM order puts it
                on the right. */}
            <button
              type="button"
              className="carousel__arrow"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label={`${label} — הקודם`}
            >
              <ChevronRight size={18} />
            </button>
            <button
              type="button"
              className="carousel__arrow"
              onClick={() => goTo(active + 1)}
              disabled={active === children.length - 1}
              aria-label={`${label} — הבא`}
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
