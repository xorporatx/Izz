import { podcastCategories } from "../../data/globalAdd";
import { Field } from "../ui/Field";
import { Input } from "../ui/Input";
import { Select, type SelectOption } from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import { ReceiptUploadButtons } from "./ReceiptUploadButtons";

export interface PodcastDraft {
  date: string;
  category: string;
  supplierId: string;
  amountWithVat: string;
  amountWithoutVat: string;
  invoiceNumber: string;
  note: string;
}

export const emptyPodcastDraft: PodcastDraft = {
  date: "",
  category: "",
  supplierId: "",
  amountWithVat: "",
  amountWithoutVat: "",
  invoiceNumber: "",
  note: "",
};

export interface PodcastErrors {
  date?: string;
  category?: string;
  supplierId?: string;
  amountWithVat?: string;
}

export interface PodcastEntryFormProps {
  values: PodcastDraft;
  errors: PodcastErrors;
  onChange: (key: keyof PodcastDraft, value: string) => void;
  /** Every supplier, plus the sentinel row that opens "הוסף ספק חדש". */
  supplierOptions: SelectOption[];
}

/**
 * פודקוסט tab (frame 740:33333) — a purchase line against a supplier.
 *
 * "שם הספק" is the one field on this drawer that reaches outside the daily
 * log: choosing a supplier records against the live `useSuppliers` list, so
 * submitting this tab is the one הוצאות/הכנסות/פודקוסט path with a page that
 * visibly updates afterward — /food-cost and the supplier's own page.
 */
export function PodcastEntryForm({
  values,
  errors,
  onChange,
  supplierOptions,
}: PodcastEntryFormProps) {
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

      <Field label="קטגוריה" error={errors.category}>
        {({ id, describedBy, invalid }) => (
          <Select
            id={id}
            describedBy={describedBy}
            invalid={invalid}
            label="קטגוריה"
            value={values.category}
            onChange={(value) => onChange("category", value)}
            options={podcastCategories.map((entry) => ({
              value: entry.id,
              label: entry.label,
            }))}
          />
        )}
      </Field>

      <Field label="שם הספק" error={errors.supplierId}>
        {({ id, describedBy, invalid }) => (
          <Select
            id={id}
            describedBy={describedBy}
            invalid={invalid}
            label="שם הספק"
            value={values.supplierId}
            onChange={(value) => onChange("supplierId", value)}
            options={supplierOptions}
          />
        )}
      </Field>

      <Field label="סכום כולל מע״מ (₪)" error={errors.amountWithVat}>
        {({ id, describedBy, invalid }) => (
          <Input
            id={id}
            type="number"
            inputMode="decimal"
            dir="ltr"
            aria-describedby={describedBy}
            invalid={invalid}
            value={values.amountWithVat}
            onChange={(event) => onChange("amountWithVat", event.target.value)}
            placeholder="0"
          />
        )}
      </Field>

      <Field label="סכום ללא מע״מ (₪)">
        {({ id }) => (
          <Input
            id={id}
            type="number"
            inputMode="decimal"
            dir="ltr"
            value={values.amountWithoutVat}
            onChange={(event) => onChange("amountWithoutVat", event.target.value)}
            placeholder="0"
          />
        )}
      </Field>

      <Field label="מספר חשבונית" wide>
        {({ id }) => (
          <Input
            id={id}
            dir="ltr"
            value={values.invoiceNumber}
            onChange={(event) => onChange("invoiceNumber", event.target.value)}
            placeholder="מספר חשבונית"
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
