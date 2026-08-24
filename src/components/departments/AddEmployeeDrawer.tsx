import { useState } from "react";
import {
  employmentTypes,
  roles,
  type Department,
  type Employee,
} from "../../data/departments";
import { createEmployee, nextEmployeeNumber } from "../../lib/useDepartments";
import { Field } from "../ui/Field";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { FormDrawer } from "./FormDrawer";

export interface AddEmployeeDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The department the flow was launched from. */
  department: Department;
  /** Every department, so the field can still be changed. */
  departments: Department[];
  onCreated: (employee: Employee) => void;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  departmentId?: string;
  employmentType?: string;
}

/** Deliberately permissive — enough to catch a typo, not to police addresses. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AddEmployeeDrawer({
  open,
  onOpenChange,
  department,
  departments,
  onCreated,
}: AddEmployeeDrawerProps) {
  const blank = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    // The department the user came from is already chosen; they should not
    // have to pick it again.
    departmentId: department.id,
    employmentType: "full",
  };

  const [values, setValues] = useState(blank);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [failure, setFailure] = useState<string | undefined>();
  const [employeeNumber, setEmployeeNumber] = useState(nextEmployeeNumber);

  /**
   * Closing resets the form and takes the next payroll number, so reopening
   * starts clean and re-seeds the owning department. Done on the close event
   * rather than in an effect watching `open`.
   */
  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
        departmentId: department.id,
        employmentType: "full",
      });
      setErrors({});
      setFailure(undefined);
      setSubmitting(false);
      setEmployeeNumber(nextEmployeeNumber());
    }
    onOpenChange(next);
  };

  const set = (key: keyof typeof blank, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.firstName.trim()) next.firstName = "יש להזין שם פרטי";
    if (!values.lastName.trim()) next.lastName = "יש להזין שם משפחה";
    if (!values.email.trim()) next.email = "יש להזין כתובת מייל";
    else if (!EMAIL.test(values.email.trim())) next.email = "כתובת המייל אינה תקינה";
    if (!values.phone.trim()) next.phone = "יש להזין מספר טלפון";
    if (!values.role) next.role = "יש לבחור תפקיד";
    if (!values.departmentId) next.departmentId = "יש לבחור מחלקה";
    if (!values.employmentType) next.employmentType = "יש לבחור היקף משרה";
    return next;
  };

  const submit = async () => {
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    setFailure(undefined);
    try {
      const employee = await createEmployee(values);
      handleOpenChange(false);
      onCreated(employee);
    } catch {
      setFailure("לא הצלחנו להוסיף את העובד. נסו שוב.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormDrawer
      open={open}
      onOpenChange={handleOpenChange}
      title="הוסף עובד חדש"
      description={`מחלקת ${department.name}`}
      submitLabel="הוסף עובד"
      submitting={submitting}
      error={failure}
      onSubmit={submit}
    >
      <div className="form-drawer__grid">
        <Field label="שם פרטי" error={errors.firstName}>
          {({ id, describedBy, invalid }) => (
            <Input
              id={id}
              aria-describedby={describedBy}
              invalid={invalid}
              value={values.firstName}
              onChange={(event) => set("firstName", event.target.value)}
              placeholder="שם פרטי"
              autoComplete="given-name"
            />
          )}
        </Field>

        <Field label="שם משפחה" error={errors.lastName}>
          {({ id, describedBy, invalid }) => (
            <Input
              id={id}
              aria-describedby={describedBy}
              invalid={invalid}
              value={values.lastName}
              onChange={(event) => set("lastName", event.target.value)}
              placeholder="שם משפחה"
              autoComplete="family-name"
            />
          )}
        </Field>

        <Field label="כתובת מייל" error={errors.email} wide>
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

        {/* Assigned by payroll, not typed — shown so the number is known. */}
        <Field label="מספר עובד">
          {({ id }) => <Input id={id} dir="ltr" value={employeeNumber} disabled readOnly />}
        </Field>

        <Field label="מחלקה" error={errors.departmentId}>
          {({ id, describedBy, invalid }) => (
            <Select
              id={id}
              describedBy={describedBy}
              invalid={invalid}
              label="מחלקה"
              value={values.departmentId}
              onChange={(value) => set("departmentId", value)}
              options={departments.map((entry) => ({
                value: entry.id,
                label: entry.name,
              }))}
            />
          )}
        </Field>

        <Field label="תפקיד" error={errors.role}>
          {({ id, describedBy, invalid }) => (
            <Select
              id={id}
              describedBy={describedBy}
              invalid={invalid}
              label="תפקיד"
              value={values.role}
              onChange={(value) => set("role", value)}
              options={roles.map((role) => ({
                value: role.id,
                label: role.label,
              }))}
            />
          )}
        </Field>

        <Field label="היקף משרה" error={errors.employmentType} wide>
          {({ id, describedBy, invalid }) => (
            <Select
              id={id}
              describedBy={describedBy}
              invalid={invalid}
              label="היקף משרה"
              value={values.employmentType}
              onChange={(value) => set("employmentType", value)}
              options={employmentTypes.map((type) => ({
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
