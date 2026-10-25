# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 66.7% |
| TODOs | 0 |
| Warnings | 1 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 2 / 1 / 0 / 0 |
| Constructs (converted / flagged) | 1 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 1 |

## shadcn/ui/skeleton.tsx

Auto-converted 100% · 0 TODO(s) · 1 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 11 | warning | `class/web-only` | `animate-pulse` | CSS keyframe animations are web-only. | Use Tamagui's `transition` prop (and enter/exit styles) for native animation. |
