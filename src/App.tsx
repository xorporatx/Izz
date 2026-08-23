import { useCallback, useMemo, useState } from "react";
import { DashboardShell } from "./components/layout/DashboardShell";
import { Dashboard } from "./pages/Dashboard";
import { venue, type PeriodId } from "./data/dashboard";

/** The date shown in the Figma frame: July 2026. */
const INITIAL_DATE = new Date(2026, 6, 15);

function greetingForHour(hour: number) {
  if (hour < 12) return "בוקר טוב";
  if (hour < 18) return "צהריים טובים";
  return "ערב טוב";
}

export default function App() {
  const [period, setPeriod] = useState<PeriodId>("today");
  const [activeNav, setActiveNav] = useState("control");
  const [date, setDate] = useState(INITIAL_DATE);
  const [completedTasks, setCompletedTasks] = useState<ReadonlySet<string>>(
    () => new Set(),
  );

  const greeting = useMemo(() => greetingForHour(new Date().getHours()), []);

  const toggleTask = useCallback((id: string, done: boolean) => {
    setCompletedTasks((current) => {
      const next = new Set(current);
      if (done) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  return (
    <DashboardShell
      venue={venue}
      greeting={greeting}
      date={date}
      period={period}
      onPeriodChange={setPeriod}
      onDateChange={setDate}
      activeNav={activeNav}
      onNavSelect={setActiveNav}
    >
      <Dashboard completedTasks={completedTasks} onToggleTask={toggleTask} />
    </DashboardShell>
  );
}
