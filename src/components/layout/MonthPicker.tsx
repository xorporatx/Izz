import { useState } from "react";
import { addMonths, formatDate, formatFullDate } from "../../lib/date";
import { useMediaQuery } from "../../lib/useMediaQuery";
import { ChevronDown, ChevronLeft, ChevronRight } from "../icons";
import { Button } from "../ui/Button";
import { Calendar } from "../ui/Calendar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/Drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/Popover";
import "./MonthPicker.css";

export interface MonthPickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

/**
 * Date stepper. The chevrons move a whole month; the label opens the calendar.
 *
 * Desktop gets a popover anchored under the label, touch gets a bottom sheet —
 * shadcn's responsive picker pattern. The calendar body is identical either
 * way; only the container differs.
 *
 * RTL chevron semantics: forward in an RTL interface is leftward, so the
 * right-pointing chevron steps back and the left-pointing one advances. The
 * DOM order puts "previous" first, which places it on the right.
 */
export function MonthPicker({ date, onDateChange }: MonthPickerProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Crossing the breakpoint swaps sheet for popover; dismiss rather than hand
  // the new primitive an anchor that has just been hidden. Adjusted during
  // render — the state derives from a value that changed, not a side effect.
  const [wasDesktop, setWasDesktop] = useState(isDesktop);
  if (wasDesktop !== isDesktop) {
    setWasDesktop(isDesktop);
    setOpen(false);
  }

  const pick = (next: Date) => {
    onDateChange(next);
    setOpen(false);
  };

  const trigger = (
    <button
      type="button"
      className="month-picker__value"
      aria-label={`בחירת תאריך — ${formatFullDate(date)}`}
    >
      <span>{formatDate(date)}</span>
      <ChevronDown size={16} />
    </button>
  );

  const calendar = (
    <Calendar
      mode="single"
      selected={date}
      defaultMonth={date}
      onSelect={(next) => next && pick(next)}
      captionLayout="dropdown"
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
    />
  );

  return (
    <div className="month-picker">
      <button
        type="button"
        className="month-picker__step"
        onClick={() => onDateChange(addMonths(date, -1))}
        aria-label="החודש הקודם"
      >
        <ChevronRight size={16} />
      </button>

      {isDesktop ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>{trigger}</PopoverTrigger>
          <PopoverContent
            align="center"
            className="month-picker__popover"
            aria-label="בחירת תאריך"
          >
            {calendar}
            <div className="month-picker__popover-footer">
              <Button variant="secondary" onClick={() => pick(new Date())}>
                היום
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>{trigger}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>בחירת תאריך</DrawerTitle>
              <DrawerDescription>{formatFullDate(date)}</DrawerDescription>
            </DrawerHeader>

            <div className="month-picker__calendar">{calendar}</div>

            <DrawerFooter>
              <Button variant="primary" block onClick={() => pick(new Date())}>
                היום
              </Button>
              <DrawerClose asChild>
                <Button variant="secondary" block>
                  סגור
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}

      <button
        type="button"
        className="month-picker__step"
        onClick={() => onDateChange(addMonths(date, 1))}
        aria-label="החודש הבא"
      >
        <ChevronLeft size={16} />
      </button>
    </div>
  );
}
