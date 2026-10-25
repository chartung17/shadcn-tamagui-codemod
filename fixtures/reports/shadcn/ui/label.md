# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 63.6% |
| TODOs | 0 |
| Warnings | 2 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 7 / 4 / 0 / 0 |
| Constructs (converted / flagged) | 1 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 2 |

## shadcn/ui/label.tsx

Auto-converted 100% · 0 TODO(s) · 2 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 20 | warning | `class/web-only` | `group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 20 | warning | `class/web-only` | `peer-disabled:cursor-not-allowed peer-disabled:opacity-50` | `peer-*` variants use sibling selectors, which native does not have. |  |
