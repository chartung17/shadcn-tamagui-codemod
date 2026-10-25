# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 66% |
| TODOs | 0 |
| Warnings | 12 |
| Notes | 3 |
| Classes (supported / web-only / unknown / unsupported) | 33 / 17 / 0 / 0 |
| Constructs (converted / flagged) | 2 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 12 |
| `cva/kept-as-child` | info | 1 |
| `radix/as-child` | info | 1 |
| `selector/rewrite` | info | 1 |

## shadcn/ui/badge.tsx

Auto-converted 100% · 0 TODO(s) · 12 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 6 | info | `cva/kept-as-child` | `badgeVariants = cva(...)` | Kept as cva(): the component supports `asChild`, and Tamagui's `asChild` does not forward `styled()` styles. Its classes still apply at runtime through className. |  |
| 7 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 7 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 7 | warning | `class/web-only` | `whitespace-nowrap` | `white-space` is not supported on native. | Use `line-clamp-*` to limit lines on native. |
| 7 | warning | `class/web-only` | `transition-all` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 7 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5` | `:has()` selectors are web-only. |  |
| 7 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 7 | warning | `class/web-only` | `[&>svg]:pointer-events-none [&>svg]:size-3!` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 7 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: native drops `inline-flex` and would lay the children out as a column. |  |
| 11 | warning | `class/web-only` | `[a]:hover:bg-primary/80` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 13 | warning | `class/web-only` | `[a]:hover:bg-secondary/80` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 15 | warning | `class/web-only` | `[a]:hover:bg-destructive/20` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 17 | warning | `class/web-only` | `[a]:hover:bg-muted [a]:hover:text-muted-foreground` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 20 | warning | `class/web-only` | `underline-offset-4` | `text-underline-offset` is web-only. |  |
| 37 | info | `radix/as-child` | `asChild ? Slot : html.span` | Radix `Slot` replaced with Tamagui's `asChild` on `html.span`. |  |
