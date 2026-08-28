import type { TextareaHTMLAttributes } from "react";
import "./Textarea.css";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

/** Multi-line text control — same visual language as Input, fixed 76px tall. */
export function Textarea({ invalid = false, className = "", ...rest }: TextareaProps) {
  return (
    <textarea
      className={`textarea${invalid ? " textarea--invalid" : ""}${
        className ? ` ${className}` : ""
      }`}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
}
