# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **96%** |
| Native class coverage | 68.8% |
| TODOs | 2 |
| Warnings | 8 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 33 / 14 / 0 / 1 |
| Constructs (converted / flagged) | 1 / 1 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/unsupported` | todo | 1 |
| `radix/unmapped` | todo | 1 |
| `class/web-only` | warning | 8 |

## shadcn/ui/accordion.tsx

Auto-converted 96% · 2 TODO(s) · 8 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 6 | todo | `radix/unmapped` | `Accordion (AccordionPrimitive)` | There is no Tamagui mapping for Radix `Accordion` yet, so it stays on Radix, which is web-only. | Rebuild it from Tamagui primitives, or keep this component web-only in a `.web.tsx` file. |
| 30 | warning | `class/web-only` | `not-last:border-b` | `:not()` selectors are web-only. |  |
| 47 | todo | `class/unsupported` | `focus-visible:after:border-ring` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 47 | warning | `class/web-only` | `transition-all` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 47 | warning | `class/web-only` | `**:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground` | Descendant selectors (`**:`) are web-only. |  |
| 55 | warning | `class/web-only` | `group-aria-expanded/accordion-trigger:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 59 | warning | `class/web-only` | `group-aria-expanded/accordion-trigger:inline` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 74 | warning | `class/web-only` | `data-open:animate-accordion-down data-closed:animate-accordion-up` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 79 | warning | `class/web-only` | `h-(--radix-accordion-content-height)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 79 | warning | `class/web-only` | `[&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
