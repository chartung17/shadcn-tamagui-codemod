# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 66.7% |
| TODOs | 0 |
| Warnings | 3 |
| Notes | 2 |
| Classes (supported / web-only / unknown / unsupported) | 8 / 4 / 0 / 0 |
| Constructs (converted / flagged) | 4 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 3 |
| `selector/rewrite` | info | 2 |

## cases/selectors/rewrites.tsx

Auto-converted 100% · 0 TODO(s) · 3 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 6 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 6 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: native drops `inline-flex` and would lay the children out as a column. |  |
| 9 | warning | `class/web-only` | `placeholder:text-muted-foreground placeholder:text-sm` | The `placeholder:` variant styles `::placeholder`, which native does not have. | Use the `placeholder-<color>` utility, which maps to `placeholderTextColor` on native. |
| 9 | info | `selector/rewrite` | `placeholder-muted-foreground` | Added `placeholder-*`, which maps to `placeholderTextColor` on native. |  |
| 13 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
