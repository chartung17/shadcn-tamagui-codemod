# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **89.3%** |
| Native class coverage | 62% |
| TODOs | 2 |
| Warnings | 12 |
| Notes | 1 |
| Classes (supported / web-only / unknown / unsupported) | 44 / 20 / 0 / 7 |
| Constructs (converted / flagged) | 3 / 1 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/unsupported` | todo | 1 |
| `radix/unmapped` | todo | 1 |
| `class/web-only` | warning | 12 |
| `selector/rewrite` | info | 1 |

## shadcn/ui/avatar.tsx

Auto-converted 89.3% · 2 TODO(s) · 12 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 4 | todo | `radix/unmapped` | `Avatar (AvatarPrimitive)` | There is no Tamagui mapping for Radix `Avatar` yet, so it stays on Radix, which is web-only. | Rebuild it from Tamagui primitives, or keep this component web-only in a `.web.tsx` file. |
| 20 | todo | `class/unsupported` | `after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 20 | warning | `class/web-only` | `data-[size=lg]:size-10 data-[size=sm]:size-6` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 36 | warning | `class/web-only` | `object-cover` | `object-fit` is dropped on native. | Use the Image `resizeMode`/`objectFit` prop on native. |
| 52 | warning | `class/web-only` | `group-data-[size=sm]/avatar:text-xs` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 68 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 68 | warning | `class/web-only` | `bg-blend-color` | Blend modes are web-only. |  |
| 68 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: native drops `inline-flex` and would lay the children out as a column. |  |
| 69 | warning | `class/web-only` | `group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 70 | warning | `class/web-only` | `group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 71 | warning | `class/web-only` | `group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 87 | warning | `class/web-only` | `-space-x-2` | `space-*` uses child selectors, which native does not have. | Use `gap-x-*` on a flex container instead. |
| 87 | warning | `class/web-only` | `*:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background` | Child selectors (`*:`) are web-only. |  |
| 103 | warning | `class/web-only` | `group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 103 | warning | `class/web-only` | `[&>svg]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
