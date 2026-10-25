# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 58.8% |
| TODOs | 0 |
| Warnings | 6 |
| Notes | 7 |
| Classes (supported / web-only / unknown / unsupported) | 10 / 7 / 0 / 0 |
| Constructs (converted / flagged) | 3 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 6 |
| `selector/rewrite` | info | 2 |
| `selector/web-variant` | info | 2 |
| `selector/native-orientation` | info | 1 |
| `selector/web-color` | info | 1 |
| `selector/web-state` | info | 1 |

## cases/selectors/web-classes.tsx

Auto-converted 100% · 0 TODO(s) · 6 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 22 | warning | `class/web-only` | `data-checked:bg-primary dark:data-open:bg-accent/50` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 22 | warning | `class/web-only` | `aria-invalid:border-destructive` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 22 | warning | `class/web-only` | `[&_svg]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 22 | info | `selector/rewrite` | `border-border` | Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
| 22 | info | `selector/web-color` | `ring-ring/50 data-checked:bg-primary aria-invalid:border-destructive dark:data-open:bg-accent/50` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 39 | warning | `class/web-only` | `data-horizontal:flex-col` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 39 | info | `selector/native-orientation` | `data-horizontal:flex-col` | Added a `native:` copy of classes behind `data-horizontal:` (data variants are dropped on native), assuming the default horizontal orientation. Vertical components need those classes adjusted by hand on native. |  |
| 39 | info | `selector/web-variant` | `data-horizontal:flex-col` | Rewrote shadcn's custom variants (`data-open:`, `data-checked:`, ...) to the attributes Tamagui sets, and `dark:` to Tamagui's dark theme class: on web Tailwind compiles these classes without shadcn's CSS. |  |
| 54 | warning | `class/web-only` | `not-last:border-b` | `:not()` selectors are web-only. |  |
| 54 | warning | `class/web-only` | `group-data-vertical/tabs:flex-col` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 54 | info | `selector/rewrite` | `flex-row border-border` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
| 54 | info | `selector/web-state` | `not-last:border-b` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 54 | info | `selector/web-variant` | `group-data-vertical/tabs:flex-col` | Rewrote shadcn's custom variants (`data-open:`, `data-checked:`, ...) to the attributes Tamagui sets, and `dark:` to Tamagui's dark theme class: on web Tailwind compiles these classes without shadcn's CSS. |  |
