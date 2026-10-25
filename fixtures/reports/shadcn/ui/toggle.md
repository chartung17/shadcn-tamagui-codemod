# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **97.9%** |
| Native class coverage | 65.2% |
| TODOs | 1 |
| Warnings | 9 |
| Notes | 1 |
| Classes (supported / web-only / unknown / unsupported) | 30 / 16 / 0 / 0 |
| Constructs (converted / flagged) | 0 / 1 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `radix/unmapped` | todo | 1 |
| `class/web-only` | warning | 8 |
| `cva/kept` | warning | 1 |
| `selector/rewrite` | info | 1 |

## shadcn/ui/toggle.tsx

Auto-converted 97.9% · 1 TODO(s) · 9 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 7 | todo | `radix/unmapped` | `Toggle (TogglePrimitive)` | There is no Tamagui mapping for Radix `Toggle` yet, so it stays on Radix, which is web-only. | Rebuild it from Tamagui primitives, or keep this component web-only in a `.web.tsx` file. |
| 9 | warning | `cva/kept` | `toggleVariants = cva(...)` | Kept as cva(): it is exported, so other modules may call it for class strings. Its classes still apply at runtime through className. | Convert it to `styled()` from `@tamagui/tailwind` by hand if it can be simplified. |
| 10 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 10 | warning | `class/web-only` | `whitespace-nowrap` | `white-space` is not supported on native. | Use `line-clamp-*` to limit lines on native. |
| 10 | warning | `class/web-only` | `transition-[color,box-shadow]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 10 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 10 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 10 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: native drops `inline-flex` and would lay the children out as a column. |  |
| 19 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2` | `:has()` selectors are web-only. |  |
| 20 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5` | `:has()` selectors are web-only. |  |
| 21 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2` | `:has()` selectors are web-only. |  |
