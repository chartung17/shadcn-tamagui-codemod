# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **97.9%** |
| Native class coverage | 84.9% |
| TODOs | 6 |
| Warnings | 33 |
| Notes | 14 |
| Classes (supported / web-only / unknown / unsupported) | 202 / 35 / 1 / 0 |
| Constructs (converted / flagged) | 39 / 6 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `import/web-only-package` | todo | 6 |
| `class/web-only` | warning | 30 |
| `element/native-caveat` | warning | 2 |
| `class/unknown` | warning | 1 |
| `element/view` | info | 14 |

## shadcn/blocks/dashboard-01/components/data-table.tsx

Auto-converted 97.9% · 6 TODO(s) · 33 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 5 | todo | `import/web-only-package` | `"@dnd-kit/core"` | @dnd-kit uses DOM pointer events and does not run on native. | Use react-native-gesture-handler/reanimated based drag and drop on native, or keep this web-only. |
| 17 | todo | `import/web-only-package` | `"@dnd-kit/modifiers"` | @dnd-kit uses DOM pointer events and does not run on native. |  |
| 19 | todo | `import/web-only-package` | `"@dnd-kit/sortable"` | @dnd-kit uses DOM pointer events and does not run on native. | Use react-native-gesture-handler/reanimated based drag and drop on native, or keep this web-only. |
| 26 | todo | `import/web-only-package` | `"@dnd-kit/utilities"` | @dnd-kit uses DOM pointer events and does not run on native. |  |
| 46 | todo | `import/web-only-package` | `"recharts"` | recharts renders SVG through the DOM and does not run on native. | Use a React Native charting library (e.g. victory-native) for native, or keep charts web-only in a `.web.tsx` file. |
| 48 | todo | `import/web-only-package` | `"sonner"` | sonner (toasts) renders DOM elements and does not run on native. | Use Tamagui `Toast` (`tamagui/toast`). |
| 158 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 172 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 184 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 228 | warning | `element/native-caveat` | `<form>` | Native caveat: renders as a container on native; there is no form submission, validation or reset. |  |
| 238 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 252 | warning | `element/native-caveat` | `<form>` | Native caveat: renders as a container on native; there is no form submission, validation or reset. |  |
| 262 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 284 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 289 | warning | `class/unknown` | `w-38` | `38` is not a spacing/size token in the generated Tamagui config, so it is not resolved on native. | Use `w-[9.5rem]` or add a `38` token to the config. |
| 289 | warning | `class/web-only` | `**:data-[slot=select-value]:block **:data-[slot=select-value]:truncate` | Descendant selectors (`**:`) are web-only. |  |
| 315 | warning | `class/web-only` | `data-[state=open]:bg-muted` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 319 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 348 | warning | `class/web-only` | `data-[dragging=true]:z-10 data-[dragging=true]:opacity-80` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 428 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 429 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 434 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 434 | warning | `class/web-only` | `@4xl/main:hidden` | Only container queries named after configured media queries work on native. |  |
| 449 | warning | `class/web-only` | `**:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1` | Descendant selectors (`**:`) are web-only. |  |
| 449 | warning | `class/web-only` | `@4xl/main:flex` | Only container queries named after configured media queries work on native. |  |
| 459 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 494 | warning | `class/web-only` | `lg:inline` | React Native has no inline layout; `display: inline` is dropped on native. |  |
| 500 | warning | `class/web-only` | `overflow-auto` | `overflow: auto` is dropped on native; views do not scroll. | Wrap scrollable content in a ScrollView. |
| 511 | warning | `class/web-only` | `sticky` | `position: sticky` is dropped on native. |  |
| 526 | warning | `class/web-only` | `**:data-[slot=table-cell]:first:w-8` | Descendant selectors (`**:`) are web-only. |  |
| 550 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 555 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 555 | warning | `class/web-only` | `lg:w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 580 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 584 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 591 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 601 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 611 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 621 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 673 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 684 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 684 | warning | `class/web-only` | `overflow-y-auto` | `overflow-y` is not supported on native. | Use a ScrollView. |
| 728 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 743 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 747 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 747 | warning | `class/web-only` | `grid-cols-2` | CSS grid is not available on native. |  |
| 748 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 776 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 792 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 792 | warning | `class/web-only` | `grid-cols-2` | CSS grid is not available on native. |  |
| 793 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 797 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 802 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
