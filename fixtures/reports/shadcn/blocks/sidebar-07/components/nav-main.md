# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 40% |
| TODOs | 0 |
| Warnings | 4 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 2 / 3 / 0 / 0 |
| Constructs (converted / flagged) | 3 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 3 |
| `element/native-caveat` | warning | 1 |

## shadcn/blocks/sidebar-07/components/nav-main.tsx

Auto-converted 100% · 0 TODO(s) · 4 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 51 | warning | `class/web-only` | `transition-transform` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 51 | warning | `class/web-only` | `duration-200` | CSS transitions are web-only. |  |
| 51 | warning | `class/web-only` | `group-data-[state=open]/collapsible:rotate-90` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 59 | warning | `element/native-caveat` | `<a>` | Native caveat: native has no navigation for href, target, rel, download or referrerPolicy. |  |
