import { formatCurrency } from "../../data/departments";
import { Field } from "../ui/Field";
import { Input } from "../ui/Input";
import { Select, type SelectOption } from "../ui/Select";

export interface LaborDraft {
  mode: "single" | "multiple";
  date: string;
  departmentId: string;
  employeeId: string;
  rate: string;
  netHours: string;
  hours: string;
  percentage: string;
  targetAmount: string;
}

export const emptyLaborDraft: LaborDraft = {
  mode: "single",
  date: "",
  departmentId: "",
  employeeId: "",
  rate: "",
  netHours: "",
  hours: "",
  percentage: "",
  targetAmount: "",
};

export interface LaborErrors {
  date?: string;
  departmentId?: string;
  employeeId?: string;
  rate?: string;
  hours?: string;
}

export interface LaborFormProps {
  values: LaborDraft;
  errors: LaborErrors;
  onChange: (key: keyof LaborDraft, value: string) => void;
  departmentOptions: SelectOption[];
  /** Every employee in the chosen department, plus the "הוסף עובד חדש" row. */
  employeeOptions: SelectOption[];
}

/**
 * לייבור tab (frame 740:33460) — hours and pay against an existing employee.
 *
 * "מספר עובדים" (recording several employees in one pass) has no fields
 * drawn anywhere in this Figma section — only "עובד בודד"'s content exists —
 * so the toggle is real and switches, but the multiple-employee side states
 * its own gap honestly rather than inventing a row-repeater the design never
 * specified.
 *
 * The cost readout is a real computation, not a static copy of the frame's
 * "₪0" placeholders: תעריף × שעות is the one reading the visible fields
 * support without guessing at שעה נטו's exact role, and the frame applies
 * the same "+25%" to both עלות מחלקה and עלות מעביד, so both are that base
 * times 1.25.
 */
export function LaborForm({
  values,
  errors,
  onChange,
  departmentOptions,
  employeeOptions,
}: LaborFormProps) {
  const rate = Number(values.rate) || 0;
  const hours = Number(values.hours) || 0;
  const base = rate * hours;
  const withOverhead = base * 1.25;

  return (
    <div className="global-add__grid">
      <div className="field field--wide">
        <div
          className="global-add__segmented"
          role="tablist"
          aria-label="היקף ההזנה"
        >
          <button
            type="button"
            role="tab"
            aria-selected={values.mode === "single"}
            className={`global-add__segment${
              values.mode === "single" ? " global-add__segment--active" : ""
            }`}
            onClick={() => onChange("mode", "single")}
          >
            עובד בודד
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={values.mode === "multiple"}
            className={`global-add__segment${
              values.mode === "multiple" ? " global-add__segment--active" : ""
            }`}
            onClick={() => onChange("mode", "multiple")}
          >
            מספר עובדים
          </button>
        </div>
      </div>

      {values.mode === "multiple" ? (
        <p className="global-add__note field field--wide">
          הזנה של מספר עובדים בבת אחת אינה זמינה כרגע. עברו ל״עובד בודד״
          כדי להמשיך.
        </p>
      ) : (
        <>
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

          <Field label="מחלקה" error={errors.departmentId}>
            {({ id, describedBy, invalid }) => (
              <Select
                id={id}
                describedBy={describedBy}
                invalid={invalid}
                label="מחלקה"
                value={values.departmentId}
                onChange={(value) => onChange("departmentId", value)}
                options={departmentOptions}
              />
            )}
          </Field>

          <Field label="שם העובד" error={errors.employeeId}>
            {({ id, describedBy, invalid }) => (
              <Select
                id={id}
                describedBy={describedBy}
                invalid={invalid}
                label="שם העובד"
                value={values.employeeId}
                onChange={(value) => onChange("employeeId", value)}
                options={employeeOptions}
                disabled={!values.departmentId}
              />
            )}
          </Field>

          <div className="global-add__grid global-add__grid--three field field--wide">
            <Field label="תעריף" error={errors.rate}>
              {({ id, describedBy, invalid }) => (
                <Input
                  id={id}
                  type="number"
                  inputMode="decimal"
                  dir="ltr"
                  aria-describedby={describedBy}
                  invalid={invalid}
                  value={values.rate}
                  onChange={(event) => onChange("rate", event.target.value)}
                  placeholder="0"
                />
              )}
            </Field>
            <Field label="שעה נטו">
              {({ id }) => (
                <Input
                  id={id}
                  type="number"
                  inputMode="decimal"
                  dir="ltr"
                  value={values.netHours}
                  onChange={(event) => onChange("netHours", event.target.value)}
                  placeholder="0"
                />
              )}
            </Field>
            <Field label="שעות" error={errors.hours}>
              {({ id, describedBy, invalid }) => (
                <Input
                  id={id}
                  type="number"
                  inputMode="decimal"
                  dir="ltr"
                  aria-describedby={describedBy}
                  invalid={invalid}
                  value={values.hours}
                  onChange={(event) => onChange("hours", event.target.value)}
                  placeholder="0"
                />
              )}
            </Field>
          </div>

          <Field label="באחוזים">
            {({ id }) => (
              <Input
                id={id}
                type="number"
                inputMode="decimal"
                dir="ltr"
                value={values.percentage}
                onChange={(event) => onChange("percentage", event.target.value)}
                placeholder="0"
              />
            )}
          </Field>

          <Field label="סכום יעד">
            {({ id }) => (
              <Input
                id={id}
                type="number"
                inputMode="decimal"
                dir="ltr"
                value={values.targetAmount}
                onChange={(event) => onChange("targetAmount", event.target.value)}
                placeholder="0"
              />
            )}
          </Field>

          <div className="global-add__totals field field--wide">
            <div className="global-add__totals-row">
              <span>
                <span className="global-add__totals-label">סה״כ עלות: </span>
                <span className="global-add__totals-value numeric">
                  {formatCurrency(Math.round(base))}
                </span>
              </span>
              <span>
                <span className="global-add__totals-employer">
                  עלות מחלקה (+25%):{" "}
                </span>
                <span className="global-add__totals-employer-value numeric">
                  {formatCurrency(Math.round(withOverhead))}
                </span>
              </span>
            </div>
            <div className="global-add__totals-row">
              <span>
                <span className="global-add__totals-label">סה״כ עלות: </span>
                <span className="global-add__totals-value numeric">
                  {formatCurrency(Math.round(base))}
                </span>
              </span>
              <span>
                <span className="global-add__totals-employer">
                  עלות מעביד (+25%):{" "}
                </span>
                <span className="global-add__totals-employer-value numeric">
                  {formatCurrency(Math.round(withOverhead))}
                </span>
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
