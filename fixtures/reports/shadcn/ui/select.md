# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 57.5% |
| TODOs | 0 |
| Warnings | 32 |
| Notes | 17 |
| Classes (supported / web-only / unknown / unsupported) | 77 / 57 / 0 / 0 |
| Constructs (converted / flagged) | 18 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Icons

The converted files import Tamagui-generated icons. Generate them (they need `react-native-svg` and `@tamagui/helpers-icon`):

```sh
npx @tamagui/cli icons add CheckIcon=Check ChevronDownIcon=ChevronDown ChevronUpIcon=ChevronUp
```

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 25 |
| `radix/css-variable` | warning | 4 |
| `radix/unsupported-prop` | warning | 2 |
| `radix/caveat` | warning | 1 |
| `selector/web-state` | info | 5 |
| `selector/rewrite` | info | 4 |
| `selector/web-color` | info | 3 |
| `icon/wrapped` | info | 2 |
| `element/view` | info | 1 |
| `radix/class-moved` | info | 1 |
| `selector/web-variant` | info | 1 |

## shadcn/ui/select.tsx

Auto-converted 100% · 0 TODO(s) · 32 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 6 | warning | `radix/caveat` | `Select` | On native, Tamagui Select renders its items inline unless an `Adapt` target (e.g. a Sheet) is active; add `<Select.Adapt>` for a native picker experience. |  |
| 35 | warning | `class/web-only` | `scroll-my-1` | Scroll snapping/margins are web-only. |  |
| 60 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 60 | warning | `class/web-only` | `whitespace-nowrap` | `white-space` is not supported on native. | Use `line-clamp-*` to limit lines on native. |
| 60 | warning | `class/web-only` | `transition-[color,box-shadow]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 60 | warning | `class/web-only` | `disabled:cursor-not-allowed` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 60 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 60 | warning | `class/web-only` | `data-placeholder:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 60 | warning | `class/web-only` | `*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5` | Child selectors (`*:`) are web-only. |  |
| 60 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 60 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 60 | info | `selector/web-color` | `focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 60 | info | `selector/web-state` | `aria-invalid:ring-3 data-[size=default]:h-9 data-[size=sm]:h-8` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 60 | warning | `class/web-only` | `max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 60 | warning | `class/web-only` | `overflow-x-hidden` | `overflow-x` is not supported on native. | Use a horizontal ScrollView. |
| 60 | warning | `class/web-only` | `overflow-y-auto` | `overflow-y` is not supported on native. | Use a ScrollView. |
| 60 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 60 | warning | `class/web-only` | `data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 60 | info | `selector/web-color` | `ring-foreground/10` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 60 | info | `selector/web-state` | `data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 60 | info | `selector/web-variant` | `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | Rewrote shadcn's custom variants (`data-open:`, `data-checked:`, ...) to the attributes Tamagui sets, and `dark:` to Tamagui's dark theme class: on web Tailwind compiles these classes without shadcn's CSS. |  |
| 67 | info | `icon/wrapped` | `pointer-events-none` | Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper. |  |
| 68 | warning | `radix/unsupported-prop` | `Select.Content position` | Removed `position`: Tamagui Select always renders a floating list (or an adapted Sheet). |  |
| 68 | warning | `radix/unsupported-prop` | `Select.Content align` | Removed `align`: Tamagui positions this content from the root (`placement`, `offset`, `allowFlip`, `stayInFrame` on the root component). |  |
| 78 | warning | `class/web-only` | `data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 82 | info | `radix/class-moved` | `SelectPrimitive.Viewport` | Moved the classes of the parent part here: in Tamagui the `Viewport` is the visible frame. |  |
| 86 | info | `selector/web-state` | `data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 92 | warning | `class/web-only` | `data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 97 | info | `selector/web-state` | `data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 99 | warning | `radix/css-variable` | `--radix-select-trigger-width` | Tamagui `Select` does not set `--radix-select-trigger-width`, so classes using it fall back to their defaults. |  |
| 99 | warning | `radix/css-variable` | `--radix-select-trigger-height` | Tamagui `Select` does not set `--radix-select-trigger-height`, so classes using it fall back to their defaults. |  |
| 101 | warning | `radix/css-variable` | `--radix-select-content-available-height` | Tamagui `Select` does not set `--radix-select-content-available-height`, so classes using it fall back to their defaults. |  |
| 101 | warning | `radix/css-variable` | `--radix-select-content-transform-origin` | Tamagui `Select` does not set `--radix-select-content-transform-origin`, so classes using it fall back to their defaults. |  |
| 136 | warning | `class/web-only` | `cursor-default` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 136 | warning | `class/web-only` | `not-data-[variant=destructive]:focus:**:text-accent-foreground` | `:not()` selectors are web-only. |  |
| 136 | warning | `class/web-only` | `data-disabled:pointer-events-none data-disabled:opacity-50` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 136 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 136 | warning | `class/web-only` | `*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2` | Child selectors (`*:`) are web-only. |  |
| 136 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 136 | info | `selector/web-color` | `not-data-[variant=destructive]:focus:**:text-accent-foreground` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 136 | info | `selector/web-state` | `data-disabled:pointer-events-none data-disabled:opacity-50` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 141 | info | `element/view` | `<span>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 142 | info | `icon/wrapped` | `pointer-events-none` | Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper. |  |
| 174 | warning | `class/web-only` | `cursor-default` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 174 | warning | `class/web-only` | `[&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 174 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 192 | warning | `class/web-only` | `cursor-default` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 192 | warning | `class/web-only` | `[&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 192 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
