# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **83.3%** |
| Native class coverage | 87.5% |
| TODOs | 2 |
| Warnings | 1 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 7 / 1 / 0 / 0 |
| Constructs (converted / flagged) | 2 / 2 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `element/unsupported` | todo | 2 |
| `class/web-only` | warning | 1 |

## cases/elements/unsupported.tsx

Auto-converted 83.3% · 2 TODO(s) · 1 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 5 | warning | `class/web-only` | `overflow-x-auto` | `overflow-x` is not supported on native. | Use a horizontal ScrollView. |
| 6 | todo | `element/unsupported` | `<table>` | `<table>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
| 27 | todo | `element/unsupported` | `<svg>` | `<svg>` has no `html.*` equivalent, so it renders on web only. | Use react-native-svg (or an icon component) for SVG that must render on native. |
