import {
  departmentTypeLabel,
  managerName,
  type Department,
} from "../data/departments";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { SectionHeader } from "../components/ui/SectionHeader";
import { ArrowLeft, Plus, UserCheck } from "../components/icons";
import { useDepartments, useEmployees } from "../lib/useDepartments";
import "./LaborCostPage.css";

export interface LaborCostPageProps {
  onOpenDepartment: (departmentId: string) => void;
  onAddDepartment: () => void;
}

const DEPARTMENTS_ID = "labor-cost-departments";

/**
 * לייבור קוסט: the departments in the venue, and the way into a new one.
 *
 * Structured like the פודקוסט screen it sits beside — summary, then a list of
 * cards that each open their own page — so the two cost screens behave the
 * same way.
 */
export function LaborCostPage({
  onOpenDepartment,
  onAddDepartment,
}: LaborCostPageProps) {
  const departments = useDepartments();
  const employees = useEmployees();

  const headcount = (department: Department) =>
    employees.filter((employee) => employee.departmentId === department.id).length;

  return (
    <div className="labor-cost">
      <section className="labor-cost__summary" aria-label="לייבור קוסט">
        <div className="labor-cost__intro">
          <h2 className="labor-cost__title">מחלקות</h2>
          <p className="labor-cost__caption">
            {`${departments.length} מחלקות · ${employees.length} עובדים`}
          </p>
        </div>

        <Button
          variant="primary"
          icon={<Plus size={16} />}
          onClick={onAddDepartment}
          className="labor-cost__add"
        >
          הוסף מחלקה
        </Button>
      </section>

      <SectionHeader title="פירוט מחלקות" id={DEPARTMENTS_ID} />

      <ul className="labor-cost__departments" aria-labelledby={DEPARTMENTS_ID}>
        {departments.map((department) => (
          <li key={department.id}>
            <Card
              as="button"
              type="button"
              interactive
              className="department-card"
              onClick={() => onOpenDepartment(department.id)}
            >
              <span className="department-card__main">
                <span className="department-card__heading">
                  <UserCheck size={18} className="department-card__icon" />
                  <span className="department-card__name">{department.name}</span>
                  {department.isNew && <Badge tone="success">חדש</Badge>}
                </span>

                <span className="department-card__meta">
                  {`${departmentTypeLabel(department.type)} · ${managerName(
                    department.managerId,
                  )}`}
                </span>
              </span>

              <span className="department-card__side">
                <span className="department-card__count numeric">
                  {headcount(department)}
                </span>
                <span className="department-card__count-label">עובדים</span>
                <ArrowLeft size={18} className="department-card__chevron" />
              </span>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
