# IzzBizz — dashboard

RTL (Hebrew) restaurant-management dashboard, built from the Figma frame
[`648:7862` "Home"](https://www.figma.com/design/XtaqqfAFz5rwsNeD1kzcgz/IzzBizz?node-id=648-7862)
in file `XtaqqfAFz5rwsNeD1kzcgz`.

The mobile design is reproduced from the frame; the tablet and desktop layers
are built on top of the same components and tokens.

React 19 · TypeScript · Vite · plain CSS with custom properties.

Three shadcn/ui components are in use — `Popover` (Radix), `Drawer` (vaul) and
`Calendar` (react-day-picker) — vendored from the registry with their Tailwind
utilities translated to this project's tokens. Everything else is hand-built;
there is no icon package.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

## Breakpoints

| Range          | Shell                                  | Content                                                    |
| -------------- | -------------------------------------- | ---------------------------------------------------------- |
| `< 768px`      | mobile header + floating bottom bar    | single column; insights and tasks are snap-scrolling rails  |
| `768–1199px`   | fixed 84px icon rail on the right      | metrics 2-up, insights/tasks slide full width, goals 2-up   |
| `≥ 1200px`     | rail expands to a 264px labelled sidebar | metrics 3+2, dashboard splits into 2fr / 1fr, goals 3-up   |
| `≥ 1440px`     | as above                               | container 1500px, 48px gutters                              |

Layout is CSS throughout. Two pieces of script touch presentation: the
carousel controls, which reflect real scroll position and step between slides
(`src/components/ui/Carousel.tsx`), and the date picker's choice between a
popover and a bottom sheet (see below).

## Sliders

`Carousel` has two variants:

- **`rail`** — a slider at every size. Used by תובנות and משימות להיום: 342px
  cards with a peek on mobile, one full-width slide per view from 768px.
  Arrow controls appear alongside the page dots on pointer devices; touch just
  swipes. In RTL, "back" is the right-pointing chevron and sits on the right.
- **`responsive`** — a rail on mobile that the consuming section restyles into
  a grid from 768px up.

Because each insight slide fills its column, the card has the width to lay its
three findings side by side rather than stacking them. Both dashboard columns
stay short, which is what keeps the 2fr / 1fr split balanced.

## RTL

`dir="rtl"` is set once on `<html>`. Every rule below it uses logical
properties (`inset-inline-start`, `padding-inline`, `margin-inline-start`,
`text-align: start`), so nothing is mirrored by hand:

- the sidebar is fixed to the right via `inset-inline-start: 0` — in RTL the
  inline **start** edge is the right-hand one, and the main column is inset
  with `margin-inline-start`;
- progress fills grow from the right because `inset-inline-start: 0` resolves
  there;
- the month stepper follows RTL time direction — the **right**-pointing
  chevron steps back, the **left**-pointing one advances;
- the calendar runs `dir="rtl"` with the Hebrew locale, so א׳ is the rightmost
  weekday and its nav chevrons are flipped the same way the registry component
  does it.

## Date picker

The label in the header opens the shadcn Calendar (`single` mode, month and
year dropdowns). The container depends on the pointer surface — shadcn's
responsive picker pattern:

- **≥ 768px** — a Popover anchored under the label, 8px below and centred on
  it, no scrim.
- **< 768px** — a Drawer: bottom sheet, grab handle, `היום` / `סגור` footer.

Picking a day applies it and dismisses; `היום` jumps to today. Crossing the
breakpoint while open dismisses the picker rather than handing the incoming
primitive an anchor that has just been hidden.

`useMediaQuery` (`src/lib/useMediaQuery.ts`) is the **only** JavaScript
viewport check in the project. Layout is CSS everywhere else; a popover and a
bottom sheet are different primitives, not one element restyled, so no media
query can swap them.

`Popover.tsx`, `Drawer.tsx` and `Calendar.tsx` in `src/components/ui` keep the
registry component surface (`PopoverContent`, `DrawerHeader`, the `classNames`
/ `components` overrides…) so they stay recognisable, but their styling comes
from `tokens.css` rather than Tailwind.

## Structure

```
src/
  styles/tokens.css        every colour, radius, space, type and shadow token,
                           each annotated with the Figma variable it maps to
  styles/global.css        reset + shared primitives
  data/dashboard.ts        figures and copy
  data/navigation.ts       nav items shared by the bottom bar and the sidebar
  components/icons/        inlined Lucide geometry (the set Figma references)
  lib/date.ts              Intl he-IL formatting and month arithmetic
  lib/useMediaQuery.ts     the one JS viewport check — popover vs. sheet
  components/ui/           Card · Button · Badge · Progress · ToneDot ·
                           Checkbox · SectionHeader · Carousel ·
                           Popover (shadcn/Radix) · Drawer (shadcn/vaul) ·
                           Calendar (shadcn/react-day-picker) · BarChart
  components/layout/       DashboardShell · DesktopSidebar · DashboardHeader ·
                           MobileTopBar · MobileBottomNav · PeriodSelector ·
                           MonthPicker
  components/dashboard/    MetricSelector · MetricSelectorGroup ·
                           MetricDetailPanel · ActionCard · InsightsSection ·
                           TaskCard · TasksSection · GoalCard · GoalsGrid
  pages/Dashboard.tsx      the dashboard grid
```

Each component has one behaviour and one stylesheet; there are no separate
mobile and desktop variants of anything. From 768px every `ActionCard` lays
its three findings out side by side with the CTAs inline; the `featured` flag
only changes scale — larger padding and a 20px title on the lead insight, from
1200px up.

`MetricSelector` responds to a **container** query rather than the viewport,
so the same card behaves correctly whatever width the selector row gives it.

## Metric selector → detail panel

The metric row is **not** five independent cards. It is a selector driving the
panel beneath it:

```
[ מכירות ] [ פוד קוסט ] [ ליבור ] [ קבועות ] [ משתנות ]
                        ↓
                  selectedMetric
                        ↓
              MetricDetailPanel
```

`Dashboard` owns `selectedMetric` — the single source of truth. There are no
separate `selectedTitle` / `selectedValue` / `selectedChart` states; the panel
resolves `activeMetric` from that one id and renders label, figure,
comparison, progress, chart, recommendation and task from it, so the selector
and the panel cannot drift apart.

Everything belonging to a category lives together in one object in
`src/data/dashboard.ts`, including its **accent**. `tone` is that accent —
`warning` orange, `danger` red, `success` green — the same tokens the goals
and tasks use, so a selected card borders itself in its own colour without any
styling decided at the call site.

Selectors are real `<button>`s with `aria-pressed` and `aria-controls`
pointing at the panel; the panel is `aria-live="polite"`. The row scrolls
horizontally at every size — five cards never fit comfortably across, and
scrolling keeps each wide enough to read at a glance.

Circular arrows overlay the row's edges on pointer devices and step one card
per click, each hiding once the row reaches that end; the track is masked so
cards fade under the arrow rather than being clipped by it. Stepping works off
element geometry rather than the sign of `scrollLeft`, so it does not depend on
the browser's RTL scroll convention. Touch devices get no arrows and just
swipe.

On a change the panel never unmounts: the chart bars animate to their new
heights in place (day keys are stable across categories) while the figure and
the advice block crossfade over 220ms. A `min-block-size` per breakpoint keeps
the panel's height steady — measured at 298 / 298 / 299 / 299 / 298px across
the five categories at 1440px, so the page does not jump as you switch.

## Notes on the source design

- **Repeated placeholder copy.** The frame repeats one insight six times and
  one task eight times. Those are implemented as five distinct insights and
  nine tasks written in the same voice, so the sliders have real content to
  page through.
  The first insight and first task are the ones drawn in Figma, verbatim.
- **`₪134,5229`** in the frame is a typo; rendered as `₪134,522`.
- **`הצג את כל השימות`** in the frame is a typo; rendered as
  `הצג את כל המשימות`.
- **Mobile gutter** is normalised to 20px. Figma uses 20px for the metric
  stack, 24px for section headings and 25px for the goal cards.
- **Goal progress bars** use the labelled percentage (84% / 94% / 22%). The
  drawn bar widths in Figma do not match their own labels.
- **Goal tone** is specified in Figma for the first two cards (amber, emerald);
  the third (`איחור של 2 ימים`) is rendered in the danger tone.
- **iOS status bar.** The frame includes one; it is device chrome, not product
  UI, so it is not reproduced.
- **Icons.** Figma references Lucide and the MCP server returns per-node SVG
  URLs that expire after seven days. The same Lucide geometry is inlined in
  `src/components/icons/index.tsx` — identical artwork, no expiring dependency.
- **Typeface.** The design uses Google Sans, which is not publicly
  distributable. The stack requests it first and falls back to Rubik (loaded
  from Google Fonts), which covers Hebrew.
