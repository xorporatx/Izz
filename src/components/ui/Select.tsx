import { useRef, useState } from "react";
import { Check, ChevronDown } from "../icons";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import "./Select.css";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  id?: string;
  options: SelectOption[];
  /** Empty string means nothing chosen yet. */
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
  /** Names the listbox when the field label cannot. */
  label?: string;
}

/**
 * Dropdown built on the project's Popover.
 *
 * Radix reads the RTL direction off the document, so `align="start"` anchors
 * the list to the field's right-hand edge and it opens under the trigger at
 * the trigger's own width. Choosing an option commits it and closes the list;
 * the value survives reopening because it is owned by the caller.
 *
 * Arrow keys move between options and Escape closes — Radix handles the
 * dismissal and focus return, this adds the roving movement a listbox needs.
 */
export function Select({
  id,
  options,
  value,
  onChange,
  placeholder = "בחר",
  disabled = false,
  invalid = false,
  describedBy,
  label,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value) ?? null;

  const select = (next: string) => {
    onChange(next);
    setOpen(false);
  };

  /** Moves focus between options without leaving the list. */
  const onListKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    const items = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>("[role='option']") ??
        [],
    );
    if (items.length === 0) return;

    event.preventDefault();
    const current = items.indexOf(document.activeElement as HTMLButtonElement);
    const step = event.key === "ArrowDown" ? 1 : -1;
    const next = (current + step + items.length) % items.length;
    items[next]?.focus();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          className={`select${invalid ? " select--invalid" : ""}`}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          aria-label={label}
        >
          <span
            className={`select__value${
              selected ? "" : " select__value--placeholder"
            }`}
          >
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown size={18} className="select__chevron" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="select__list" align="start" sideOffset={6}>
        <div
          role="listbox"
          aria-label={label}
          ref={listRef}
          onKeyDown={onListKeyDown}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`select__option${
                  isSelected ? " select__option--selected" : ""
                }`}
                onClick={() => select(option.value)}
              >
                <span className="select__option-label">{option.label}</span>
                {isSelected && <Check size={16} />}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
