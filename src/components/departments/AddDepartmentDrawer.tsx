import { useState } from "react";
import {
  departmentTypes,
  managers,
  type Department,
} from "../../data/departments";
import { createDepartment } from "../../lib/useDepartments";
import { Field } from "../ui/Field";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { FormDrawer } from "./FormDrawer";

export interface AddDepartmentDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Handed the created department so the caller can navigate to its page. */
  onCreated: (department: Department) => void;
}

interface Errors {
  name?: string;
  managerId?: string;
  type?: string;
}

const EMPTY = { name: "", managerId: "", type: "" };

/**
 * "הוסף מחלקה חדשה" — the three fields from Figma frame 648:5880.
 *
 * Validation runs on submit rather than on every keystroke, so a field the
 * user has not reached yet never shows an error; once a field has failed, its
 * message clears as soon as it is corrected.
 */
export function AddDepartmentDrawer({
  open,
  onOpenChange,
  onCreated,
}: AddDepartmentDrawerProps) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [failure, setFailure] = useState<string | undefined>();

  /**
   * Closing clears the form, so reopening offers a blank one rather than the
   * last attempt's leftovers. Done on the close event rather than in an
   * effect watching `open` — there is no external system to synchronise with.
   */
  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setValues(EMPTY);
      setErrors({});
      setFailure(undefined);
      setSubmitting(false);
    }
    onOpenChange(next);
  };

  const set = (key: keyof typeof EMPTY, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "יש להזין שם מחלקה";
    if (!values.managerId) next.managerId = "יש לבחור מנהל למחלקה";
    if (!values.type) next.type = "יש לבחור סוג מחלקה";
    return next;
  };

  const submit = async () => {
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    setFailure(undefined);
    try {
      const department = await createDepartment({
        name: values.name,
        managerId: values.managerId,
        type: values.type,
      });
      handleOpenChange(false);
      onCreated(department);
    } catch {
      setFailure("לא הצלחנו ליצור את המחלקה. נסו שוב.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormDrawer
      open={open}
      onOpenChange={handleOpenChange}
      title="הוסף מחלקה חדשה"
      submitLabel="הוסף מחלקה"
      submitting={submitting}
      error={failure}
      onSubmit={submit}
    >
      <div className="form-drawer__grid">
        <Field label="שם המחלקה" error={errors.name} wide>
          {({ id, describedBy, invalid }) => (
            <Input
              id={id}
              aria-describedby={describedBy}
              invalid={invalid}
              value={values.name}
              onChange={(event) => set("name", event.target.value)}
              placeholder="הוסף מחלקה"
              autoComplete="off"
            />
          )}
        </Field>

        <Field label="מנהל המחלקה" error={errors.managerId} wide>
          {({ id, describedBy, invalid }) => (
            <Select
              id={id}
              describedBy={describedBy}
              invalid={invalid}
              label="מנהל המחלקה"
              placeholder="בחר מנהל"
              value={values.managerId}
              onChange={(value) => set("managerId", value)}
              options={managers.map((manager) => ({
                value: manager.id,
                label: manager.name,
              }))}
            />
          )}
        </Field>

        <Field label="תחום / סוג המחלקה" error={errors.type} wide>
          {({ id, describedBy, invalid }) => (
            <Select
              id={id}
              describedBy={describedBy}
              invalid={invalid}
              label="תחום / סוג המחלקה"
              placeholder="בחר תחום"
              value={values.type}
              onChange={(value) => set("type", value)}
              options={departmentTypes.map((type) => ({
                value: type.id,
                label: type.label,
              }))}
            />
          )}
        </Field>
      </div>
    </FormDrawer>
  );
}
