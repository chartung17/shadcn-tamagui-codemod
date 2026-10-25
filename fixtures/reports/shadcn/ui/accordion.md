# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **98.1%** |
| Native class coverage | 68.8% |
| TODOs | 1 |
| Warnings | 9 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 33 / 14 / 0 / 1 |
| Constructs (converted / flagged) | 6 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/unsupported` | todo | 1 |
| `class/web-only` | warning | 8 |
| `radix/css-variable` | warning | 1 |

## shadcn/ui/accordion.tsx

Auto-converted 98.1% · 1 TODO(s) · 9 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 39 | warning | `class/web-only` | `not-last:border-b` | `:not()` selectors are web-only. |  |
| 56 | todo | `class/unsupported` | `focus-visible:after:border-ring` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 56 | warning | `class/web-only` | `transition-all` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 56 | warning | `class/web-only` | `**:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground` | Descendant selectors (`**:`) are web-only. |  |
| 64 | warning | `class/web-only` | `group-aria-expanded/accordion-trigger:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 68 | warning | `class/web-only` | `group-aria-expanded/accordion-trigger:inline` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 83 | warning | `class/web-only` | `data-open:animate-accordion-down data-closed:animate-accordion-up` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 88 | warning | `class/web-only` | `h-(--radix-accordion-content-height)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 88 | warning | `class/web-only` | `[&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 88 | warning | `radix/css-variable` | `--radix-accordion-content-height` | Tamagui `Accordion` does not set `--radix-accordion-content-height`, so classes using it fall back to their defaults. |  |
