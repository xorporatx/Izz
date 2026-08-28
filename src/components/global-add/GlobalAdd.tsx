import { useState } from "react";
import {
  employeeName,
  formatCurrency,
  type Employee,
} from "../../data/departments";
import type { GlobalAddTabId } from "../../data/globalAdd";
import type { Supplier } from "../../data/suppliers";
import { AddEmployeeDrawer } from "../departments/AddEmployeeDrawer";
import {
  createLaborEntry,
  createExpenseEntry,
  createIncomeEntry,
  createPodcastEntry,
} from "../../lib/useDailyEntries";
import {
  recordLaborEntry,
  useDepartment,
  useDepartmentEmployees,
  useDepartments,
} from "../../lib/useDepartments";
import { useSuppliers } from "../../lib/useSuppliers";
import { AddSupplierDrawer } from "./AddSupplierDrawer";
import {
  emptyExpenseDraft,
  ExpenseForm,
  type ExpenseDraft,
  type ExpenseErrors,
} from "./ExpenseForm";
import { GlobalAddDrawer } from "./GlobalAddDrawer";
import {
  emptyIncomeDraft,
  IncomeForm,
  type IncomeDraft,
  type IncomeErrors,
} from "./IncomeForm";
import {
  emptyLaborDraft,
  LaborForm,
  type LaborDraft,
  type LaborErrors,
} from "./LaborForm";
import {
  emptyPodcastDraft,
  PodcastEntryForm,
  type PodcastDraft,
  type PodcastErrors,
} from "./PodcastEntryForm";

export interface GlobalAddProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Sentinel value for a select's trailing "+ add new" row. */
const NEW_SUPPLIER = "__new_supplier__";
const NEW_EMPLOYEE = "__new_employee__";

const num = (value: string) => Number(value) || 0;

/**
 * The ＋ button's flow, wired end to end.
 *
 * One `GlobalAddDrawer` shell, four independent draft/error state slices —
 * one per tab, so switching tabs never loses what was typed on another —
 * and one submit dispatcher that calls whichever tab is active. Two tabs
 * additionally open a nested creation drawer from inside a select: פודקוסט's
 * שם הספק can open `AddSupplierDrawer`, לייבור's שם העובד can open the
 * department flow's own `AddEmployeeDrawer`. Both reuse the exact components
 * already built for their respective pages rather than forking new ones.
 */
