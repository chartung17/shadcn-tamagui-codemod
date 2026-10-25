# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 62.5% |
| TODOs | 0 |
| Warnings | 7 |
| Notes | 3 |
| Classes (supported / web-only / unknown / unsupported) | 20 / 12 / 0 / 0 |
| Constructs (converted / flagged) | 7 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 3 |
| `radix/unsupported-prop` | warning | 2 |
| `radix/caveat` | warning | 1 |
| `radix/css-variable` | warning | 1 |
| `selector/web-color` | info | 1 |
| `selector/web-state` | info | 1 |
| `selector/web-variant` | info | 1 |

## shadcn/ui/popover.tsx

Auto-converted 100% · 0 TODO(s) · 7 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 4 | warning | `radix/caveat` | `Popover` | Tamagui Popover sets `data-placement` instead of Radix `data-side`/`data-align`, so `data-[side=...]:` classes no longer match. |  |
| 18 | warning | `radix/unsupported-prop` | `Popover.Content align` | Removed `align`: Tamagui positions this content from the root (`placement`, `offset`, `allowFlip`, `stayInFrame` on the root component). |  |
| 18 | warning | `radix/unsupported-prop` | `Popover.Content sideOffset` | Removed `sideOffset`: Tamagui positions this content from the root (`placement`, `offset`, `allowFlip`, `stayInFrame` on the root component). |  |
| 21 | warning | `class/web-only` | `origin-(--radix-popover-content-transform-origin)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 21 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 21 | warning | `class/web-only` | `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 21 | info | `selector/web-color` | `ring-foreground/10` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 21 | info | `selector/web-state` | `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 21 | info | `selector/web-variant` | `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | Rewrote shadcn's custom variants (`data-open:`, `data-checked:`, ...) to the attributes Tamagui sets, and `dark:` to Tamagui's dark theme class: on web Tailwind compiles these classes without shadcn's CSS. |  |
| 71 | warning | `radix/css-variable` | `--radix-popover-content-transform-origin` | Tamagui `Popover` does not set `--radix-popover-content-transform-origin`, so classes using it fall back to their defaults. |  |
