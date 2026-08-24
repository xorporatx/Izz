import { useCallback, useMemo, useState } from "react";
import { DashboardShell } from "./components/layout/DashboardShell";
import {
  PageTransition,
  type TransitionDirection,
} from "./components/layout/PageTransition";
import { AddDepartmentDrawer } from "./components/departments/AddDepartmentDrawer";
import { Dashboard } from "./pages/Dashboard";
import { DepartmentPage } from "./pages/DepartmentPage";
import { FoodCostPage } from "./pages/FoodCostPage";
import { LaborCostPage } from "./pages/LaborCostPage";
import { SupplierOrdersPage } from "./pages/SupplierOrdersPage";
import { SupplierShortPage } from "./pages/SupplierShortPage";
import {
  back,
  navigate,
  parseRoute,
  paths,
  routeDepth,
  usePathname,
  type Route,
} from "./lib/router";
import { venue, type PeriodId } from "./data/dashboard";

/** The date shown in the Figma frame: July 2026. */
const INITIAL_DATE = new Date(2026, 6, 15);

function greetingForHour(hour: number) {
  if (hour < 12) return "בוקר טוב";
  if (hour < 18) return "צהריים טובים";
  return "ערב טוב";
}

/** Identifies the page on the stack, or `null` when the shell is on top. */
function stackKey(route: Route): string | null {
  switch (route.kind) {
    case "supplier":
      return `supplier:${route.supplierId}`;
    case "supplier-orders":
      return `supplier-orders:${route.supplierId}`;
    case "department":
      return `department:${route.departmentId}`;
    default:
      return null;
  }
}

export default function App() {
  const [period, setPeriod] = useState<PeriodId>("today");
  const [date, setDate] = useState(INITIAL_DATE);
  const [completedTasks, setCompletedTasks] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  /** Highlight for the nav entries that have no page of their own yet. */
  const [selectedNav, setSelectedNav] = useState("control");
  const [addDepartmentOpen, setAddDepartmentOpen] = useState(false);

  const route = parseRoute(usePathname());
  const depth = routeDepth(route);

  // Which way the stack last moved. Recorded alongside the depth it was
  // derived from so it only changes when the depth does — an unrelated
  // re-render must not restart a page's animation.
  const [motion, setMotion] = useState<{
    depth: number;
    direction: TransitionDirection;
  }>({ depth, direction: "forward" });
  if (motion.depth !== depth) {
    setMotion({ depth, direction: depth > motion.depth ? "forward" : "back" });
  }

  const greeting = useMemo(() => greetingForHour(new Date().getHours()), []);

  const toggleTask = useCallback((id: string, done: boolean) => {
    setCompletedTasks((current) => {
      const next = new Set(current);
      if (done) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const handleNavSelect = useCallback((id: string) => {
    setSelectedNav(id);
    if (id === "food-cost") navigate(paths.foodCost);
    else if (id === "labor-cost") navigate(paths.laborCost);
    else navigate(paths.dashboard);
  }, []);

  const openSupplier = useCallback((supplierId: string) => {
    navigate(paths.supplier(supplierId));
  }, []);

  const openSupplierOrders = useCallback((supplierId: string) => {
    navigate(paths.supplierOrders(supplierId));
  }, []);

  const openDepartment = useCallback((departmentId: string) => {
    navigate(paths.department(departmentId));
  }, []);

  // A stacked page keeps its own section mounted underneath it — supplier
  // pages hang off פודקוסט, a department off לייבור קוסט — so the shell behind
  // the stack is right even on a cold open from a shared link.
  const section =
    route.kind === "food-cost" ||
    route.kind === "supplier" ||
    route.kind === "supplier-orders"
      ? "food-cost"
      : route.kind === "labor-cost" || route.kind === "department"
        ? "labor-cost"
        : "dashboard";

  const activeNav = section === "dashboard" ? selectedNav : section;

  return (
    <>
      <DashboardShell
        venue={venue}
        greeting={greeting}
        date={date}
        period={period}
        onPeriodChange={setPeriod}
        onDateChange={setDate}
        activeNav={activeNav}
        onNavSelect={handleNavSelect}
      >
        {section === "food-cost" && (
          <FoodCostPage onOpenSupplier={openSupplier} />
        )}

        {section === "labor-cost" && (
          <LaborCostPage
            onOpenDepartment={openDepartment}
            onAddDepartment={() => setAddDepartmentOpen(true)}
          />
        )}

        {section === "dashboard" && (
          <Dashboard completedTasks={completedTasks} onToggleTask={toggleTask} />
        )}
      </DashboardShell>

      <PageTransition pageKey={stackKey(route)} direction={motion.direction}>
        {route.kind === "supplier" && (
          <SupplierShortPage
            supplierId={route.supplierId}
            onBack={() => back(paths.foodCost)}
            onOpenAllOrders={openSupplierOrders}
          />
        )}

        {route.kind === "supplier-orders" && (
          <SupplierOrdersPage
            supplierId={route.supplierId}
            onBack={() => back(paths.supplier(route.supplierId))}
          />
        )}

        {route.kind === "department" && (
          <DepartmentPage
            departmentId={route.departmentId}
            onBack={() => back(paths.laborCost)}
          />
        )}
      </PageTransition>

      {/* Owned here rather than by the list, because creating a department
          ends in a navigation. */}
      <AddDepartmentDrawer
        open={addDepartmentOpen}
        onOpenChange={setAddDepartmentOpen}
        onCreated={(department) => openDepartment(department.id)}
      />
    </>
  );
}
