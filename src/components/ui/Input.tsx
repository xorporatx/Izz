import type { InputHTMLAttributes } from "react";
import "./Input.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

/**
 * Single-line text control — the white 44px pill the Figma forms draw.
 *
 * `dir` is deliberately not forced: Hebrew names inherit the document's RTL,
 * while an email or phone field passes `dir="ltr"` so its value reads the way
 * those values are written.
 */
export function Input({ invalid = false, className = "", ...rest }: InputProps) {
  return (
    <input
      className={`input${invalid ? " input--invalid" : ""}${
        className ? ` ${className}` : ""
      }`}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
}
