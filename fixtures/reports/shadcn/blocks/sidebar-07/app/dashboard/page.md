# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 75.6% |
| TODOs | 0 |
| Warnings | 9 |
| Notes | 2 |
| Classes (supported / web-only / unknown / unsupported) | 34 / 11 / 0 / 0 |
| Constructs (converted / flagged) | 8 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 9 |
| `element/view` | info | 2 |

## shadcn/blocks/sidebar-07/app/dashboard/page.tsx

Auto-converted 100% · 0 TODO(s) · 9 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 23 | warning | `class/web-only` | `transition-[width,height]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 23 | warning | `class/web-only` | `ease-linear` | CSS transitions are web-only. |  |
| 23 | warning | `class/web-only` | `group-has-data-[collapsible=icon]/sidebar-wrapper:h-12` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 24 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 28 | warning | `class/web-only` | `data-vertical:h-4 data-vertical:self-auto` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 32 | warning | `class/web-only` | `md:block` | React Native has no block layout; `display: block` is dropped on native. |  |
| 37 | warning | `class/web-only` | `md:block` | React Native has no block layout; `display: block` is dropped on native. |  |
| 45 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 46 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 46 | warning | `class/web-only` | `auto-rows-min md:grid-cols-3` | CSS grid is not available on native. |  |
| 51 | warning | `class/web-only` | `md:min-h-min` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
