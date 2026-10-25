# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **99.3%** |
| Native class coverage | 57.5% |
| TODOs | 1 |
| Warnings | 25 |
| Notes | 1 |
| Classes (supported / web-only / unknown / unsupported) | 77 / 57 / 0 / 0 |
| Constructs (converted / flagged) | 1 / 1 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `radix/unmapped` | todo | 1 |
| `class/web-only` | warning | 25 |
| `element/view` | info | 1 |

## shadcn/ui/select.tsx

Auto-converted 99.3% · 1 TODO(s) · 25 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 6 | todo | `radix/unmapped` | `Select (SelectPrimitive)` | There is no Tamagui mapping for Radix `Select` yet, so it stays on Radix, which is web-only. | Rebuild it from Tamagui primitives, or keep this component web-only in a `.web.tsx` file. |
| 23 | warning | `class/web-only` | `scroll-my-1` | Scroll snapping/margins are web-only. |  |
| 48 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 48 | warning | `class/web-only` | `whitespace-nowrap` | `white-space` is not supported on native. | Use `line-clamp-*` to limit lines on native. |
| 48 | warning | `class/web-only` | `transition-[color,box-shadow]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 48 | warning | `class/web-only` | `disabled:cursor-not-allowed` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 48 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 48 | warning | `class/web-only` | `data-placeholder:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 48 | warning | `class/web-only` | `*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5` | Child selectors (`*:`) are web-only. |  |
| 48 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 74 | warning | `class/web-only` | `max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 74 | warning | `class/web-only` | `overflow-x-hidden` | `overflow-x` is not supported on native. | Use a horizontal ScrollView. |
| 74 | warning | `class/web-only` | `overflow-y-auto` | `overflow-y` is not supported on native. | Use a ScrollView. |
| 74 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 74 | warning | `class/web-only` | `data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 76 | warning | `class/web-only` | `data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 87 | warning | `class/web-only` | `data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 121 | warning | `class/web-only` | `cursor-default` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 121 | warning | `class/web-only` | `not-data-[variant=destructive]:focus:**:text-accent-foreground` | `:not()` selectors are web-only. |  |
| 121 | warning | `class/web-only` | `data-disabled:pointer-events-none data-disabled:opacity-50` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 121 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 121 | warning | `class/web-only` | `*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2` | Child selectors (`*:`) are web-only. |  |
| 126 | info | `element/view` | `<span>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 157 | warning | `class/web-only` | `cursor-default` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 157 | warning | `class/web-only` | `[&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 175 | warning | `class/web-only` | `cursor-default` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 175 | warning | `class/web-only` | `[&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
