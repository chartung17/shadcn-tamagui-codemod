# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **99%** |
| Native class coverage | 71.4% |
| TODOs | 1 |
| Warnings | 8 |
| Notes | 2 |
| Classes (supported / web-only / unknown / unsupported) | 60 / 24 / 0 / 0 |
| Constructs (converted / flagged) | 14 / 1 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `element/unsupported` | todo | 1 |
| `class/web-only` | warning | 8 |
| `element/view` | info | 2 |

## shadcn/ui/chart.tsx

Auto-converted 99% · 1 TODO(s) · 8 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 68 | warning | `class/web-only` | `[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 94 | todo | `element/unsupported` | `<style>` | `<style>` has no `html.*` equivalent, so it renders on web only. | Replace it with a supported `html.*` element or a Tamagui component, or keep it web-only in a `.web.tsx` file. |
| 197 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 202 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 214 | warning | `class/web-only` | `[&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 228 | warning | `class/web-only` | `border-(--color-border) bg-(--color-bg)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 246 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 252 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 259 | warning | `class/web-only` | `tabular-nums` | `font-variant-numeric` is not mapped on native. |  |
| 295 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 311 | warning | `class/web-only` | `[&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
