# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **90.9%** |
| Native class coverage | 62% |
| TODOs | 1 |
| Warnings | 12 |
| Notes | 1 |
| Classes (supported / web-only / unknown / unsupported) | 44 / 20 / 0 / 7 |
| Constructs (converted / flagged) | 6 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/unsupported` | todo | 1 |
| `class/web-only` | warning | 12 |
| `selector/rewrite` | info | 1 |

## shadcn/ui/avatar.tsx

Auto-converted 90.9% · 1 TODO(s) · 12 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 27 | todo | `class/unsupported` | `after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 27 | warning | `class/web-only` | `data-[size=lg]:size-10 data-[size=sm]:size-6` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 43 | warning | `class/web-only` | `object-cover` | `object-fit` is dropped on native. | Use the Image `resizeMode`/`objectFit` prop on native. |
| 59 | warning | `class/web-only` | `group-data-[size=sm]/avatar:text-xs` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 75 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 75 | warning | `class/web-only` | `bg-blend-color` | Blend modes are web-only. |  |
| 75 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: native drops `inline-flex` and would lay the children out as a column. |  |
| 76 | warning | `class/web-only` | `group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 77 | warning | `class/web-only` | `group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 78 | warning | `class/web-only` | `group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 94 | warning | `class/web-only` | `-space-x-2` | `space-*` uses child selectors, which native does not have. | Use `gap-x-*` on a flex container instead. |
| 94 | warning | `class/web-only` | `*:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background` | Child selectors (`*:`) are web-only. |  |
| 110 | warning | `class/web-only` | `group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 110 | warning | `class/web-only` | `[&>svg]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
