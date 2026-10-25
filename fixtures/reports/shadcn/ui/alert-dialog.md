# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 48.6% |
| TODOs | 0 |
| Warnings | 20 |
| Notes | 11 |
| Classes (supported / web-only / unknown / unsupported) | 36 / 38 / 0 / 0 |
| Constructs (converted / flagged) | 12 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 20 |
| `selector/web-state` | info | 6 |
| `selector/web-color` | info | 2 |
| `selector/web-variant` | info | 2 |
| `selector/rewrite` | info | 1 |

## shadcn/ui/alert-dialog.tsx

Auto-converted 100% · 0 TODO(s) · 20 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 85 | warning | `class/web-only` | `fixed` | `position: fixed` is dropped on native. | Use `absolute` inside a full-screen container, or a Tamagui overlay/Portal. |
| 85 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 85 | warning | `class/web-only` | `supports-backdrop-filter:backdrop-blur-xs` | `@supports` queries are web-only. |  |
| 85 | warning | `class/web-only` | `data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 85 | info | `selector/web-state` | `supports-backdrop-filter:backdrop-blur-xs` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 85 | info | `selector/web-variant` | `data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0` | Rewrote shadcn's custom variants (`data-open:`, `data-checked:`, ...) to the attributes Tamagui sets, and `dark:` to Tamagui's dark theme class: on web Tailwind compiles these classes without shadcn's CSS. |  |
| 107 | warning | `class/web-only` | `fixed` | `position: fixed` is dropped on native. | Use `absolute` inside a full-screen container, or a Tamagui overlay/Portal. |
| 107 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 107 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 107 | warning | `class/web-only` | `data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 107 | info | `selector/web-color` | `ring-foreground/10` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 107 | info | `selector/web-state` | `data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 107 | info | `selector/web-variant` | `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | Rewrote shadcn's custom variants (`data-open:`, `data-checked:`, ...) to the attributes Tamagui sets, and `dark:` to Tamagui's dark theme class: on web Tailwind compiles these classes without shadcn's CSS. |  |
| 124 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 124 | warning | `class/web-only` | `grid-rows-[auto_1fr]` | CSS grid is not available on native. |  |
| 124 | warning | `class/web-only` | `place-items-center` | `place-*` is a grid shorthand; not available on native. |  |
| 124 | warning | `class/web-only` | `has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6` | `:has()` selectors are web-only. |  |
| 124 | warning | `class/web-only` | `sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 124 | info | `selector/web-state` | `has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 140 | warning | `class/web-only` | `group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 140 | info | `selector/web-state` | `group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 156 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 156 | warning | `class/web-only` | `sm:group-data-[size=default]/alert-dialog-content:row-span-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 156 | warning | `class/web-only` | `*:[svg:not([class*='size-'])]:size-8` | Child selectors (`*:`) are web-only. |  |
| 156 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 156 | info | `selector/web-state` | `sm:group-data-[size=default]/alert-dialog-content:row-span-2` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 172 | warning | `class/web-only` | `sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 172 | info | `selector/web-state` | `sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 188 | warning | `class/web-only` | `text-balance md:text-pretty` | `text-wrap` is web-only. |  |
| 188 | warning | `class/web-only` | `*:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground` | Child selectors (`*:`) are web-only. |  |
| 188 | info | `selector/web-color` | `*:[a]:hover:text-foreground` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
