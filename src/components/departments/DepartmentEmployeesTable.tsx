import {
  employeeName,
  formatCurrency,
  roleLabel,
  type Employee,
} from "../../data/departments";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import "./DepartmentEmployeesTable.css";

export interface DepartmentEmployeesTableProps {
  employees: Employee[];
  departmentName: string;
  labelledBy?: string;
}

/** A row with no period behind it shows a dash rather than a fabricated 0. */
function figure(value: number, format: (value: number) => string) {
  return value > 0 ? format(value) : "—";
}

/**
 * The department's employees, laid out like the supplier orders table the
 * product already uses: quiet header row, one line per record, totals last.
 *
 * The totals row sums the rows on screen, so it stays true as employees are
 * added during the session.
 */
export function DepartmentEmployeesTable({
  employees,
  departmentName,
  labelledBy,
}: DepartmentEmployeesTableProps) {
  if (employees.length === 0) {
    return (
      <Card as="section" className="employees-table-card" aria-labelledby={labelledBy}>
        <p className="employees-table-card__empty">
          אין עדיין עובדים במחלקה. הוסיפו את העובד הראשון.
        </p>
      </Card>
    );
  }

  const totals = employees.reduce(
    (sum, employee) => ({
      hours: sum.hours + employee.hours,
      employeeCost: sum.employeeCost + employee.employeeCost,
      employerCost: sum.employerCost + employee.employerCost,
    }),
    { hours: 0, employeeCost: 0, employerCost: 0 },
  );

  return (
    <Card as="section" className="employees-table-card" aria-labelledby={labelledBy}>
      <div className="employees-table-card__scroll">
        <table className="data-table">
          <caption className="sr-only">{`עובדי מחלקת ${departmentName}`}</caption>
          <thead>
            <tr>
              <th scope="col" className="data-table__head">שם עובד</th>
              <th scope="col" className="data-table__head">תפקיד</th>
              <th scope="col" className="data-table__head">שעות</th>
              <th scope="col" className="data-table__head">עלות עובד</th>
              <th scope="col" className="data-table__head">עלות מעביד</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr className="data-table__row" key={employee.id}>
                <th scope="row" className="data-table__cell data-table__cell--name">
                  <span className="employees-table__name">
                    {employeeName(employee)}
                    {employee.isNew && <Badge tone="success">חדש</Badge>}
                  </span>
                </th>
                <td className="data-table__cell data-table__cell--muted">
                  {roleLabel(employee.role)}
                </td>
                <td className="data-table__cell numeric">
                  {figure(employee.hours, String)}
                </td>
                <td className="data-table__cell numeric">
                  {figure(employee.employeeCost, formatCurrency)}
                </td>
                <td className="data-table__cell numeric">
                  {figure(employee.employerCost, formatCurrency)}
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="data-table__row data-table__row--total">
              <th scope="row" className="data-table__cell">
                {`${employees.length} עובדים`}
              </th>
              <td className="data-table__cell">—</td>
              <td className="data-table__cell numeric">{totals.hours}</td>
              <td className="data-table__cell numeric">
                {formatCurrency(totals.employeeCost)}
              </td>
              <td className="data-table__cell numeric">
                {formatCurrency(totals.employerCost)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
}
