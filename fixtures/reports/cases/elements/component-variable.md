# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **50%** |
| Native class coverage | 100% |
| TODOs | 1 |
| Warnings | 0 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 0 / 0 / 0 / 0 |
| Constructs (converted / flagged) | 1 / 1 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `element/unsupported` | todo | 1 |

## cases/elements/component-variable.tsx

Auto-converted 50% · 1 TODO(s) · 0 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 16 | todo | `element/unsupported` | `"td"` | `<td>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
