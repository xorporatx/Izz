import { useId, type ReactNode } from "react";
import "./Field.css";

export interface FieldRenderProps {
  /** Put on the control, so the label's `htmlFor` reaches it. */
  id: string;
  /** Points at the error text when there is one. */
  describedBy?: string;
  invalid: boolean;
}

export interface FieldProps {
  label: string;
  /** Message under the control. Its presence is what marks a field invalid. */
  error?: string;
  /** Spans both columns of a two-up row. */
  wide?: boolean;
  children: (props: FieldRenderProps) => ReactNode;
}

/**
 * Label, control and error message as one block.
 *
 * The control is a render prop rather than a child so the field can hand it
 * the generated id and `aria-describedby` — the wiring that makes the label
 * and the error reach assistive tech is then impossible to forget at a call
 * site.
 */
export function Field({ label, error, wide = false, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={`field${wide ? " field--wide" : ""}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>

      {children({
        id,
        describedBy: error ? errorId : undefined,
        invalid: Boolean(error),
      })}

      {error && (
        <p className="field__error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
