# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 86.4% |
| TODOs | 0 |
| Warnings | 5 |
| Notes | 1 |
| Classes (supported / web-only / unknown / unsupported) | 38 / 6 / 0 / 0 |
| Constructs (converted / flagged) | 7 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 5 |
| `element/view` | info | 1 |

## shadcn/blocks/sidebar-07/components/team-switcher.tsx

Auto-converted 100% · 0 TODO(s) · 5 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 46 | warning | `class/web-only` | `data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 51 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 52 | warning | `class/web-only` | `truncate` | `truncate` sets text-overflow and white-space, which native drops. | Use `line-clamp-1` for single-line truncation on native. |
| 55 | warning | `class/web-only` | `truncate` | `truncate` sets text-overflow and white-space, which native drops. | Use `line-clamp-1` for single-line truncation on native. |
| 63 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 86 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
