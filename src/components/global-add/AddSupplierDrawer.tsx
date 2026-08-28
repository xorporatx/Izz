import { useState } from "react";
import { supplierCategories } from "../../data/globalAdd";
import type { Supplier } from "../../data/suppliers";
import { createSupplier, nextSupplierNumber } from "../../lib/useSuppliers";
import { FormDrawer } from "../departments/FormDrawer";
import { Field } from "../ui/Field";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

export interface AddSupplierDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (supplier: Supplier) => void;
}

interface Errors {
  name?: string;
  businessNumber?: string;
  email?: string;
  phone?: string;
  category?: string;
}

/** Deliberately permissive — enough to catch a typo, not to police addresses. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BLANK = { name: "", businessNumber: "", email: "", phone: "", category: "" };

/**
 * "הוסף ספק חדש" (frame 740:33698) — reached from the פודקוסט tab's שם הספק
 * field. Fields and layout mirror `AddEmployeeDrawer` almost exactly: the
 * frame draws both forms from the same two-column pattern, down to the
 * read-only auto-numbered id.
 */
export function AddSupplierDrawer({
  open,
  onOpenChange,
  onCreated,
}: AddSupplierDrawerProps) {
  const [values, setValues] = useState(BLANK);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [failure, setFailure] = useState<string | undefined>();
  const [supplierNumber, setSupplierNumber] = useState(nextSupplierNumber);

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setValues(BLANK);
      setErrors({});
      setFailure(undefined);
      setSubmitting(false);
      setSupplierNumber(nextSupplierNumber());
    }
    onOpenChange(next);
  };

  const set = (key: keyof typeof BLANK, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "יש להזין שם ספק";
    if (!values.businessNumber.trim()) next.businessNumber = "יש להזין ח.פ";
    if (!values.email.trim()) next.email = "יש להזין כתובת מייל";
    else if (!EMAIL.test(values.email.trim())) next.email = "כתובת המייל אינה תקינה";
    if (!values.phone.trim()) next.phone = "יש להזין מספר טלפון";
    if (!values.category) next.category = "יש לבחור מחלקה";
    return next;
  };

  const submit = async () => {
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    setFailure(undefined);
    try {
      const supplier = await createSupplier(values);
      handleOpenChange(false);
      onCreated(supplier);
    } catch {
      setFailure("לא הצלחנו להוסיף את הספק. נסו שוב.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormDrawer
      open={open}
      onOpenChange={handleOpenChange}
      title="הוסף ספק חדש"
      submitLabel="הוסף ספק"
      submitting={submitting}
      error={failure}
      onSubmit={submit}
    >
      <div className="form-drawer__grid">
        <Field label="שם הספק" error={errors.name}>
          {({ id, describedBy, invalid }) => (
            <Input
              id={id}
              aria-describedby={describedBy}
              invalid={invalid}
              value={values.name}
              onChange={(event) => set("name", event.target.value)}
              placeholder="שם הספק"
              autoComplete="off"
            />
          )}
        </Field>

        <Field label="ח.פ" error={errors.businessNumber}>
          {({ id, describedBy, invalid }) => (
            <Input
              id={id}
              dir="ltr"
              aria-describedby={describedBy}
              invalid={invalid}
              value={values.businessNumber}
              onChange={(event) => set("businessNumber", event.target.value)}
              placeholder="חפ"
              autoComplete="off"
            />
          )}
        </Field>

        <Field label="כתובת אימייל" error={errors.email}>
          {({ id, describedBy, invalid }) => (
            <Input
              id={id}
              type="email"
              dir="ltr"
              aria-describedby={describedBy}
              invalid={invalid}
              value={values.email}
              onChange={(event) => set("email", event.target.value)}
              placeholder="אימייל"
              autoComplete="email"
            />
          )}
        </Field>

        <Field label="מחלקה" error={errors.category}>
          {({ id, describedBy, invalid }) => (
            <Select
              id={id}
              describedBy={describedBy}
              invalid={invalid}
              label="מחלקה"
              value={values.category}
              onChange={(value) => set("category", value)}
              options={supplierCategories.map((entry) => ({
                value: entry.id,
                label: entry.label,
              }))}
            />
          )}
        </Field>

        <Field label="מספר טלפון" error={errors.phone}>
          {({ id, describedBy, invalid }) => (
            <Input
              id={id}
              type="tel"
              dir="ltr"
              aria-describedby={describedBy}
              invalid={invalid}
              value={values.phone}
              onChange={(event) => set("phone", event.target.value)}
              placeholder="000-00000000"
              autoComplete="tel"
            />
          )}
        </Field>

        {/* Assigned by the ledger, not typed — shown so the number is known. */}
        <Field label="מספר ספק">
          {({ id }) => (
            <Input id={id} dir="ltr" value={supplierNumber} disabled readOnly />
          )}
        </Field>
      </div>
    </FormDrawer>
  );
}
