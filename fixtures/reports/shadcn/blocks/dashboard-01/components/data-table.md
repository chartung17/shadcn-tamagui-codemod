# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 84.9% |
| TODOs | 0 |
| Warnings | 33 |
| Notes | 14 |
| Classes (supported / web-only / unknown / unsupported) | 202 / 35 / 1 / 0 |
| Constructs (converted / flagged) | 39 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 30 |
| `element/native-caveat` | warning | 2 |
| `class/unknown` | warning | 1 |
| `element/view` | info | 14 |

## shadcn/blocks/dashboard-01/components/data-table.tsx

Auto-converted 100% · 0 TODO(s) · 33 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 152 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 166 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 178 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 222 | warning | `element/native-caveat` | `<form>` | Native caveat: renders as a container on native; there is no form submission, validation or reset. |  |
| 232 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 246 | warning | `element/native-caveat` | `<form>` | Native caveat: renders as a container on native; there is no form submission, validation or reset. |  |
| 256 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 278 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 283 | warning | `class/unknown` | `w-38` | `38` is not a spacing/size token in the generated Tamagui config, so it is not resolved on native. | Use `w-[9.5rem]` or add a `38` token to the config. |
| 283 | warning | `class/web-only` | `**:data-[slot=select-value]:block **:data-[slot=select-value]:truncate` | Descendant selectors (`**:`) are web-only. |  |
| 309 | warning | `class/web-only` | `data-[state=open]:bg-muted` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 313 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 342 | warning | `class/web-only` | `data-[dragging=true]:z-10 data-[dragging=true]:opacity-80` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 422 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 423 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 428 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 428 | warning | `class/web-only` | `@4xl/main:hidden` | Only container queries named after configured media queries work on native. |  |
| 443 | warning | `class/web-only` | `**:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1` | Descendant selectors (`**:`) are web-only. |  |
| 443 | warning | `class/web-only` | `@4xl/main:flex` | Only container queries named after configured media queries work on native. |  |
| 453 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 488 | warning | `class/web-only` | `lg:inline` | React Native has no inline layout; `display: inline` is dropped on native. |  |
| 494 | warning | `class/web-only` | `overflow-auto` | `overflow: auto` is dropped on native; views do not scroll. | Wrap scrollable content in a ScrollView. |
| 505 | warning | `class/web-only` | `sticky` | `position: sticky` is dropped on native. |  |
| 520 | warning | `class/web-only` | `**:data-[slot=table-cell]:first:w-8` | Descendant selectors (`**:`) are web-only. |  |
| 544 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 549 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 549 | warning | `class/web-only` | `lg:w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 574 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 578 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 585 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 595 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 605 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 615 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 667 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 678 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 678 | warning | `class/web-only` | `overflow-y-auto` | `overflow-y` is not supported on native. | Use a ScrollView. |
| 722 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 737 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 741 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 741 | warning | `class/web-only` | `grid-cols-2` | CSS grid is not available on native. |  |
| 742 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 770 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 786 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 786 | warning | `class/web-only` | `grid-cols-2` | CSS grid is not available on native. |  |
| 787 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 791 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 796 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
