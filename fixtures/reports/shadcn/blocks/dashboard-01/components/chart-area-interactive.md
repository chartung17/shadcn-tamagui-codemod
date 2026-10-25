# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **96.2%** |
| Native class coverage | 65.2% |
| TODOs | 1 |
| Warnings | 7 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 15 / 8 / 0 / 0 |
| Constructs (converted / flagged) | 2 / 1 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `element/unsupported` | todo | 1 |
| `class/web-only` | warning | 7 |

## shadcn/blocks/dashboard-01/components/chart-area-interactive.tsx

Auto-converted 96.2% · 1 TODO(s) · 7 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 170 | warning | `class/web-only` | `@[540px]/card:block` | Only container queries named after configured media queries work on native. |  |
| 173 | warning | `class/web-only` | `@[540px]/card:hidden` | Only container queries named after configured media queries work on native. |  |
| 181 | warning | `class/web-only` | `*:data-[slot=toggle-group-item]:px-4!` | Child selectors (`*:`) are web-only. |  |
| 181 | warning | `class/web-only` | `@[767px]/card:flex` | Only container queries named after configured media queries work on native. |  |
| 189 | warning | `class/web-only` | `**:data-[slot=select-value]:block **:data-[slot=select-value]:truncate` | Descendant selectors (`**:`) are web-only. |  |
| 189 | warning | `class/web-only` | `@[767px]/card:hidden` | Only container queries named after configured media queries work on native. |  |
| 212 | warning | `class/web-only` | `aspect-auto` | `aspect-ratio: auto` is not a native value. |  |
| 215 | todo | `element/unsupported` | `<defs>` | `<defs>` has no `html.*` equivalent, so it renders on web only. | Use react-native-svg (or an icon component) for SVG that must render on native. |
