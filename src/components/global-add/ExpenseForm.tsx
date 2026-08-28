import { expenseTypes } from "../../data/globalAdd";
import { Field } from "../ui/Field";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import { ReceiptUploadButtons } from "./ReceiptUploadButtons";

export interface ExpenseDraft {
  date: string;
  expenseType: string;
  amount: string;
  supplierOrDetail: string;
  note: string;
}

export const emptyExpenseDraft: ExpenseDraft = {
  date: "",
  expenseType: "",
  amount: "",
  supplierOrDetail: "",
  note: "",
};

export interface ExpenseErrors {
  date?: string;
  expenseType?: string;
  amount?: string;
}

export interface ExpenseFormProps {
  values: ExpenseDraft;
  errors: ExpenseErrors;
  onChange: (key: keyof ExpenseDraft, value: string) => void;
}

/** הוצאות tab (frame 740:33400) — a general business expense. */
export function ExpenseForm({ values, errors, onChange }: ExpenseFormProps) {
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

      <Field label="סוג הוצאה" error={errors.expenseType}>
        {({ id, describedBy, invalid }) => (
          <Select
            id={id}
            describedBy={describedBy}
            invalid={invalid}
            label="סוג הוצאה"
            value={values.expenseType}
            onChange={(value) => onChange("expenseType", value)}
            options={expenseTypes.map((entry) => ({
              value: entry.id,
              label: entry.label,
            }))}
          />
        )}
      </Field>

      <Field label="סכום" error={errors.amount}>
        {({ id, describedBy, invalid }) => (
          <Input
            id={id}
            type="number"
            inputMode="decimal"
            dir="ltr"
            aria-describedby={describedBy}
            invalid={invalid}
            value={values.amount}
            onChange={(event) => onChange("amount", event.target.value)}
            placeholder="0"
          />
        )}
      </Field>

      <Field label="ספק/פרט" wide>
        {({ id }) => (
          <Input
            id={id}
            value={values.supplierOrDetail}
            onChange={(event) => onChange("supplierOrDetail", event.target.value)}
            placeholder="ספק/פרט"
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
    </div>
  );
}
