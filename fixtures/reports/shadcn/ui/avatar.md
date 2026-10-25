# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **90.9%** |
| Native class coverage | 62% |
| TODOs | 1 |
| Warnings | 12 |
| Notes | 14 |
| Classes (supported / web-only / unknown / unsupported) | 44 / 20 / 0 / 7 |
| Constructs (converted / flagged) | 6 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/unsupported` | todo | 1 |
| `class/web-only` | warning | 12 |
| `selector/web-state` | info | 6 |
| `selector/web-color` | info | 4 |
| `selector/rewrite` | info | 3 |
| `selector/web-variant` | info | 1 |

## shadcn/ui/avatar.tsx

Auto-converted 90.9% · 1 TODO(s) · 12 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 63 | todo | `class/unsupported` | `after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 63 | warning | `class/web-only` | `data-[size=lg]:size-10 data-[size=sm]:size-6` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 63 | info | `selector/rewrite` | `flex-row border-border` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
| 63 | info | `selector/web-color` | `after:border-border` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 63 | info | `selector/web-state` | `data-[size=lg]:size-10 data-[size=sm]:size-6` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 63 | info | `selector/web-variant` | `dark:after:mix-blend-lighten` | Rewrote shadcn's custom variants (`data-open:`, `data-checked:`, ...) to the attributes Tamagui sets, and `dark:` to Tamagui's dark theme class: on web Tailwind compiles these classes without shadcn's CSS. |  |
| 79 | warning | `class/web-only` | `object-cover` | `object-fit` is dropped on native. | Use the Image `resizeMode`/`objectFit` prop on native. |
| 95 | warning | `class/web-only` | `group-data-[size=sm]/avatar:text-xs` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 95 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 95 | info | `selector/web-state` | `group-data-[size=sm]/avatar:text-xs` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 111 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 111 | warning | `class/web-only` | `bg-blend-color` | Blend modes are web-only. |  |
| 111 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 111 | info | `selector/web-color` | `ring-background` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 112 | warning | `class/web-only` | `group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 112 | info | `selector/web-state` | `group-data-[size=sm]/avatar:size-2` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 113 | warning | `class/web-only` | `group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 113 | info | `selector/web-state` | `group-data-[size=default]/avatar:size-2.5` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 114 | warning | `class/web-only` | `group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 114 | info | `selector/web-state` | `group-data-[size=lg]/avatar:size-3` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 130 | warning | `class/web-only` | `-space-x-2` | `space-*` uses child selectors, which native does not have. | Use `gap-x-*` on a flex container instead. |
| 130 | warning | `class/web-only` | `*:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background` | Child selectors (`*:`) are web-only. |  |
| 130 | info | `selector/web-color` | `*:data-[slot=avatar]:ring-background` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 146 | warning | `class/web-only` | `group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 146 | warning | `class/web-only` | `[&>svg]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 146 | info | `selector/web-color` | `ring-background` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 146 | info | `selector/web-state` | `group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
