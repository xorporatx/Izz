import { useState, type ReactNode } from "react";
import type { PeriodId } from "../../data/dashboard";
import { DashboardHeader } from "./DashboardHeader";
import { DesktopSidebar } from "./DesktopSidebar";
import { GlobalAdd } from "../global-add/GlobalAdd";
import { MainMenuDrawer } from "./MainMenuDrawer";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="shell">
      <DesktopSidebar
        onOpenMenu={() => setMenuOpen(true)}
        onOpenAdd={() => setAddOpen(true)}
      />

      <div className="shell__main">
        <MobileTopBar
          venue={venue}
          date={date}
          period={period}
          onPeriodChange={onPeriodChange}
          onDateChange={onDateChange}
          onOpenMenu={() => setMenuOpen(true)}
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

      <MobileBottomNav
        active={activeNav}
        onSelect={onNavSelect}
        onOpenAdd={() => setAddOpen(true)}
      />

      <MainMenuDrawer
        open={menuOpen}
        onOpenChange={setMenuOpen}
        venue={venue}
        active={activeNav}
        onSelect={onNavSelect}
      />

      <GlobalAdd open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}
