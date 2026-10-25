# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **93.8%** |
| Native class coverage | 33.3% |
| TODOs | 1 |
| Warnings | 10 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 16 / 29 / 0 / 3 |
| Constructs (converted / flagged) | 0 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/unsupported` | todo | 1 |
| `class/web-only` | warning | 10 |

## shadcn/ui/switch.tsx

Auto-converted 93.8% · 1 TODO(s) · 10 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 21 | todo | `class/unsupported` | `after:absolute after:-inset-x-3 after:-inset-y-2` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 21 | warning | `class/web-only` | `peer` | `peer` markers drive sibling selectors, which native does not have. |  |
| 21 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 21 | warning | `class/web-only` | `transition-all` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 21 | warning | `class/web-only` | `group-has-[:focus-visible]/field-label:border-transparent group-has-[:focus-visible]/field-label:ring-0` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 21 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 21 | warning | `class/web-only` | `data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 28 | warning | `class/web-only` | `block` | React Native has no block layout; `display: block` is dropped on native. |  |
| 28 | warning | `class/web-only` | `transition-transform` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 28 | warning | `class/web-only` | `group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 28 | warning | `class/web-only` | `dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
