import { useCallback, useMemo, useState } from "react";
import { DashboardShell } from "./components/layout/DashboardShell";
import {
  PageTransition,
  type TransitionDirection,
} from "./components/layout/PageTransition";
import { Dashboard } from "./pages/Dashboard";
import { FoodCostPage } from "./pages/FoodCostPage";
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
    navigate(id === "food-cost" ? paths.foodCost : paths.dashboard);
  }, []);

  const openSupplier = useCallback((supplierId: string) => {
    navigate(paths.supplier(supplierId));
  }, []);

  const openSupplierOrders = useCallback((supplierId: string) => {
    navigate(paths.supplierOrders(supplierId));
  }, []);

  // Supplier pages hang off the פודקוסט screen, so that is what stays mounted
  // underneath them — including on a cold open from a shared link.
  const onFoodCost = route.kind !== "dashboard";
  const activeNav = onFoodCost ? "food-cost" : selectedNav;

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
        {onFoodCost ? (
          <FoodCostPage onOpenSupplier={openSupplier} />
        ) : (
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
      </PageTransition>
    </>
  );
}
