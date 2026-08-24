import { useSyncExternalStore } from "react";
import {
  seedDepartments,
  seedEmployees,
  type Department,
  type Employee,
} from "../data/departments";

/**
 * The departments store.
 *
 * A department is created on one screen and read on another, and the employee
 * added inside it has to appear in a list the creating form does not own, so
 * the data cannot live in either component. It is a module-level store read
 * through `useSyncExternalStore` — the same shape `router.ts` uses for the
 * URL, so there is one subscription idiom in the app rather than two.
 *
 * Writes replace the arrays instead of mutating them, so `useSyncExternalStore`
 * sees a new reference and every subscriber re-renders.
 */

let departments: Department[] = seedDepartments;
let employees: Employee[] = seedEmployees;

const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

function emit() {
  listeners.forEach((listener) => listener());
}

/** Stands in for network time, matching `useSupplier`'s treatment. */
const LATENCY_MS = 420;

function wait(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

/**
 * A URL-safe id from a Hebrew department name.
 *
 * Hebrew does not transliterate to an ASCII slug, so the name is kept as-is
 * with whitespace collapsed — `encodeURIComponent` in `paths.department`
 * handles the rest. A numeric suffix keeps two departments of the same name
 * apart.
 */
function departmentId(name: string): string {
  const base = name.trim().replace(/\s+/g, "-") || "department";
  if (!departments.some((entry) => entry.id === base)) return base;

  let suffix = 2;
  while (departments.some((entry) => entry.id === `${base}-${suffix}`)) {
    suffix += 1;
  }
  return `${base}-${suffix}`;
}

let employeeSequence = 14579025;

export function useDepartments(): Department[] {
  return useSyncExternalStore(
    subscribe,
    () => departments,
    () => seedDepartments,
  );
}

export function useEmployees(): Employee[] {
  return useSyncExternalStore(
    subscribe,
    () => employees,
    () => seedEmployees,
  );
}

/** One department by id, or `null` when the URL names one that is gone. */
export function useDepartment(id: string): Department | null {
  const all = useDepartments();
  return all.find((entry) => entry.id === id) ?? null;
}

export function useDepartmentEmployees(departmentId: string): Employee[] {
  const all = useEmployees();
  return all.filter((entry) => entry.departmentId === departmentId);
}

export interface NewDepartment {
  name: string;
  managerId: string;
  type: string;
}

/** Resolves with the created department so the caller can navigate to it. */
export async function createDepartment(
  input: NewDepartment,
): Promise<Department> {
  await wait(LATENCY_MS);

  const department: Department = {
    id: departmentId(input.name),
    name: input.name.trim(),
    managerId: input.managerId,
    type: input.type,
    isNew: true,
  };

  departments = [...departments, department];
  emit();
  return department;
}

export interface NewEmployee {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  employmentType: string;
  departmentId: string;
}

export async function createEmployee(input: NewEmployee): Promise<Employee> {
  await wait(LATENCY_MS);

  employeeSequence += 1;

  const employee: Employee = {
    id: `emp-${employeeSequence}`,
    employeeNumber: String(employeeSequence),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    role: input.role,
    employmentType: input.employmentType,
    departmentId: input.departmentId,
    // A new hire has no period behind them yet; the table shows dashes rather
    // than inventing figures.
    hours: 0,
    employeeCost: 0,
    employerCost: 0,
    isNew: true,
  };

  employees = [...employees, employee];
  emit();
  return employee;
}

/** The payroll number the form previews before the employee exists. */
export function nextEmployeeNumber(): string {
  return String(employeeSequence + 1);
}
