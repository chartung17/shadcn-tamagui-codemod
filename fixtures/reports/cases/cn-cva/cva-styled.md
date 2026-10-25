# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 92.3% |
| TODOs | 0 |
| Warnings | 1 |
| Notes | 2 |
| Classes (supported / web-only / unknown / unsupported) | 12 / 1 / 0 / 0 |
| Constructs (converted / flagged) | 2 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 1 |
| `cva/styled` | info | 1 |
| `selector/rewrite` | info | 1 |

## cases/cn-cva/cva-styled.tsx

Auto-converted 100% · 0 TODO(s) · 1 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 5 | info | `cva/styled` | `alertVariants = cva(...)` | Converted to `AlertFrame = styled(html.div, ...)` with the same variants. |  |
| 7 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 7 | info | `selector/rewrite` | `border-border` | Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
