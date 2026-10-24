# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 76.4% |
| TODOs | 0 |
| Warnings | 12 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 55 / 17 / 0 / 0 |
| Constructs (converted / flagged) | 9 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 12 |

## shadcn/blocks/dashboard-01/components/section-cards.tsx

Auto-converted 100% · 0 TODO(s) · 12 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 17 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 17 | warning | `class/web-only` | `grid-cols-1 @xl/main:grid-cols-2` | CSS grid is not available on native. |  |
| 17 | warning | `class/web-only` | `*:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card` | Child selectors (`*:`) are web-only. |  |
| 17 | warning | `class/web-only` | `@5xl/main:grid-cols-4` | Only container queries named after configured media queries work on native. |  |
| 21 | warning | `class/web-only` | `tabular-nums` | `font-variant-numeric` is not mapped on native. |  |
| 21 | warning | `class/web-only` | `@[250px]/card:text-3xl` | Only container queries named after configured media queries work on native. |  |
| 43 | warning | `class/web-only` | `tabular-nums` | `font-variant-numeric` is not mapped on native. |  |
| 43 | warning | `class/web-only` | `@[250px]/card:text-3xl` | Only container queries named after configured media queries work on native. |  |
| 65 | warning | `class/web-only` | `tabular-nums` | `font-variant-numeric` is not mapped on native. |  |
| 65 | warning | `class/web-only` | `@[250px]/card:text-3xl` | Only container queries named after configured media queries work on native. |  |
| 87 | warning | `class/web-only` | `tabular-nums` | `font-variant-numeric` is not mapped on native. |  |
| 87 | warning | `class/web-only` | `@[250px]/card:text-3xl` | Only container queries named after configured media queries work on native. |  |
