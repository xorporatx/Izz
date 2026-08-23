import { useEffect, useRef, type ComponentProps } from "react";
import {
  DayButton,
  DayPicker,
  getDefaultClassNames,
} from "react-day-picker";
import { he } from "react-day-picker/locale";
import { ChevronDown, ChevronLeft, ChevronRight } from "../icons";
import "./Calendar.css";

const cx = (...parts: (string | undefined | false)[]) =>
  parts.filter(Boolean).join(" ");

export type CalendarProps = ComponentProps<typeof DayPicker>;

/**
 * shadcn/ui Calendar, built on react-day-picker.
 *
 * Same surface as the registry component — `classNames` and `components` are
 * merged over the defaults so callers can still override any slot — with the
 * Tailwind utilities translated to this project's tokens. Defaults to the
 * Hebrew locale and RTL, which is what the product needs everywhere.
 */
export function Calendar({
  className,
  classNames,
  components,
  showOutsideDays = true,
  captionLayout = "label",
  locale = he,
  dir = "rtl",
  ...props
}: CalendarProps) {
  const defaults = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      locale={locale}
      dir={dir}
      className={cx("calendar", className)}
      classNames={{
        root: cx("calendar__root", defaults.root),
        months: cx("calendar__months", defaults.months),
        month: cx("calendar__month", defaults.month),
        nav: cx("calendar__nav", defaults.nav),
        button_previous: cx("calendar__nav-button", defaults.button_previous),
        button_next: cx("calendar__nav-button", defaults.button_next),
        month_caption: cx("calendar__caption", defaults.month_caption),
        caption_label: cx("calendar__caption-label", defaults.caption_label),
        dropdowns: cx("calendar__dropdowns", defaults.dropdowns),
        dropdown_root: cx("calendar__dropdown-root", defaults.dropdown_root),
        dropdown: cx("calendar__dropdown", defaults.dropdown),
        month_grid: cx("calendar__grid", defaults.month_grid),
        weekdays: cx("calendar__weekdays", defaults.weekdays),
        weekday: cx("calendar__weekday", defaults.weekday),
        week: cx("calendar__week", defaults.week),
        day: cx("calendar__day", defaults.day),
        today: cx("calendar__day--today", defaults.today),
        outside: cx("calendar__day--outside", defaults.outside),
        disabled: cx("calendar__day--disabled", defaults.disabled),
        hidden: cx("calendar__day--hidden", defaults.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ className: chevronClass, orientation, ...rest }) => {
          const Glyph =
            orientation === "left"
              ? ChevronLeft
              : orientation === "right"
                ? ChevronRight
                : ChevronDown;
          return (
            <Glyph
              size={16}
              className={cx("calendar__chevron", chevronClass)}
              {...rest}
            />
          );
        },
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  );
}

/** Day cell button — keeps react-day-picker's roving focus behaviour. */
export function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: ComponentProps<typeof DayButton>) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString()}
      data-selected={modifiers.selected || undefined}
      data-today={modifiers.today || undefined}
      className={cx("calendar__day-button", className)}
      {...props}
    />
  );
}
