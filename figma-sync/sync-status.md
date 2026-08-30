# Figma Sync Status — IzzBizz

Target file: `XtaqqfAFz5rwsNeD1kzcgz` ("IzzBizz"), pages `לוח בקרה` / `פודקוסט` / `לייבור קוסט` (created this session, siblings of the file's existing `Desktop`/`Presentation`/`Playground`/`Archive`/`Design` pages).

## Screen inventory (from `App.tsx` routing + `DashboardShell`)

| # | Screen | Route | States that exist in code | Figma status |
| - | --- | --- | --- | --- |
| 01 | Dashboard (`Dashboard.tsx`) | `/` | Only one state — no loading/empty/error variant exists in the code (static seeded data) | 🟡 Built, not yet variable-bound (see variable-mapping.md) |
| 02 | Food Cost / Suppliers list (`FoodCostPage.tsx`) | `/food-cost` | One state only | ⬜ Not started |
| 03 | Supplier detail (`SupplierShortPage.tsx`) | `/food-cost/suppliers/:id` | One state only | ⬜ Not started |
| 04 | Supplier all orders (`SupplierOrdersPage.tsx`) | `/food-cost/suppliers/:id/orders` | One state only | ⬜ Not started |
| 05 | Labor Cost / Departments list (`LaborCostPage.tsx`) | `/labor-cost` | One state only | 🟡 Built as a simplified 3-card version before this audit; needs a revisit pass against this mapping (Card gap, Badge "חדש" tag not yet used) |
| 06 | Department detail (`DepartmentPage.tsx`) | `/labor-cost/departments/:id` | **Two real states in code**: default, and "not found" (מחלקה לא נמצאה) when the id doesn't resolve | ⬜ Not started |
| 07 | Global Add flow — drawer overlay (`GlobalAdd.tsx` + 4 tabs) | Not a route; opened from the "+" action on any screen | **Real states in code**: idle, per-field validation error, `submitting` ("שומר…"), success (sr-only announcement), and a disabled "not available yet" sub-state for the לייבור tab's "מספר עובדים" toggle | 🟡 Only the פודקוסט tab's idle/default state built (as a stand-in — this flow has no dedicated app page, only a drawer tab); other 3 tabs and the non-default states not built |
| 08 | Add Supplier (nested drawer) | Opened from the פודקוסט tab's supplier select | idle, validation error, submitting, success | ⬜ Not started |
| 09 | Add Employee (nested drawer) | Opened from the לייבור tab's employee select | idle, validation error, submitting, success | ⬜ Not started |
| 10 | Add Department (drawer, top-level in `App.tsx`) | Opened from `LaborCostPage`'s "הוסף מחלקה" | idle, validation error, submitting, success | ⬜ Not started |
| 11 | Main menu drawer (`MainMenuDrawer.tsx`) | Hamburger, any screen | One state | ⬜ Not started |
| 12 | Mobile bottom nav / mobile top bar | <768px only | One state | ⬜ Not started (desktop-only sync so far, per every "Desktop" frame built) |

## Components

- [x] Button (all variants inspected: Default/Secondary/Ghost/Outline/Destructive/Link × State × Size)
- [x] Input
- [x] Select
- [x] Textarea
- [x] Drawer
- [x] Badge
- [x] Checkbox
- [ ] Card — **gap, no DS equivalent confirmed yet** (see component-mapping.md)
- [ ] Progress bar — **gap, no DS equivalent confirmed yet**
- [ ] Chart / BarChart — DS `Chart` page exists but not yet inspected or used (plain rectangles used as a placeholder)
- [ ] Calendar — not yet needed by a built screen
- [ ] Popover / Dropdown Menu — not yet needed by a built screen
- [ ] Sidebar (dedicated component, if one exists) — rail was rebuilt from Button instances + plain frames; `Sidebar / SidebarMenuButton` component set exists in the DS but has not been evaluated as a replacement

## Variables

- [ ] Colors — not bound to Figma Variables yet (hardcoded RGB approximations of `tokens.css` values)
- [ ] Typography — sizes/weights approximated per text node, not via shared text styles or variables; font family substituted (Rubik, see component-mapping.md)
- [ ] Spacing — plain numbers matching token values, not bound
- [ ] Radius — plain numbers, and `--radius-card` (26px) not yet matched exactly (16–20px used instead)
- [ ] Shadows — no effect styles applied to any built frame yet

## Outstanding before continuing screen-by-screen (per the priority order in the brief)

1. Inspect the DS library (and the IzzBizz file itself) for existing Figma Variable collections — none confirmed yet, so no binding has happened. This is the single biggest gap against "use the existing Design System" as the strict source of truth.
2. Resolve the Card and Progress component gaps — either find them under an unexplored DS page ("Blocks (Official)", "Utility Components" have not been fully inspected) or confirm they genuinely don't exist and document that as a permanent, disclosed gap.
3. Revisit the לייבור קוסט screen already built (before this audit) to bring it up to the same standard as לוח בקרה (badges for "חדש", correct radius token, etc.).
