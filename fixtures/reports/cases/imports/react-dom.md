# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **75%** |
| Native class coverage | 50% |
| TODOs | 1 |
| Warnings | 1 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 1 / 1 / 0 / 0 |
| Constructs (converted / flagged) | 1 / 1 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `import/react-dom` | todo | 1 |
| `class/web-only` | warning | 1 |

## cases/imports/react-dom.tsx

Auto-converted 75% · 1 TODO(s) · 1 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 5 | todo | `import/react-dom` | `createPortal from "react-dom"` | `react-dom` is web-only and is not available in React Native. | Render through `Portal` from `@tamagui/portal` (or a Tamagui overlay component), which works on web and native. |
| 10 | warning | `class/web-only` | `fixed` | `position: fixed` is dropped on native. | Use `absolute` inside a full-screen container, or a Tamagui overlay/Portal. |
