# Component Mapping — IzzBizz Code → Figma Design System

Design System source: **shadcn/ui עברית (IZZBIZZ)** library (published from the "Design System Colllab" file, already linked to the IzzBizz Figma file). Figma component keys noted where confirmed by direct inspection this session; "not yet confirmed" means the code component exists but its DS equivalent hasn't been located/verified yet — treat as a gap, not an assumption.

| Code component (`src/components/ui`) | Code variants/props | Figma DS component | Figma variant(s) used | Status |
| --- | --- | --- | --- | --- |
| `Button.tsx` | `variant: primary \| secondary \| ghost`, `block`, `icon` | `Button` (component set) | `Variant=Default/Secondary/Ghost, State=Default/Hover/Focus/Pressed/Disabled/Loading, Size=default/sm/lg/icon` | ✅ Confirmed & used |
| `Input.tsx` | `invalid` (HTML input passthrough) | `Input` (component set) | `Horizontal Layout=No/Yes, Variant=Default/File, State=Default/Focus/Filled/Disabled/Error/Error (Focus)` | ✅ Confirmed & used |
| `Select.tsx` | options list, `invalid`, `disabled` | `Select` (component set) | `State=Default/Filled/Filled (Focus)/Focus/Disabled` | ✅ Confirmed & used |
| `Textarea.tsx` | `invalid` | `Textarea` (component set) | `State=Default/Filled/Focus/Disabled/Error/Error (Focus)` | ✅ Confirmed & used |
| `Badge.tsx` | `tone: warning \| danger \| success` | `Badge` (component set) | `Variant=Default/Secondary/Outline/Destructive/Verified` — mapped `danger→Destructive`, `success→Verified`, `warning→Secondary` (DS has no dedicated warning/amber variant) | ✅ Confirmed & used; tone mapping is an approximation, flagged below |
| `Checkbox.tsx` | `checked`, `label` (no visual variants) | `Checkbox` (component set) | `Status=Active/Inactive, State=Default/Focus/Disabled/Pressed` | ✅ Confirmed & used |
| `Drawer.tsx` | right-anchored panel, header/body/footer | `Drawer` (component set) | `Breakpoint=md/sm` (internal: Header, DrawerHeader, `_DrawerContent`→Slot, DrawerFooter with 2 Buttons) | ✅ Confirmed & used |
| `Card.tsx` | polymorphic `as`, `interactive`, no variant prop | *Not found as a standalone component.* Closest DS asset is `Card / Example Content` (a full example block, not a bare primitive). | — | ⚠️ Gap — using plain auto-layout frames styled with the same white/border/radius values instead of a component instance |
| `Progress.tsx` | `value`, `tone`, `label` — a linear progress bar | *No "Progress" page/component found in the DS's top-level list* (Avatar, Badge, Button, Calendar, Chart, Checkbox, Data Table, Drawer, Dropdown Menu, Input, Radio Group, Select, Separator, Switch, Table, Textarea, Utility Components) | — | ⚠️ Gap — built as a plain track+fill frame pair, not a component instance |
| `BarChart.tsx` | `data`, `tone`, `label` — small bar chart | DS has a `Chart` page (not yet inspected in depth) | — | ⚠️ Not yet mapped — current Figma build uses plain colored rectangles, not the DS Chart component |
| `Calendar.tsx` | day-picker grid | `Calendar / Basic`, `Calendar / Day Button`, `Calendar / Custom Day Button` (component sets) | Not yet used in any built screen | ⏳ Not yet needed (no screen built uses it yet) |
| `Carousel.tsx` | `variant: responsive \| rail` | No direct DS equivalent found yet | — | ⏳ Not yet needed |
| `Popover.tsx` | anchored overlay (used by period selector) | DS has `Select / Menu`, `Dropdown Menu` component sets that use the same overlay pattern | Not yet used in any built screen | ⏳ Not yet needed |
| `SectionHeader.tsx`, `BackButton.tsx`, `Logo.tsx`, `ToneDot.tsx`, `Field.tsx` | layout/utility, not visual primitives | No 1:1 DS component (these are composition helpers, not design-system atoms) | — | N/A — recreated as plain text/frame compositions, consistent with their role in code |

## Page-level components already mapped in a built screen

| Code | Figma equivalent built | Notes |
| --- | --- | --- |
| `DesktopSidebar.tsx` (icon rail: brand mark, hamburger, spacer, "+" action) | Custom auto-layout frame + `Button` instances (`Ghost/icon` for hamburger, `Default/icon` for "+") | No dedicated "Sidebar" component confirmed yet in this DS (there is a `Sidebar / SidebarMenuButton` component set — not yet evaluated for the rail itself) |
| `DashboardHeader.tsx` (greeting + venue text) | Plain text nodes (Rubik) | Text-only, no component needed |
| `MetricSelectorGroup` / `MetricDetailPanel` (Dashboard) | `Button` instances (pills) + custom card frame + colored-rectangle bar chart | Bar chart is a placeholder for the DS `Chart` component (not yet mapped) |
| `TasksSection` (Dashboard) | `Checkbox` instances | ✅ |
| `InsightsSection` (Dashboard) | `Badge` instances + custom card frame | ✅ for badge; card is the Card gap noted above |
| `GoalsGrid` (Dashboard) | Custom card frame + plain progress track/fill | Progress gap noted above |
| Global Add flow tabs (`GlobalAdd*.tsx`) | `Drawer`, `Input`, `Select`, `Textarea`, `Button` instances | ✅ built for the פודקוסט tab |
| `LaborCostPage.tsx` (department list) | Custom row frames (no Card component available) + text | Card gap noted above |

## Known deviations from strict DS fidelity (disclosed, not hidden)

1. **Typeface substitution**: every DS component's text is authored in "Google Sans" (and some in "Plus Jakarta Sans"), neither of which this Figma API session can load (confirmed: the font family does not exist for this session even after the user supplied the `.ttf` files — the Plugin API has no mechanism to register a font from an uploaded file). All text overrides use **Rubik** instead — the real app's own typeface — at the same sizes/weights. Component structure, variants and properties are untouched.
2. **Badge tone mapping** (`warning → Secondary`) is an approximation — the DS has no amber/warning-colored badge variant.
3. **Card and Progress** have no confirmed DS component — plain frames styled with the same visual tokens are used instead, pending a deeper DS search (a "Card" primitive may exist under a name not yet found, e.g. inside "Blocks (Official)" or "Utility Components", which have not been fully inspected).
