# Variable Mapping — IzzBizz Code Tokens → Figma

Source: `src/styles/tokens.css`. The file's own header states these values were "lifted verbatim from the Figma library (file XtaqqfAFz5rwsNeD1kzcgz, frame 648:7862 'Home')" — so the code tokens should already match the IzzBizz Figma file's own values where that frame still exists. The **shadcn/ui עברית (IZZBIZZ)** DS library is a separate, generic component library and does not define IzzBizz-specific brand colors — its variables (if any) were not yet inspected in this pass.

**Status honestly: no Figma Variables (the modern Figma "Variables" feature) have been bound yet.** All Figma work so far uses hardcoded RGB fills sampled from these token values, not `setBoundVariable`. This is the top of the "figure out" list before more screens are built, per the priority order in the brief.

## Color

| Code token | Value | Figma variable | Status |
| --- | --- | --- | --- |
| `--color-background` | `#faf8f2` | *(none bound)* | ⚠️ hardcoded in builds so far |
| `--color-card` | `#ffffff` | *(none bound)* | ⚠️ hardcoded |
| `--color-border` | `#e5e5e5` | *(none bound)* | ⚠️ hardcoded (used `#e6e1d4`-ish approximation, needs correction to exact value) |
| `--color-foreground` | `#262626` | *(none bound)* | ⚠️ hardcoded |
| `--color-muted-foreground` | `#737373` | *(none bound)* | ⚠️ hardcoded |
| `--color-warning` | `#f69700` | *(none bound)* | ⚠️ hardcoded approximation used for chart/text accents |
| `--color-danger` | `#dc2626` | *(none bound)* | ⚠️ hardcoded approximation |
| `--color-success` / `--color-success-strong` | `#059669` / `#064e3b` | *(none bound)* | ⚠️ hardcoded approximation (sidebar mark + primary CTA color) |
| `--color-accent-blue` | `#5b7cf2` | *(none bound)* | Not yet used in any built screen |
| `--color-chart-warning/danger/success` | `#fbb663` / `#ef8f8f` / `#6fc9a0` | *(none bound)* | Not yet used — current bar chart uses `--color-success-strong` for all bars regardless of tone |

## Typography

| Code token | Value | Figma | Status |
| --- | --- | --- | --- |
| `--font-sans` | `"Google Sans", "Google Sans Text", "Rubik", "Heebo", ...` | DS components use Google Sans/Plus Jakarta Sans (unavailable to this session) | Substituted with **Rubik** everywhere — see component-mapping.md §"Known deviations" |
| `--text-xs` / `--leading-xs` | 12px / 16px | Not bound to a text style yet | ⚠️ sizes approximated per-node, not via a shared style |
| `--text-sm` / `--leading-sm` | 14px / 20px | Not bound | ⚠️ |
| `--text-xl` / `--leading-xl` | 20px / 28px | Not bound | ⚠️ |
| `--weight-medium/semibold/bold` | 500/600/700 | Mapped by name to Rubik "Medium"/"SemiBold"/"Bold" | ✅ weight mapping is consistent |

## Spacing

| Code token | Value | Figma | Status |
| --- | --- | --- | --- |
| `--space-2` … `--space-12` | 8px … 48px | Not bound to Figma variables | ⚠️ gaps/padding in built frames use plain numbers matching these values (e.g. 16, 20, 24, 48) but are not variable-bound |

## Radius

| Code token | Value | Figma | Status |
| --- | --- | --- | --- |
| `--radius-md` | 8px | Not bound | ⚠️ |
| `--radius-xl` | 14px | Not bound | ⚠️ |
| `--radius-card` | 26px | Not bound | ⚠️ built cards use 16–20px corner radius, not the exact 26px token — needs correction |
| `--radius-full` | 9999px | Not bound | Used correctly (pill buttons, brand mark) but via plain number, not a variable |

## Elevation / Layout

| Code token | Value | Status |
| --- | --- | --- |
| `--shadow-xs` / `--shadow-sm` / `--shadow-hover` | box-shadow strings | Not represented in any built frame yet (no effect styles applied) |
| `--sidebar-rail-width` | 84px | ✅ used correctly for the sidebar rail width in both built screens |
| `--sidebar-width` | 264px | Not yet used (belongs to the expanded menu drawer, not built yet) |
| `--content-max` / `--content-max-wide` | 1400px / 1500px | Not yet enforced as a max-width constraint in Figma frames (frames are fixed at 1440px content width) |

## Next steps to close variable gaps

1. Search the Design System file for an existing color variable collection (none confirmed yet — `get_variable_defs` has not been run against the DS library's own components).
2. If the DS library exposes bindable color/spacing/radius variables, rebuild the color fills and paddings on already-built screens using `setBoundVariable` instead of hardcoded values.
3. If the DS library does **not** expose the IzzBizz-specific palette (warning/danger/success/accent-blue) as variables — likely, since those are IzzBizz's own brand tokens, not part of a generic shadcn kit — create one new IzzBizz-scoped variable collection in the Figma file itself (not a duplicate of anything already in the DS) sourced 1:1 from `tokens.css`, and bind future work to that.
