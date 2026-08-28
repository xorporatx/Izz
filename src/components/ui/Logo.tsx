export interface LogoProps {
  /** Rendered edge length in px. The mark is square. */
  size?: number;
  className?: string;
  /** Accessible name. Pass "" to hide it from assistive tech. */
  title?: string;
}

/**
 * The IzzBizz mark: a lowercase "ib" lettermark on a rounded green tile.
 *
 * Colours are baked in rather than taken from tokens — this is a brand asset,
 * so it stays the same green wherever it is placed and does not follow a
 * surface's palette.
 */
export function Logo({ size = 36, className, title = "IzzBizz" }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <rect width="48" height="48" rx="14" fill="#34785a" />
      {/* i — dot over a stem */}
      <circle cx="14.5" cy="17.2" r="2" fill="#dff0e7" />
      <path
        d="M14.5 21.6v12.3"
        stroke="#dff0e7"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      {/* b — full-height stem carrying an open bowl. The bowl's stroke is
          light enough to leave a real counter at 36px, as the mark is drawn. */}
      <path
        d="M21 14.1v19.8"
        stroke="#dff0e7"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      <circle
        cx="27.3"
        cy="27.1"
        r="6.9"
        stroke="#dff0e7"
        strokeWidth="3.6"
        fill="none"
      />
    </svg>
  );
}
