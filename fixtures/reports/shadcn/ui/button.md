# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 59.6% |
| TODOs | 0 |
| Warnings | 27 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 59 / 40 / 0 / 0 |
| Constructs (converted / flagged) | 1 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 27 |

## shadcn/ui/button.tsx

Auto-converted 100% · 0 TODO(s) · 27 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 8 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 8 | warning | `class/web-only` | `bg-clip-padding` | `background-clip` is web-only. |  |
| 8 | warning | `class/web-only` | `whitespace-nowrap` | `white-space` is not supported on native. | Use `line-clamp-*` to limit lines on native. |
| 8 | warning | `class/web-only` | `transition-all` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 8 | warning | `class/web-only` | `active:not-aria-[haspopup]:translate-y-px` | `:not()` selectors are web-only. |  |
| 8 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 8 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 14 | warning | `class/web-only` | `aria-expanded:bg-muted aria-expanded:text-foreground` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 16 | warning | `class/web-only` | `hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 16 | warning | `class/web-only` | `aria-expanded:bg-secondary aria-expanded:text-secondary-foreground` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 18 | warning | `class/web-only` | `aria-expanded:bg-muted aria-expanded:text-foreground` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 21 | warning | `class/web-only` | `underline-offset-4` | `text-underline-offset` is web-only. |  |
| 25 | warning | `class/web-only` | `in-data-[slot=button-group]:rounded-md` | `in-*` (ancestor) selectors are web-only. |  |
| 25 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2` | `:has()` selectors are web-only. |  |
| 26 | warning | `class/web-only` | `rounded-[min(var(--radius-md),8px)]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 26 | warning | `class/web-only` | `in-data-[slot=button-group]:rounded-md` | `in-*` (ancestor) selectors are web-only. |  |
| 26 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5` | `:has()` selectors are web-only. |  |
| 26 | warning | `class/web-only` | `[&_svg:not([class*='size-'])]:size-3` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 27 | warning | `class/web-only` | `rounded-[min(var(--radius-md),10px)]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 27 | warning | `class/web-only` | `in-data-[slot=button-group]:rounded-md` | `in-*` (ancestor) selectors are web-only. |  |
| 27 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5` | `:has()` selectors are web-only. |  |
| 28 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2` | `:has()` selectors are web-only. |  |
| 31 | warning | `class/web-only` | `rounded-[min(var(--radius-md),8px)]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 31 | warning | `class/web-only` | `in-data-[slot=button-group]:rounded-md` | `in-*` (ancestor) selectors are web-only. |  |
| 31 | warning | `class/web-only` | `[&_svg:not([class*='size-'])]:size-3` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 33 | warning | `class/web-only` | `rounded-[min(var(--radius-md),10px)]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 33 | warning | `class/web-only` | `in-data-[slot=button-group]:rounded-md` | `in-*` (ancestor) selectors are web-only. |  |
