const dateFormatter = new Intl.DateTimeFormat("he-IL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const fullFormatter = new Intl.DateTimeFormat("he-IL", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** "22 ביולי 2026" — the date stepper's label. */
export const formatDate = (date: Date) => dateFormatter.format(date);

/** "יום רביעי, 22 ביולי 2026" — accessible names and the drawer subtitle. */
export const formatFullDate = (date: Date) => fullFormatter.format(date);

/**
 * Shifts by whole months, clamping the day so 31 January + 1 lands on
 * 28 February rather than rolling into March.
 */
export function addMonths(date: Date, delta: number) {
  const target = new Date(date.getFullYear(), date.getMonth() + delta, 1);
  const lastDay = new Date(
    target.getFullYear(),
    target.getMonth() + 1,
    0,
  ).getDate();
  target.setDate(Math.min(date.getDate(), lastDay));
  return target;
}
