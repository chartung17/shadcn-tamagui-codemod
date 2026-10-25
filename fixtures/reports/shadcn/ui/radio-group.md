# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **92%** |
| Native class coverage | 60.4% |
| TODOs | 2 |
| Warnings | 6 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 29 / 16 / 0 / 3 |
| Constructs (converted / flagged) | 1 / 1 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/unsupported` | todo | 1 |
| `radix/unmapped` | todo | 1 |
| `class/web-only` | warning | 6 |

## shadcn/ui/radio-group.tsx

Auto-converted 92% · 2 TODO(s) · 6 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 4 | todo | `radix/unmapped` | `RadioGroup (RadioGroupPrimitive)` | There is no Tamagui mapping for Radix `RadioGroup` yet, so it stays on Radix, which is web-only. | Rebuild it from Tamagui primitives, or keep this component web-only in a `.web.tsx` file. |
| 14 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 29 | todo | `class/unsupported` | `after:absolute after:-inset-x-3 after:-inset-y-2` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 29 | warning | `class/web-only` | `peer` | `peer` markers drive sibling selectors, which native does not have. |  |
| 29 | warning | `class/web-only` | `group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input group-has-[:focus-visible]/field-label:data-checked:border-primary` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 29 | warning | `class/web-only` | `disabled:cursor-not-allowed` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 29 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 29 | warning | `class/web-only` | `data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
