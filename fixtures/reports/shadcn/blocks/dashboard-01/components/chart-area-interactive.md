# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **92.6%** |
| Native class coverage | 65.2% |
| TODOs | 2 |
| Warnings | 7 |
| Notes | 5 |
| Classes (supported / web-only / unknown / unsupported) | 15 / 8 / 0 / 0 |
| Constructs (converted / flagged) | 2 / 2 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `element/unsupported` | todo | 1 |
| `import/web-only-package` | todo | 1 |
| `class/web-only` | warning | 7 |
| `selector/web-state` | info | 4 |
| `selector/rewrite` | info | 1 |

## shadcn/blocks/dashboard-01/components/chart-area-interactive.tsx

Auto-converted 92.6% · 2 TODO(s) · 7 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 5 | todo | `import/web-only-package` | `"recharts"` | recharts renders SVG through the DOM and does not run on native. | Use a React Native charting library (e.g. victory-native) for native, or keep charts web-only in a `.web.tsx` file. |
| 171 | warning | `class/web-only` | `@[540px]/card:block` | Only container queries named after configured media queries work on native. |  |
| 171 | info | `selector/web-state` | `@[540px]/card:block` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 174 | warning | `class/web-only` | `@[540px]/card:hidden` | Only container queries named after configured media queries work on native. |  |
| 174 | info | `selector/web-state` | `@[540px]/card:hidden` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 182 | warning | `class/web-only` | `*:data-[slot=toggle-group-item]:px-4!` | Child selectors (`*:`) are web-only. |  |
| 182 | warning | `class/web-only` | `@[767px]/card:flex` | Only container queries named after configured media queries work on native. |  |
| 182 | info | `selector/web-state` | `@[767px]/card:flex` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 190 | warning | `class/web-only` | `**:data-[slot=select-value]:block **:data-[slot=select-value]:truncate` | Descendant selectors (`**:`) are web-only. |  |
| 190 | warning | `class/web-only` | `@[767px]/card:hidden` | Only container queries named after configured media queries work on native. |  |
| 190 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 190 | info | `selector/web-state` | `@[767px]/card:hidden` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 213 | warning | `class/web-only` | `aspect-auto` | `aspect-ratio: auto` is not a native value. |  |
| 216 | todo | `element/unsupported` | `<defs>` | `<defs>` has no `html.*` equivalent, so it renders on web only. | Use react-native-svg (or an icon component) for SVG that must render on native. |
