# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **99.2%** |
| Native class coverage | 56.1% |
| TODOs | 1 |
| Warnings | 30 |
| Notes | 16 |
| Classes (supported / web-only / unknown / unsupported) | 60 / 47 / 0 / 0 |
| Constructs (converted / flagged) | 12 / 1 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `element/unsupported` | todo | 1 |
| `class/web-only` | warning | 29 |
| `class/caveat` | warning | 1 |
| `selector/web-state` | info | 10 |
| `selector/web-color` | info | 3 |
| `cva/styled` | info | 1 |
| `selector/rewrite` | info | 1 |
| `selector/web-variant` | info | 1 |

## shadcn/ui/field.tsx

Auto-converted 99.2% · 1 TODO(s) · 30 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 17 | warning | `class/web-only` | `has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3` | `:has()` selectors are web-only. |  |
| 17 | info | `selector/web-state` | `has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 31 | todo | `element/unsupported` | `<legend>` | `<legend>` has no `html.*` equivalent, so it renders on web only. | Replace it with a supported `html.*` element or a Tamagui component, or keep it web-only in a `.web.tsx` file. |
| 36 | warning | `class/web-only` | `data-[variant=label]:text-sm data-[variant=legend]:text-base` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 36 | info | `selector/web-state` | `data-[variant=label]:text-sm data-[variant=legend]:text-base` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 52 | warning | `class/web-only` | `data-[slot=checkbox-group]:gap-3` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 52 | warning | `class/web-only` | `*:data-[slot=field-group]:gap-4` | Child selectors (`*:`) are web-only. |  |
| 52 | info | `selector/web-state` | `data-[slot=checkbox-group]:gap-3` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 60 | info | `cva/styled` | `fieldVariants = cva(...)` | Converted to `FieldFrame = styled(html.div, ...)` with the same variants. |  |
| 62 | warning | `class/web-only` | `data-[invalid=true]:text-destructive` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 62 | info | `selector/web-color` | `data-[invalid=true]:text-destructive` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 66 | warning | `class/web-only` | `*:w-full` | Child selectors (`*:`) are web-only. |  |
| 66 | warning | `class/web-only` | `[&>.sr-only]:w-auto` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 68 | warning | `class/web-only` | `has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px` | `:has()` selectors are web-only. |  |
| 68 | warning | `class/web-only` | `*:data-[slot=field-label]:flex-auto` | Child selectors (`*:`) are web-only. |  |
| 68 | info | `selector/web-state` | `has-[>[data-slot=field-content]]:items-start` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 70 | warning | `class/caveat` | `@md/field-group:flex-row @md/field-group:items-center` | Tamagui resolves `@<size>:` container queries against the media query of that name (e.g. `@md` is 768px), while Tailwind's container sizes are smaller (`@md` is 28rem); check the breakpoint. |  |
| 70 | warning | `class/web-only` | `*:w-full @md/field-group:*:w-auto @md/field-group:*:data-[slot=field-label]:flex-auto` | Child selectors (`*:`) are web-only. |  |
| 70 | warning | `class/web-only` | `@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px` | `:has()` selectors are web-only. |  |
| 70 | warning | `class/web-only` | `[&>.sr-only]:w-auto` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 70 | info | `selector/web-state` | `@md/field-group:has-[>[data-slot=field-content]]:items-start` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 121 | warning | `class/web-only` | `peer/field-label` | `peer` markers drive sibling selectors, which native does not have. |  |
| 121 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 121 | warning | `class/web-only` | `group-data-[disabled=true]/field:opacity-50` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 121 | warning | `class/web-only` | `has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-muted/50 has-[>[data-slot=field]]:has-[:focus-visible]:border-ring has-[>[data-slot=field]]:has-[:focus-visible]:ring-3 has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/50 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10` | `:has()` selectors are web-only. |  |
| 121 | warning | `class/web-only` | `*:data-[slot=field]:p-3` | Child selectors (`*:`) are web-only. |  |
| 121 | info | `selector/rewrite` | `flex-row border-border` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
| 121 | info | `selector/web-color` | `has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-muted/50 has-[>[data-slot=field]]:has-[:focus-visible]:border-ring has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/50 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 121 | info | `selector/web-state` | `group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border has-[>[data-slot=field]]:has-[:focus-visible]:ring-3` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 122 | warning | `class/web-only` | `has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col` | `:has()` selectors are web-only. |  |
| 122 | info | `selector/web-state` | `has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 138 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 138 | warning | `class/web-only` | `group-data-[disabled=true]/field:opacity-50` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 138 | info | `selector/web-state` | `group-data-[disabled=true]/field:opacity-50` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 154 | warning | `class/web-only` | `group-has-data-horizontal/field:text-balance` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 154 | warning | `class/web-only` | `[[data-variant=legend]+&]:-mt-1.5` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 154 | info | `selector/web-variant` | `group-has-data-horizontal/field:text-balance` | Rewrote shadcn's custom variants (`data-open:`, `data-checked:`, ...) to the attributes Tamagui sets, and `dark:` to Tamagui's dark theme class: on web Tailwind compiles these classes without shadcn's CSS. |  |
| 155 | warning | `class/web-only` | `last:mt-0` | Structural pseudo-classes (`:last-child`) are web-only. |  |
| 155 | warning | `class/web-only` | `nth-last-2:-mt-1` | Structural pseudo-classes are web-only. |  |
| 155 | info | `selector/web-state` | `last:mt-0 nth-last-2:-mt-1` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 156 | warning | `class/web-only` | `[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 156 | info | `selector/web-color` | `[&>a:hover]:text-primary` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 176 | warning | `class/web-only` | `group-data-[variant=outline]/field-group:-mb-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 176 | info | `selector/web-state` | `group-data-[variant=outline]/field-group:-mb-2` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 184 | warning | `class/web-only` | `block` | React Native has no block layout; `display: block` is dropped on native. |  |
| 184 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 220 | warning | `class/web-only` | `list-disc` | List markers are not rendered on native (or by `html.li`). |  |
