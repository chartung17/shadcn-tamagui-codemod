# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 66% |
| TODOs | 0 |
| Warnings | 12 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 33 / 17 / 0 / 0 |
| Constructs (converted / flagged) | 1 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 12 |

## shadcn/ui/badge.tsx

Auto-converted 100% · 0 TODO(s) · 12 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 8 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 8 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 8 | warning | `class/web-only` | `whitespace-nowrap` | `white-space` is not supported on native. | Use `line-clamp-*` to limit lines on native. |
| 8 | warning | `class/web-only` | `transition-all` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 8 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5` | `:has()` selectors are web-only. |  |
| 8 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 8 | warning | `class/web-only` | `[&>svg]:pointer-events-none [&>svg]:size-3!` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 12 | warning | `class/web-only` | `[a]:hover:bg-primary/80` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 14 | warning | `class/web-only` | `[a]:hover:bg-secondary/80` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 16 | warning | `class/web-only` | `[a]:hover:bg-destructive/20` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 18 | warning | `class/web-only` | `[a]:hover:bg-muted [a]:hover:text-muted-foreground` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 21 | warning | `class/web-only` | `underline-offset-4` | `text-underline-offset` is web-only. |  |
