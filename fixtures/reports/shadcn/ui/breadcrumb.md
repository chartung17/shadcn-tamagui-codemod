# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 72.7% |
| TODOs | 0 |
| Warnings | 6 |
| Notes | 2 |
| Classes (supported / web-only / unknown / unsupported) | 16 / 6 / 0 / 0 |
| Constructs (converted / flagged) | 11 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Icons

The converted files import Tamagui-generated icons. Generate them (they need `react-native-svg` and `@tamagui/helpers-icon`):

```sh
npx @tamagui/cli icons add ChevronRightIcon=ChevronRight MoreHorizontalIcon=MoreHorizontal
```

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 6 |
| `radix/as-child` | info | 1 |
| `selector/rewrite` | info | 1 |

## shadcn/ui/breadcrumb.tsx

Auto-converted 100% · 0 TODO(s) · 6 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 29 | warning | `class/web-only` | `wrap-break-word` | `overflow-wrap` is web-only. |  |
| 44 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 44 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 58 | info | `radix/as-child` | `asChild ? Slot : html.a` | Radix `Slot` replaced with Tamagui's `asChild` on `html.a`. |  |
| 60 | warning | `class/web-only` | `transition-colors` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 93 | warning | `class/web-only` | `[&>svg]:size-3.5` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 113 | warning | `class/web-only` | `[&>svg]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 119 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
