# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 77.3% |
| TODOs | 0 |
| Warnings | 5 |
| Notes | 1 |
| Classes (supported / web-only / unknown / unsupported) | 17 / 5 / 0 / 0 |
| Constructs (converted / flagged) | 3 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 5 |
| `element/view` | info | 1 |

## shadcn/blocks/dashboard-01/components/site-header.tsx

Auto-converted 100% · 0 TODO(s) · 5 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 8 | warning | `class/web-only` | `h-(--header-height)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 8 | warning | `class/web-only` | `transition-[width,height]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 8 | warning | `class/web-only` | `ease-linear` | CSS transitions are web-only. |  |
| 8 | warning | `class/web-only` | `group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 9 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 13 | warning | `class/web-only` | `data-[orientation=vertical]:h-4` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
