# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **0%** |
| Native class coverage | 100% |
| TODOs | 1 |
| Warnings | 0 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 0 / 0 / 0 / 0 |
| Constructs (converted / flagged) | 0 / 1 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `radix/unmapped` | todo | 1 |

## shadcn/ui/collapsible.tsx

Auto-converted 0% · 1 TODO(s) · 0 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 2 | todo | `radix/unmapped` | `Collapsible (CollapsiblePrimitive)` | There is no Tamagui mapping for Radix `Collapsible` yet, so it stays on Radix, which is web-only. | Rebuild it from Tamagui primitives, or keep this component web-only in a `.web.tsx` file. |
