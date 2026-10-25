# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 65.9% |
| TODOs | 0 |
| Warnings | 6 |
| Notes | 8 |
| Classes (supported / web-only / unknown / unsupported) | 27 / 14 / 0 / 0 |
| Constructs (converted / flagged) | 4 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 6 |
| `selector/web-variant` | info | 3 |
| `selector/native-orientation` | info | 2 |
| `selector/rewrite` | info | 1 |
| `selector/web-color` | info | 1 |
| `selector/web-state` | info | 1 |

## shadcn/ui/slider.tsx

Auto-converted 100% · 0 TODO(s) · 6 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 43 | warning | `class/web-only` | `touch-none` | `touch-action` is web-only. |  |
| 43 | warning | `class/web-only` | `data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 43 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 43 | info | `selector/web-state` | `data-disabled:opacity-50` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 43 | info | `selector/web-variant` | `data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col` | Rewrote shadcn's custom variants (`data-open:`, `data-checked:`, ...) to the attributes Tamagui sets, and `dark:` to Tamagui's dark theme class: on web Tailwind compiles these classes without shadcn's CSS. |  |
| 50 | warning | `class/web-only` | `data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 50 | info | `selector/native-orientation` | `data-horizontal:h-1.5 data-horizontal:w-full` | Added a `native:` copy of classes behind `data-horizontal:` (data variants are dropped on native), assuming the default horizontal orientation. Vertical components need those classes adjusted by hand on native. |  |
| 50 | info | `selector/web-variant` | `data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5` | Rewrote shadcn's custom variants (`data-open:`, `data-checked:`, ...) to the attributes Tamagui sets, and `dark:` to Tamagui's dark theme class: on web Tailwind compiles these classes without shadcn's CSS. |  |
| 54 | warning | `class/web-only` | `data-horizontal:h-full data-vertical:w-full` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 54 | info | `selector/native-orientation` | `data-horizontal:h-full` | Added a `native:` copy of classes behind `data-horizontal:` (data variants are dropped on native), assuming the default horizontal orientation. Vertical components need those classes adjusted by hand on native. |  |
| 54 | info | `selector/web-variant` | `data-horizontal:h-full data-vertical:w-full` | Rewrote shadcn's custom variants (`data-open:`, `data-checked:`, ...) to the attributes Tamagui sets, and `dark:` to Tamagui's dark theme class: on web Tailwind compiles these classes without shadcn's CSS. |  |
| 61 | warning | `class/web-only` | `block` | React Native has no block layout; `display: block` is dropped on native. |  |
| 61 | warning | `class/web-only` | `transition-[color,box-shadow]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 61 | info | `selector/web-color` | `ring-ring/50` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
