import "./SupplierPageSkeleton.css";

export interface SupplierPageSkeletonProps {
  /** Placeholder table rows to draw. */
  rows?: number;
}

/**
 * Stand-in for the supplier page while its data loads.
 *
 * It traces the real layout — summary card, details block, orders table — so
 * the page does not jump when the content lands.
 */
export function SupplierPageSkeleton({ rows = 3 }: SupplierPageSkeletonProps) {
  return (
    <div className="supplier-skeleton" role="status" aria-live="polite">
      <span className="sr-only">טוען פרטי ספק…</span>

      <div className="supplier-skeleton__card" aria-hidden="true">
        <span className="supplier-skeleton__line supplier-skeleton__line--title" />
        <span className="supplier-skeleton__line supplier-skeleton__line--value" />
        <span className="supplier-skeleton__line supplier-skeleton__line--meter" />
      </div>

      <div className="supplier-skeleton__card" aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <span
            key={index}
            className="supplier-skeleton__line supplier-skeleton__line--row"
          />
        ))}
      </div>

      <div className="supplier-skeleton__card" aria-hidden="true">
        {Array.from({ length: rows }, (_, index) => (
          <span
            key={index}
            className="supplier-skeleton__line supplier-skeleton__line--row"
          />
        ))}
      </div>
    </div>
  );
}
