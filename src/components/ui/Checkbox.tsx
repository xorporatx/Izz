import { Check } from "../icons";
import "./Checkbox.css";

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Accessible name — the task title. */
  label: string;
}

/** Round 16px checkbox, matching the shadcn checkbox styled in Figma. */
export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        className="checkbox__input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="checkbox__box" aria-hidden="true">
        <Check size={10} strokeWidth={3} />
      </span>
      <span className="sr-only">{label}</span>
    </label>
  );
}
