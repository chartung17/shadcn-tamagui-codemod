# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 48.6% |
| TODOs | 0 |
| Warnings | 20 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 36 / 38 / 0 / 0 |
| Constructs (converted / flagged) | 3 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 20 |

## shadcn/ui/alert-dialog.tsx

Auto-converted 100% · 0 TODO(s) · 20 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 38 | warning | `class/web-only` | `fixed` | `position: fixed` is dropped on native. | Use `absolute` inside a full-screen container, or a Tamagui overlay/Portal. |
| 38 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 38 | warning | `class/web-only` | `supports-backdrop-filter:backdrop-blur-xs` | `@supports` queries are web-only. |  |
| 38 | warning | `class/web-only` | `data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 60 | warning | `class/web-only` | `fixed` | `position: fixed` is dropped on native. | Use `absolute` inside a full-screen container, or a Tamagui overlay/Portal. |
| 60 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 60 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 60 | warning | `class/web-only` | `data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 77 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 77 | warning | `class/web-only` | `grid-rows-[auto_1fr]` | CSS grid is not available on native. |  |
| 77 | warning | `class/web-only` | `place-items-center` | `place-*` is a grid shorthand; not available on native. |  |
| 77 | warning | `class/web-only` | `has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6` | `:has()` selectors are web-only. |  |
| 77 | warning | `class/web-only` | `sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 93 | warning | `class/web-only` | `group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 109 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 109 | warning | `class/web-only` | `sm:group-data-[size=default]/alert-dialog-content:row-span-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 109 | warning | `class/web-only` | `*:[svg:not([class*='size-'])]:size-8` | Child selectors (`*:`) are web-only. |  |
| 125 | warning | `class/web-only` | `sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 141 | warning | `class/web-only` | `text-balance md:text-pretty` | `text-wrap` is web-only. |  |
| 141 | warning | `class/web-only` | `*:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground` | Child selectors (`*:`) are web-only. |  |
