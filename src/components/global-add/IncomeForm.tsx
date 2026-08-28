import { useState } from "react";
import { ChevronDown } from "../icons";
import { Field } from "../ui/Field";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { ReceiptUploadButtons } from "./ReceiptUploadButtons";

/** All-string draft the inputs write to; the container parses on submit. */
export interface IncomeDraft {
  date: string;
  netSales: string;
  grossSales: string;
  credit: string;
  cash: string;
  transfers: string;
  checks: string;
  note: string;
  cibus: string;
  wolt: string;
  tenbis: string;
  bit: string;
}

export const emptyIncomeDraft: IncomeDraft = {
  date: "",
  netSales: "",
  grossSales: "",
  credit: "",
  cash: "",
  transfers: "",
  checks: "",
  note: "",
  cibus: "",
  wolt: "",
  tenbis: "",
  bit: "",
};

export interface IncomeErrors {
  date?: string;
  netSales?: string;
  grossSales?: string;
}

export interface IncomeFormProps {
  values: IncomeDraft;
  errors: IncomeErrors;
  onChange: (key: keyof IncomeDraft, value: string) => void;
}

/**
 * הכנסות tab (frame 740:33256).
 *
 * "מכירות נטו/ברוטו", the four payment-method fields and the four external
 * channels all share the frame's own numeric "Input" variant — decorated
 * with a chevrons-up-down glyph in Figma, but every one of them is a typed
 * currency amount, never a picker, confirmed by cross-checking every ₪ field
 * across all four tabs. Only real dropdowns (single chevron-down, expand/
 * collapse chevrons) are built as selects/toggles here.
 */
export function IncomeForm({ values, errors, onChange }: IncomeFormProps) {
  const [externalOpen, setExternalOpen] = useState(false);

  return (
    <div className="global-add__grid">
      <div className="field field--wide">
        <ReceiptUploadButtons />
      </div>

      <Field label="תאריך" error={errors.date} wide>
        {({ id, describedBy, invalid }) => (
          <Input
            id={id}
            type="date"
            aria-describedby={describedBy}
            invalid={invalid}
            value={values.date}
            onChange={(event) => onChange("date", event.target.value)}
          />
        )}
      </Field>

      <Field label="מכירות נטו (₪)" error={errors.netSales}>
        {({ id, describedBy, invalid }) => (
          <Input
            id={id}
            type="number"
            inputMode="decimal"
            dir="ltr"
            aria-describedby={describedBy}
            invalid={invalid}
            value={values.netSales}
            onChange={(event) => onChange("netSales", event.target.value)}
            placeholder="0"
          />
        )}
      </Field>

      <Field label="מכירות ברוטו (₪)" error={errors.grossSales}>
        {({ id, describedBy, invalid }) => (
          <Input
            id={id}
            type="number"
            inputMode="decimal"
            dir="ltr"
            aria-describedby={describedBy}
            invalid={invalid}
            value={values.grossSales}
            onChange={(event) => onChange("grossSales", event.target.value)}
            placeholder="0"
          />
        )}
      </Field>

      <Field label="אשראי (₪)">
        {({ id }) => (
          <Input
            id={id}
            type="number"
            inputMode="decimal"
            dir="ltr"
            value={values.credit}
            onChange={(event) => onChange("credit", event.target.value)}
            placeholder="0"
          />
        )}
      </Field>

      <Field label="מזומן (₪)">
        {({ id }) => (
          <Input
            id={id}
            type="number"
            inputMode="decimal"
            dir="ltr"
            value={values.cash}
            onChange={(event) => onChange("cash", event.target.value)}
            placeholder="0"
          />
        )}
      </Field>

      <Field label="העברות (₪)">
        {({ id }) => (
          <Input
            id={id}
            type="number"
            inputMode="decimal"
            dir="ltr"
            value={values.transfers}
            onChange={(event) => onChange("transfers", event.target.value)}
            placeholder="0"
          />
        )}
      </Field>

      <Field label="צ׳קים (₪)">
        {({ id }) => (
          <Input
            id={id}
            type="number"
            inputMode="decimal"
            dir="ltr"
            value={values.checks}
            onChange={(event) => onChange("checks", event.target.value)}
            placeholder="0"
          />
        )}
      </Field>

      <Field label="הערה" wide>
        {({ id }) => (
          <Textarea
            id={id}
            value={values.note}
            onChange={(event) => onChange("note", event.target.value)}
            placeholder="אירוע מיוחד, הנחה, פסטיבל…"
          />
        )}
      </Field>

      <div className="field field--wide">
        <button
          type="button"
          className="global-add__collapse-trigger"
          aria-expanded={externalOpen}
          onClick={() => setExternalOpen((open) => !open)}
        >
          <ChevronDown
            size={16}
            className={`global-add__collapse-chevron${
              externalOpen ? " global-add__collapse-chevron--open" : ""
            }`}
          />
          <span className="global-add__collapse-label">הכנסות חיצוניות</span>
        </button>
      </div>

      {externalOpen && (
        <>
          <Field label="Cibus (₪)">
            {({ id }) => (
              <Input
                id={id}
                type="number"
                inputMode="decimal"
                dir="ltr"
                value={values.cibus}
                onChange={(event) => onChange("cibus", event.target.value)}
                placeholder="0"
              />
            )}
          </Field>
          <Field label="Wolt (₪)">
            {({ id }) => (
              <Input
                id={id}
                type="number"
                inputMode="decimal"
                dir="ltr"
                value={values.wolt}
                onChange={(event) => onChange("wolt", event.target.value)}
                placeholder="0"
              />
            )}
          </Field>
          <Field label="10bis (₪)">
            {({ id }) => (
              <Input
                id={id}
                type="number"
                inputMode="decimal"
                dir="ltr"
                value={values.tenbis}
                onChange={(event) => onChange("tenbis", event.target.value)}
                placeholder="0"
              />
            )}
          </Field>
          <Field label="Bit (₪)">
            {({ id }) => (
              <Input
                id={id}
                type="number"
                inputMode="decimal"
                dir="ltr"
                value={values.bit}
                onChange={(event) => onChange("bit", event.target.value)}
                placeholder="0"
              />
            )}
          </Field>
        </>
      )}
    </div>
  );
}
