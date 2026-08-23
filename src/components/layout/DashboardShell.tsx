import type { ReactNode } from "react";
import type { PeriodId } from "../../data/dashboard";
import { DashboardHeader } from "./DashboardHeader";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { MobileTopBar } from "./MobileTopBar";
import "./DashboardShell.css";

export interface DashboardShellProps {
  venue: string;
  greeting: string;
  date: Date;
  period: PeriodId;
  onPeriodChange: (period: PeriodId) => void;
  onDateChange: (date: Date) => void;
  activeNav: string;
  onNavSelect: (id: string) => void;
  children: ReactNode;
}

/**
 * App frame.
 *
 *   < 768px  mobile header + floating bottom bar, single column.
 *   ≥ 768px  fixed right sidebar (icon rail) + desktop header.
 *   ≥ 1200px sidebar expands to labels; content grid opens up.
 */
export function DashboardShell({
  venue,
  greeting,
  date,
  period,
  onPeriodChange,
  onDateChange,
  activeNav,
  onNavSelect,
  children,
}: DashboardShellProps) {
  return (
    <div className="shell">
      <DesktopSidebar venue={venue} active={activeNav} onSelect={onNavSelect} />

      <div className="shell__main">
        <MobileTopBar
          venue={venue}
          date={date}
          period={period}
          onPeriodChange={onPeriodChange}
          onDateChange={onDateChange}
        />

        <DashboardHeader
          venue={venue}
          greeting={greeting}
          date={date}
          period={period}
          onPeriodChange={onPeriodChange}
          onDateChange={onDateChange}
        />

        <main className="shell__content">{children}</main>
      </div>

      <MobileBottomNav active={activeNav} onSelect={onNavSelect} />
    </div>
  );
}
