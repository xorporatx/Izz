/**
 * לייבור קוסט — departments and the employees inside them.
 *
 * Seed content follows the Figma frames 648:5880 ("הוסף מחלקה"),
 * 648:5917 ("הוסף עובד") and 648:6163 ("מחלקה - משלוחים"): the department
 * page's table lists each employee with their share, employee cost and
 * employer cost, and the frame's own totals row closes it.
 *
 * Costs are stored as numbers rather than pre-formatted strings — unlike
 * `suppliers.ts`, this list grows at runtime, so a new employee has to be
 * able to produce the same output as a seeded one. `formatCurrency` is the
 * single place that decides how a figure reads.
 */

/** A department's field of work — the third field on the create form. */
export interface DepartmentType {
  id: string;
  label: string;
}

export const departmentTypes: DepartmentType[] = [
  { id: "operations", label: "תפעול" },
  { id: "kitchen", label: "מטבח" },
  { id: "service", label: "שירות" },
  { id: "logistics", label: "לוגיסטיקה" },
  { id: "admin", label: "הנהלה" },
];

/** Candidates for מנהל המחלקה, and the role list on the employee form. */
export interface Manager {
  id: string;
  name: string;
}

export const managers: Manager[] = [
  { id: "avi-cohen", name: "אבי כהן" },
  { id: "maya-levi", name: "מאיה לוי" },
  { id: "zaid-goad", name: "זאיד גואד" },
  { id: "noa-ariel", name: "נועה אריאל" },
  { id: "itay-shemesh", name: "איתי שמש" },
];

export interface Role {
  id: string;
  label: string;
}

export const roles: Role[] = [
  { id: "shift-manager", label: "אחראי משמרת" },
  { id: "courier", label: "שליח" },
  { id: "cook", label: "טבח" },
  { id: "packer", label: "אורז" },
  { id: "waiter", label: "מלצר" },
  { id: "dishwasher", label: "שוטף כלים" },
];

/** היקף משרה — the employment type from the frame's last row. */
export interface EmploymentType {
  id: string;
  label: string;
}

export const employmentTypes: EmploymentType[] = [
  { id: "full", label: "מלאה" },
  { id: "part", label: "חלקית" },
  { id: "hourly", label: "שעתי" },
  { id: "temp", label: "זמני" },
];

export interface Employee {
  /** Stable key. Generated for employees added at runtime. */
  id: string;
  /** Payroll number shown read-only on the form. */
  employeeNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  /** Id from `roles`. */
  role: string;
  /** Id from `employmentTypes`. */
  employmentType: string;
  /** Owning department id — the link the flow is built around. */
  departmentId: string;
  /** Hours worked in the period. A new employee starts at none. */
  hours: number;
  /** What the employee is paid, in shekels. */
  employeeCost: number;
  /** Total cost to the business, in shekels. */
  employerCost: number;
  /** Marks a row added in this session, so it reads as new in the table. */
  isNew?: boolean;
}

export interface Department {
  /** URL segment — `/departments/:id`. */
  id: string;
  name: string;
  /** Id from `managers`. */
  managerId: string;
  /** Id from `departmentTypes`. */
  type: string;
  /** True for a department created in this session. */
  isNew?: boolean;
}

export const seedDepartments: Department[] = [
  { id: "deliveries", name: "משלוחים", managerId: "zaid-goad", type: "logistics" },
  { id: "packaging", name: "אריזות", managerId: "maya-levi", type: "operations" },
  { id: "kitchen", name: "מטבח", managerId: "avi-cohen", type: "kitchen" },
];

/** The five rows the "מחלקה - משלוחים" frame draws, plus two for the others. */
export const seedEmployees: Employee[] = [
  {
    id: "emp-1",
    employeeNumber: "14579020",
    firstName: "זאיד",
    lastName: "גואד",
    email: "zaid@japanika.co.il",
    phone: "050-1234567",
    role: "shift-manager",
    employmentType: "full",
    departmentId: "deliveries",
    hours: 42,
    employeeCost: 3820,
    employerCost: 4775,
  },
  {
    id: "emp-2",
    employeeNumber: "14579021",
    firstName: "חאנוס",
    lastName: "אי",
    email: "hanos@japanika.co.il",
    phone: "050-1234568",
    role: "courier",
    employmentType: "part",
    departmentId: "deliveries",
    hours: 38,
    employeeCost: 4100,
    employerCost: 5125,
  },
  {
    id: "emp-3",
    employeeNumber: "14579022",
    firstName: "מואיז",
    lastName: "אי",
    email: "moiz@japanika.co.il",
    phone: "050-1234569",
    role: "courier",
    employmentType: "hourly",
    departmentId: "deliveries",
    hours: 31,
    employeeCost: 2840,
    employerCost: 4450,
  },
  {
    id: "emp-4",
    employeeNumber: "14579023",
    firstName: "מוחמד",
    lastName: "ג׳מאל",
    email: "mohamad@japanika.co.il",
    phone: "050-1234570",
    role: "packer",
    employmentType: "full",
    departmentId: "packaging",
    hours: 44,
    employeeCost: 2840,
    employerCost: 5590,
  },
  {
    id: "emp-5",
    employeeNumber: "14579024",
    firstName: "נועם",
    lastName: "ברק",
    email: "noam@japanika.co.il",
    phone: "050-1234571",
    role: "cook",
    employmentType: "full",
    departmentId: "kitchen",
    hours: 40,
    employeeCost: 3910,
    employerCost: 6288,
  },
];

/** "₪3,820" — the grouping and leading sign the dashboard already uses. */
export function formatCurrency(value: number): string {
  return `₪${value.toLocaleString("en-US")}`;
}

export function employeeName(employee: Employee): string {
  return `${employee.firstName} ${employee.lastName}`.trim();
}

export function roleLabel(id: string): string {
  return roles.find((role) => role.id === id)?.label ?? "—";
}

export function managerName(id: string): string {
  return managers.find((manager) => manager.id === id)?.name ?? "—";
}

export function departmentTypeLabel(id: string): string {
  return departmentTypes.find((type) => type.id === id)?.label ?? "—";
}
