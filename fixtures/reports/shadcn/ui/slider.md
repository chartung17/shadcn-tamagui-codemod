# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 0 |
| **Auto-converted** | **100%** |
| Native class coverage | 65.9% |
| TODOs | 0 |
| Warnings | 6 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 27 / 14 / 0 / 0 |
| Constructs (converted / flagged) | 0 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 6 |

## shadcn/ui/slider.tsx

Auto-converted 100% · 0 TODO(s) · 6 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 33 | warning | `class/web-only` | `touch-none` | `touch-action` is web-only. |  |
| 33 | warning | `class/web-only` | `data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 40 | warning | `class/web-only` | `data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 44 | warning | `class/web-only` | `data-horizontal:h-full data-vertical:w-full` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 51 | warning | `class/web-only` | `block` | React Native has no block layout; `display: block` is dropped on native. |  |
| 51 | warning | `class/web-only` | `transition-[color,box-shadow]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