export function GlobalAdd({ open, onOpenChange }: GlobalAddProps) {
  const [tab, setTab] = useState<GlobalAddTabId>("income");
  const [submitting, setSubmitting] = useState(false);
  const [failure, setFailure] = useState<string | undefined>();
  const [announcement, setAnnouncement] = useState("");

  const [income, setIncome] = useState<IncomeDraft>(emptyIncomeDraft);
  const [incomeErrors, setIncomeErrors] = useState<IncomeErrors>({});
  const [podcast, setPodcast] = useState<PodcastDraft>(emptyPodcastDraft);
  const [podcastErrors, setPodcastErrors] = useState<PodcastErrors>({});
  const [expense, setExpense] = useState<ExpenseDraft>(emptyExpenseDraft);
  const [expenseErrors, setExpenseErrors] = useState<ExpenseErrors>({});
  const [labor, setLabor] = useState<LaborDraft>(emptyLaborDraft);
  const [laborErrors, setLaborErrors] = useState<LaborErrors>({});

  const [addSupplierOpen, setAddSupplierOpen] = useState(false);
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);

  const suppliers = useSuppliers();
  const departments = useDepartments();
  const laborDepartment = useDepartment(labor.departmentId);
  const departmentEmployees = useDepartmentEmployees(labor.departmentId);

  const resetAll = () => {
    setTab("income");
    setIncome(emptyIncomeDraft);
    setIncomeErrors({});
    setPodcast(emptyPodcastDraft);
    setPodcastErrors({});
    setExpense(emptyExpenseDraft);
    setExpenseErrors({});
    setLabor(emptyLaborDraft);
    setLaborErrors({});
    setFailure(undefined);
    setSubmitting(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) resetAll();
    onOpenChange(next);
  };

  const supplierOptions = [
    ...suppliers.map((s: Supplier) => ({ value: s.id, label: s.name })),
    { value: NEW_SUPPLIER, label: "+ הוסף ספק חדש" },
  ];

  const departmentOptions = departments.map((d) => ({ value: d.id, label: d.name }));

  const employeeOptions = labor.departmentId
    ? [
        ...departmentEmployees.map((e: Employee) => ({
          value: e.id,
          label: employeeName(e),
        })),
        { value: NEW_EMPLOYEE, label: "+ הוסף עובד חדש" },
      ]
    : [];

  const onSupplierChange = (value: string) => {
    if (value === NEW_SUPPLIER) {
      setAddSupplierOpen(true);
      return;
    }
    setPodcast((current) => ({ ...current, supplierId: value }));
    setPodcastErrors((current) => ({ ...current, supplierId: undefined }));
  };

  const onEmployeeChange = (value: string) => {
    if (value === NEW_EMPLOYEE) {
      setAddEmployeeOpen(true);
      return;
    }
    setLabor((current) => ({ ...current, employeeId: value }));
    setLaborErrors((current) => ({ ...current, employeeId: undefined }));
  };

  const onDepartmentChange = (value: string) => {
    // Changing department invalidates whichever employee was chosen for the
    // old one — a stale id from a different department must not submit.
    setLabor((current) => ({ ...current, departmentId: value, employeeId: "" }));
    setLaborErrors((current) => ({ ...current, departmentId: undefined }));
  };

  const submit = async () => {
    setFailure(undefined);

    if (tab === "income") {
      const errors: IncomeErrors = {};
      if (!income.date) errors.date = "יש לבחור תאריך";
      if (!income.netSales) errors.netSales = "יש להזין מכירות נטו";
      if (!income.grossSales) errors.grossSales = "יש להזין מכירות ברוטו";
      setIncomeErrors(errors);
      if (Object.keys(errors).length > 0) return;

      setSubmitting(true);
      try {
        await createIncomeEntry({
          date: income.date,
          netSales: num(income.netSales),
          grossSales: num(income.grossSales),
          credit: num(income.credit),
          cash: num(income.cash),
          transfers: num(income.transfers),
          checks: num(income.checks),
          note: income.note,
          external: {
            cibus: num(income.cibus),
            wolt: num(income.wolt),
            tenbis: num(income.tenbis),
            bit: num(income.bit),
          },
        });
        setAnnouncement("ההכנסה נשמרה בהצלחה");
        handleOpenChange(false);
      } catch {
        setFailure("לא הצלחנו לשמור. נסו שוב.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (tab === "podcast") {
      const errors: PodcastErrors = {};
      if (!podcast.date) errors.date = "יש לבחור תאריך";
      if (!podcast.category) errors.category = "יש לבחור קטגוריה";
      if (!podcast.supplierId) errors.supplierId = "יש לבחור ספק";
      if (!podcast.amountWithVat) errors.amountWithVat = "יש להזין סכום";
      setPodcastErrors(errors);
      if (Object.keys(errors).length > 0) return;

      setSubmitting(true);
      try {
        await createPodcastEntry({
          date: podcast.date,
          category: podcast.category,
          supplierId: podcast.supplierId,
          amountWithVat: num(podcast.amountWithVat),
          amountWithoutVat: num(podcast.amountWithoutVat),
          invoiceNumber: podcast.invoiceNumber,
          note: podcast.note,
        });
        const supplier = suppliers.find((s: Supplier) => s.id === podcast.supplierId);
        setAnnouncement(
          supplier ? `הרכישה מ${supplier.name} נשמרה בהצלחה` : "הרכישה נשמרה בהצלחה",
        );
        handleOpenChange(false);
      } catch {
        setFailure("לא הצלחנו לשמור. נסו שוב.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (tab === "expense") {
      const errors: ExpenseErrors = {};
      if (!expense.date) errors.date = "יש לבחור תאריך";
      if (!expense.expenseType) errors.expenseType = "יש לבחור סוג הוצאה";
      if (!expense.amount) errors.amount = "יש להזין סכום";
      setExpenseErrors(errors);
      if (Object.keys(errors).length > 0) return;

      setSubmitting(true);
      try {
        await createExpenseEntry({
          date: expense.date,
          expenseType: expense.expenseType,
          amount: num(expense.amount),
          supplierOrDetail: expense.supplierOrDetail,
          note: expense.note,
        });
        setAnnouncement("ההוצאה נשמרה בהצלחה");
        handleOpenChange(false);
      } catch {
        setFailure("לא הצלחנו לשמור. נסו שוב.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    // labor
    if (labor.mode === "multiple") {
      setFailure("הזנה של מספר עובדים בבת אחת אינה זמינה כרגע.");
      return;
    }

    const errors: LaborErrors = {};
    if (!labor.date) errors.date = "יש לבחור תאריך";
    if (!labor.departmentId) errors.departmentId = "יש לבחור מחלקה";
    if (!labor.employeeId) errors.employeeId = "יש לבחור עובד";
    if (!labor.rate) errors.rate = "יש להזין תעריף";
    if (!labor.hours) errors.hours = "יש להזין שעות";
    setLaborErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      const rate = num(labor.rate);
      const hours = num(labor.hours);
      const base = rate * hours;
      const withOverhead = Math.round(base * 1.25);

      await createLaborEntry({
        date: labor.date,
        departmentId: labor.departmentId,
        employeeId: labor.employeeId,
        rate,
        netHours: num(labor.netHours),
        hours,
        percentage: num(labor.percentage),
        targetAmount: num(labor.targetAmount),
      });
      const employee = await recordLaborEntry(labor.employeeId, {
        hours,
        employeeCost: withOverhead,
        employerCost: withOverhead,
      });
      setAnnouncement(
        employee
          ? `${hours} שעות נוספו ל${employeeName(employee)} — ${formatCurrency(withOverhead)}`
          : "השעות נשמרו בהצלחה",
      );
      handleOpenChange(false);
    } catch {
      setFailure("לא הצלחנו לשמור. נסו שוב.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <p className="sr-only" role="status">
        {announcement}
      </p>

      <GlobalAddDrawer
        open={open}
        onOpenChange={handleOpenChange}
        activeTab={tab}
        onTabChange={setTab}
        submitting={submitting}
        error={failure}
        onSubmit={submit}
      >
        {tab === "income" && (
          <IncomeForm
            values={income}
            errors={incomeErrors}
            onChange={(key, value) => {
              setIncome((current) => ({ ...current, [key]: value }));
              if (key in incomeErrors) {
                setIncomeErrors((current) => ({ ...current, [key]: undefined }));
              }
            }}
          />
        )}

        {tab === "podcast" && (
          <PodcastEntryForm
            values={podcast}
            errors={podcastErrors}
            supplierOptions={supplierOptions}
            onChange={(key, value) => {
              if (key === "supplierId") {
                onSupplierChange(value);
                return;
              }
              setPodcast((current) => ({ ...current, [key]: value }));
              if (key in podcastErrors) {
                setPodcastErrors((current) => ({ ...current, [key]: undefined }));
              }
            }}
          />
        )}

        {tab === "expense" && (
          <ExpenseForm
            values={expense}
            errors={expenseErrors}
            onChange={(key, value) => {
              setExpense((current) => ({ ...current, [key]: value }));
              if (key in expenseErrors) {
                setExpenseErrors((current) => ({ ...current, [key]: undefined }));
              }
            }}
          />
        )}

        {tab === "labor" && (
          <LaborForm
            values={labor}
            errors={laborErrors}
            departmentOptions={departmentOptions}
            employeeOptions={employeeOptions}
            onChange={(key, value) => {
              if (key === "employeeId") {
                onEmployeeChange(value);
                return;
              }
              if (key === "departmentId") {
                onDepartmentChange(value);
                return;
              }
              setLabor((current) => ({ ...current, [key]: value }));
              if (key in laborErrors) {
                setLaborErrors((current) => ({ ...current, [key]: undefined }));
              }
            }}
          />
        )}
      </GlobalAddDrawer>

      <AddSupplierDrawer
        open={addSupplierOpen}
        onOpenChange={setAddSupplierOpen}
        onCreated={(supplier) =>
          setPodcast((current) => ({ ...current, supplierId: supplier.id }))
        }
      />

      {laborDepartment && (
        <AddEmployeeDrawer
          open={addEmployeeOpen}
          onOpenChange={setAddEmployeeOpen}
          department={laborDepartment}
          departments={departments}
          onCreated={(employee) =>
            setLabor((current) => ({ ...current, employeeId: employee.id }))
          }
        />
      )}
    </>
  );
}
