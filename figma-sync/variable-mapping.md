# Variable Mapping — IzzBizz Code Tokens → Figma

Source: `src/styles/tokens.css`. The file's own header states these values were "lifted verbatim from the Figma library (file XtaqqfAFz5rwsNeD1kzcgz, frame 648:7862 'Home')" — so the code tokens should already match the IzzBizz Figma file's own values where that frame still exists. The **shadcn/ui עברית (IZZBIZZ)** DS library is a separate, generic component library and does not define IzzBizz-specific brand colors — its variables (if any) were not yet inspected in this pass.

**Update — the DS library's variables have now been inspected directly** (`figma.variables.getLocalVariableCollectionsAsync()` against file `0a4WkvFOz6MyT7Q8aPZ9Ge`). It has 4 collections: `1. TailwindCSS` (440 raw scale vars), `2. Theme` (235 vars — semantic color aliases + radius/shadow/text-size/font-weight/breakpoint scale, mode `Default` only — despite the name there's no separate light/dark binding active here), `3. Mode` (59 vars, Light/Dark), `4. Custom` (26 vars, Desktop/Mobile — a marketing-block heading/spacing scale for "Blocks (Official)", not directly relevant to app screens).

**Confirmed real semantic variables in `2. Theme`**: `colors/background`, `colors/foreground`, `colors/primary`, `colors/secondary`, `colors/muted`, `colors/muted-foreground`, `colors/destructive`, `colors/border`, `colors/input`, `colors/ring`, `colors/card`, `colors/popover`, `colors/accent`, `colors/chart-1` through `chart-5`, `colors/sidebar-*`, plus `radius/xs…4xl`, `shadow/2xs…2xl`, `text/xs…9xl` (size+line-height), `font-weight/thin…black`, `breakpoint/sm…2xl`, and `font/font-sans` = `"Plus Jakarta Sans"` (this is where that font came from — it's the DS's own generic sans token, not something IzzBizz-specific).

**Confirmed real gap**: there is no `warning`, `success`, or `accent-blue` semantic slot anywhere in these collections — only generic shadcn names (`primary`/`secondary`/`muted`/`destructive`/`accent`/`chart-1..5`). IzzBizz's brand palette (`--color-success`, `--color-warning`, `--color-danger`, `--color-accent-blue`) is genuinely absent from this library, confirming the guess below rather than just assuming it.

**Still true: nothing built so far (`לוח בקרה`, `פודקוסט`, `לייבור קוסט`) is bound via `setBoundVariable`** — every fill is a hardcoded RGB approximation. Binding what can be bound (border, background, foreground, radius, shadow, text scale) to these real DS variables, and creating one new small IzzBizz-scoped collection for the genuinely-missing brand tones, is the next concrete task — see updated plan below.

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

## Confirmed binding plan

| Code token | Bind to (DS `2. Theme` variable) |
| --- | --- |
| `--color-background` | `colors/background` |
| `--color-card` | `colors/card` |
| `--color-border` | `colors/border` |
| `--color-foreground` | `colors/foreground` |
| `--color-muted-foreground` | `colors/muted-foreground` |
| `--color-danger` | `colors/destructive` |
| `--radius-md` / `--radius-xl` / `--radius-full` | `radius/md`, `radius/xl`, closest scale step (no exact `full` token — 4xl=32px is the largest; pill radius stays a plain large number) |
| `--shadow-xs` / `--shadow-sm` | `shadow/xs`, `shadow/sm` (as effect styles, not fills) |
| `--text-xs/sm/xl` + weights | `text/xs`, `text/sm`, `text/xl` + `font-weight/medium|semibold|bold` |

Genuinely missing from the DS (create ONE new, clearly-namespaced `IzzBizz` variable collection for these only — never duplicate what's above): `--color-success`, `--color-success-strong`, `--color-warning`, `--color-accent-blue`, `--radius-card` (26px, no scale step matches it exactly).

## Next steps

1. Create the small `IzzBizz` variable collection (4-5 color variables + the one-off 26px radius) sourced 1:1 from `tokens.css`.
2. Retrofit the two already-built screens (`לוח בקרה`, `לייבור קוסט`) to use `setBoundVariable`/`setBoundVariableForPaint` against the table above instead of hardcoded fills, and fix the border color and card radius to their exact token values while doing so.
3. Build new screens with variables bound from the start rather than retrofitting again.
