# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **98%** |
| Native class coverage | 71.4% |
| TODOs | 2 |
| Warnings | 8 |
| Notes | 6 |
| Classes (supported / web-only / unknown / unsupported) | 60 / 24 / 0 / 0 |
| Constructs (converted / flagged) | 14 / 2 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `element/unsupported` | todo | 1 |
| `import/web-only-package` | todo | 1 |
| `class/web-only` | warning | 8 |
| `selector/web-color` | info | 3 |
| `element/view` | info | 2 |
| `selector/rewrite` | info | 1 |

## shadcn/ui/chart.tsx

Auto-converted 98% · 2 TODO(s) · 8 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 6 | todo | `import/web-only-package` | `"recharts"` | recharts renders SVG through the DOM and does not run on native. | Use a React Native charting library (e.g. victory-native) for native, or keep charts web-only in a `.web.tsx` file. |
| 69 | warning | `class/web-only` | `[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 69 | info | `selector/web-color` | `[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 95 | todo | `element/unsupported` | `<style>` | `<style>` has no `html.*` equivalent, so it renders on web only. | Replace it with a supported `html.*` element or a Tamagui component, or keep it web-only in a `.web.tsx` file. |
| 198 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 203 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 215 | warning | `class/web-only` | `[&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 215 | info | `selector/web-color` | `[&>svg]:text-muted-foreground` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 229 | warning | `class/web-only` | `border-(--color-border) bg-(--color-bg)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 233 | info | `selector/rewrite` | `border-border` | Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
| 247 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 253 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 260 | warning | `class/web-only` | `tabular-nums` | `font-variant-numeric` is not mapped on native. |  |
| 296 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 312 | warning | `class/web-only` | `[&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 312 | info | `selector/web-color` | `[&>svg]:text-muted-foreground` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
