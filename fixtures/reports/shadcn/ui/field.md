# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **99.2%** |
| Native class coverage | 56.1% |
| TODOs | 1 |
| Warnings | 30 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 60 / 47 / 0 / 0 |
| Constructs (converted / flagged) | 11 / 1 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `element/unsupported` | todo | 1 |
| `class/web-only` | warning | 29 |
| `class/caveat` | warning | 1 |

## shadcn/ui/field.tsx

Auto-converted 99.2% · 1 TODO(s) · 30 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 17 | warning | `class/web-only` | `has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3` | `:has()` selectors are web-only. |  |
| 31 | todo | `element/unsupported` | `<legend>` | `<legend>` has no `html.*` equivalent, so it renders on web only. | Replace it with a supported `html.*` element or a Tamagui component, or keep it web-only in a `.web.tsx` file. |
| 37 | warning | `class/web-only` | `data-[variant=label]:text-sm data-[variant=legend]:text-base` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 53 | warning | `class/web-only` | `data-[slot=checkbox-group]:gap-3` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 53 | warning | `class/web-only` | `*:data-[slot=field-group]:gap-4` | Child selectors (`*:`) are web-only. |  |
| 62 | warning | `class/web-only` | `data-[invalid=true]:text-destructive` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 66 | warning | `class/web-only` | `*:w-full` | Child selectors (`*:`) are web-only. |  |
| 66 | warning | `class/web-only` | `[&>.sr-only]:w-auto` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 68 | warning | `class/web-only` | `has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px` | `:has()` selectors are web-only. |  |
| 68 | warning | `class/web-only` | `*:data-[slot=field-label]:flex-auto` | Child selectors (`*:`) are web-only. |  |
| 70 | warning | `class/caveat` | `@md/field-group:flex-row @md/field-group:items-center` | Tamagui resolves `@<size>:` container queries against the media query of that name (e.g. `@md` is 768px), while Tailwind's container sizes are smaller (`@md` is 28rem); check the breakpoint. |  |
| 70 | warning | `class/web-only` | `*:w-full @md/field-group:*:w-auto @md/field-group:*:data-[slot=field-label]:flex-auto` | Child selectors (`*:`) are web-only. |  |
| 70 | warning | `class/web-only` | `@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px` | `:has()` selectors are web-only. |  |
| 70 | warning | `class/web-only` | `[&>.sr-only]:w-auto` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 119 | warning | `class/web-only` | `peer/field-label` | `peer` markers drive sibling selectors, which native does not have. |  |
| 119 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 119 | warning | `class/web-only` | `group-data-[disabled=true]/field:opacity-50` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 119 | warning | `class/web-only` | `has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-muted/50 has-[>[data-slot=field]]:has-[:focus-visible]:border-ring has-[>[data-slot=field]]:has-[:focus-visible]:ring-3 has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/50 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10` | `:has()` selectors are web-only. |  |
| 119 | warning | `class/web-only` | `*:data-[slot=field]:p-3` | Child selectors (`*:`) are web-only. |  |
| 120 | warning | `class/web-only` | `has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col` | `:has()` selectors are web-only. |  |
| 136 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 136 | warning | `class/web-only` | `group-data-[disabled=true]/field:opacity-50` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 152 | warning | `class/web-only` | `group-has-data-horizontal/field:text-balance` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 152 | warning | `class/web-only` | `[[data-variant=legend]+&]:-mt-1.5` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 153 | warning | `class/web-only` | `last:mt-0` | Structural pseudo-classes (`:last-child`) are web-only. |  |
| 153 | warning | `class/web-only` | `nth-last-2:-mt-1` | Structural pseudo-classes are web-only. |  |
| 154 | warning | `class/web-only` | `[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 174 | warning | `class/web-only` | `group-data-[variant=outline]/field-group:-mb-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 182 | warning | `class/web-only` | `block` | React Native has no block layout; `display: block` is dropped on native. |  |
| 182 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 218 | warning | `class/web-only` | `list-disc` | List markers are not rendered on native (or by `html.li`). |  |
