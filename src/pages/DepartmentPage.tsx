import { useEffect, useRef, useState } from "react";
import {
  departmentTypeLabel,
  formatCurrency,
  managerName,
} from "../data/departments";
import { AddEmployeeDrawer } from "../components/departments/AddEmployeeDrawer";
import { DepartmentEmployeesTable } from "../components/departments/DepartmentEmployeesTable";
import { SupplierPageHeader } from "../components/suppliers/SupplierPageHeader";
import { Plus } from "../components/icons";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import {
  useDepartment,
  useDepartmentEmployees,
  useDepartments,
} from "../lib/useDepartments";
import "./DepartmentPage.css";

export interface DepartmentPageProps {
  /** From the URL — `/departments/:departmentId`. */
  departmentId: string;
  onBack: () => void;
}

const TITLE_ID = "department-page-title";
const EMPLOYEES_ID = "department-page-employees";

/**
 * A department: who manages it, what it costs, and everyone in it.
 *
 * Reuses `SupplierPageHeader` — the stacked title/subtitle with the back
 * control opposite is the product's page header, and a department needs
 * exactly that plus a primary action.
 *
 * The store is read live, so an employee added from the form here appears in
 * the table without this page refetching or being remounted.
 */
export function DepartmentPage({ departmentId, onBack }: DepartmentPageProps) {
  const department = useDepartment(departmentId);
  const departments = useDepartments();
  const employees = useDepartmentEmployees(departmentId);
  const [addOpen, setAddOpen] = useState(false);
  const [added, setAdded] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    root.current?.focus({ preventScroll: true });
  }, [departmentId]);

  if (!department) {
    return (
      <div className="department-page" tabIndex={-1} ref={root}>
        <SupplierPageHeader
          title="מחלקה לא נמצאה"
          subtitle="מחלקה"
          onBack={onBack}
          titleId={TITLE_ID}
        />
        <div className="department-page__body">
          <p className="department-page__missing">
            המחלקה המבוקשת אינה קיימת או הוסרה.
          </p>
        </div>
      </div>
    );
  }

  const totals = employees.reduce(
    (sum, employee) => ({
      hours: sum.hours + employee.hours,
      cost: sum.cost + employee.employerCost,
    }),
    { hours: 0, cost: 0 },
  );

  const stats = [
    { label: "עובדים", value: String(employees.length) },
    { label: "שעות עבודה", value: String(totals.hours) },
    { label: "עלות מעביד", value: formatCurrency(totals.cost) },
  ];

  return (
    <div className="department-page" tabIndex={-1} ref={root}>
      <SupplierPageHeader
        title={department.name}
        subtitle={`מחלקה · ${departmentTypeLabel(department.type)}`}
        onBack={onBack}
        titleId={TITLE_ID}
      />

      <div className="department-page__body">
        <Card as="section" className="department-summary" aria-labelledby={TITLE_ID}>
          <p className="department-summary__manager">
            {`מנהל המחלקה: ${managerName(department.managerId)}`}
          </p>

          <dl className="department-summary__stats">
            {stats.map((stat) => (
              <div className="department-summary__stat" key={stat.label}>
                <dt className="department-summary__stat-label">{stat.label}</dt>
                <dd className="department-summary__stat-value numeric">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <Button
            variant="primary"
            icon={<Plus size={16} />}
            onClick={() => setAddOpen(true)}
            className="department-summary__add"
          >
            הוסף עובד
          </Button>
        </Card>

        <SectionHeader title="פירוט עובדים" id={EMPLOYEES_ID} />

        {/* Announced rather than drawn as a toast — the product has no toast
            pattern, and the new row is already visible in the table below. */}
        <p className="sr-only" role="status">
          {added ? `${added} נוסף למחלקת ${department.name}` : ""}
        </p>

        <DepartmentEmployeesTable
          employees={employees}
          departmentName={department.name}
          labelledBy={EMPLOYEES_ID}
        />
      </div>

      <AddEmployeeDrawer
        open={addOpen}
        onOpenChange={setAddOpen}
        department={department}
        departments={departments}
        onCreated={(employee) =>
          setAdded(`${employee.firstName} ${employee.lastName}`)
        }
      />
    </div>
  );
}
