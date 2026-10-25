# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 44.7% |
| TODOs | 0 |
| Warnings | 10 |
| Notes | 3 |
| Classes (supported / web-only / unknown / unsupported) | 17 / 21 / 0 / 0 |
| Constructs (converted / flagged) | 5 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 6 |
| `radix/caveat` | warning | 2 |
| `radix/css-variable` | warning | 1 |
| `radix/unsupported-prop` | warning | 1 |
| `selector/rewrite` | info | 1 |
| `selector/web-state` | info | 1 |
| `selector/web-variant` | info | 1 |

## shadcn/ui/tooltip.tsx

Auto-converted 100% · 0 TODO(s) · 10 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 5 | warning | `radix/caveat` | `Tooltip` | Tamagui Tooltip does not render on native; there it only provides accessibility output. |  |
| 5 | warning | `radix/caveat` | `Tooltip` | Tamagui Tooltip sets `data-placement` instead of Radix `data-side`, so `data-[side=...]:` classes no longer match. |  |
| 27 | warning | `radix/unsupported-prop` | `Tooltip.Content sideOffset` | Removed `sideOffset`: Tamagui positions this content from the root (`placement`, `offset`, `allowFlip`, `stayInFrame` on the root component). |  |
| 27 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 27 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 27 | warning | `class/web-only` | `origin-(--radix-tooltip-content-transform-origin)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 27 | warning | `class/web-only` | `has-data-[slot=kbd]:pr-1.5` | `:has()` selectors are web-only. |  |
| 27 | warning | `class/web-only` | `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 27 | warning | `class/web-only` | `**:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm` | Descendant selectors (`**:`) are web-only. |  |
| 27 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 27 | info | `selector/web-state` | `has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 27 | info | `selector/web-variant` | `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | Rewrote shadcn's custom variants (`data-open:`, `data-checked:`, ...) to the attributes Tamagui sets, and `dark:` to Tamagui's dark theme class: on web Tailwind compiles these classes without shadcn's CSS. |  |
| 88 | warning | `radix/css-variable` | `--radix-tooltip-content-transform-origin` | Tamagui `Tooltip` does not set `--radix-tooltip-content-transform-origin`, so classes using it fall back to their defaults. |  |
