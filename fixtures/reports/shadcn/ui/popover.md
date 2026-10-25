# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 62.5% |
| TODOs | 0 |
| Warnings | 7 |
| Notes | 0 |
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

## shadcn/ui/popover.tsx

Auto-converted 100% · 0 TODO(s) · 7 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 4 | warning | `radix/caveat` | `Popover` | Tamagui Popover sets `data-placement` instead of Radix `data-side`/`data-align`, so `data-[side=...]:` classes no longer match. |  |
| 19 | warning | `radix/unsupported-prop` | `Popover.Content align` | Removed `align`: Tamagui positions this content from the root (`placement`, `offset`, `allowFlip`, `stayInFrame` on the root component). |  |
| 19 | warning | `radix/unsupported-prop` | `Popover.Content sideOffset` | Removed `sideOffset`: Tamagui positions this content from the root (`placement`, `offset`, `allowFlip`, `stayInFrame` on the root component). |  |
| 22 | warning | `class/web-only` | `origin-(--radix-popover-content-transform-origin)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 22 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 22 | warning | `class/web-only` | `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 35 | warning | `radix/css-variable` | `--radix-popover-content-transform-origin` | Tamagui `Popover` does not set `--radix-popover-content-transform-origin`, so classes using it fall back to their defaults. |  |
