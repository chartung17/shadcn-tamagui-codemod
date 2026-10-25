# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 44.7% |
| TODOs | 0 |
| Warnings | 6 |
| Notes | 1 |
| Classes (supported / web-only / unknown / unsupported) | 17 / 21 / 0 / 0 |
| Constructs (converted / flagged) | 0 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 6 |
| `selector/rewrite` | info | 1 |

## shadcn/ui/tooltip.tsx

Auto-converted 100% · 0 TODO(s) · 6 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 44 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 44 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 44 | warning | `class/web-only` | `origin-(--radix-tooltip-content-transform-origin)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 44 | warning | `class/web-only` | `has-data-[slot=kbd]:pr-1.5` | `:has()` selectors are web-only. |  |
| 44 | warning | `class/web-only` | `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 44 | warning | `class/web-only` | `**:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm` | Descendant selectors (`**:`) are web-only. |  |
| 44 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: native drops `inline-flex` and would lay the children out as a column. |  |
