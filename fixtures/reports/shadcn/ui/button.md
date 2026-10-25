# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 59.6% |
| TODOs | 0 |
| Warnings | 27 |
| Notes | 15 |
| Classes (supported / web-only / unknown / unsupported) | 59 / 40 / 0 / 0 |
| Constructs (converted / flagged) | 2 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 27 |
| `selector/web-state` | info | 7 |
| `selector/web-color` | info | 5 |
| `cva/kept-as-child` | info | 1 |
| `radix/as-child` | info | 1 |
| `selector/rewrite` | info | 1 |

## shadcn/ui/button.tsx

Auto-converted 100% · 0 TODO(s) · 27 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 6 | info | `cva/kept-as-child` | `buttonVariants = cva(...)` | Kept as cva(): the component supports `asChild`, and Tamagui's `asChild` does not forward `styled()` styles. Its classes still apply at runtime through className. |  |
| 7 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 7 | warning | `class/web-only` | `bg-clip-padding` | `background-clip` is web-only. |  |
| 7 | warning | `class/web-only` | `whitespace-nowrap` | `white-space` is not supported on native. | Use `line-clamp-*` to limit lines on native. |
| 7 | warning | `class/web-only` | `transition-all` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 7 | warning | `class/web-only` | `active:not-aria-[haspopup]:translate-y-px` | `:not()` selectors are web-only. |  |
| 7 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 7 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 7 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 7 | info | `selector/web-color` | `focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 7 | info | `selector/web-state` | `active:not-aria-[haspopup]:translate-y-px aria-invalid:ring-3` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 13 | warning | `class/web-only` | `aria-expanded:bg-muted aria-expanded:text-foreground` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 13 | info | `selector/web-color` | `aria-expanded:bg-muted aria-expanded:text-foreground` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 15 | warning | `class/web-only` | `hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 15 | warning | `class/web-only` | `aria-expanded:bg-secondary aria-expanded:text-secondary-foreground` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 15 | info | `selector/web-color` | `aria-expanded:bg-secondary aria-expanded:text-secondary-foreground` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 17 | warning | `class/web-only` | `aria-expanded:bg-muted aria-expanded:text-foreground` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 17 | info | `selector/web-color` | `aria-expanded:bg-muted aria-expanded:text-foreground` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 19 | info | `selector/web-color` | `focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 20 | warning | `class/web-only` | `underline-offset-4` | `text-underline-offset` is web-only. |  |
| 24 | warning | `class/web-only` | `in-data-[slot=button-group]:rounded-md` | `in-*` (ancestor) selectors are web-only. |  |
| 24 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2` | `:has()` selectors are web-only. |  |
| 24 | info | `selector/web-state` | `in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 25 | warning | `class/web-only` | `rounded-[min(var(--radius-md),8px)]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 25 | warning | `class/web-only` | `in-data-[slot=button-group]:rounded-md` | `in-*` (ancestor) selectors are web-only. |  |
| 25 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5` | `:has()` selectors are web-only. |  |
| 25 | warning | `class/web-only` | `[&_svg:not([class*='size-'])]:size-3` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 25 | info | `selector/web-state` | `in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 26 | warning | `class/web-only` | `rounded-[min(var(--radius-md),10px)]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 26 | warning | `class/web-only` | `in-data-[slot=button-group]:rounded-md` | `in-*` (ancestor) selectors are web-only. |  |
| 26 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5` | `:has()` selectors are web-only. |  |
| 26 | info | `selector/web-state` | `in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 27 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2` | `:has()` selectors are web-only. |  |
| 27 | info | `selector/web-state` | `has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 30 | warning | `class/web-only` | `rounded-[min(var(--radius-md),8px)]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 30 | warning | `class/web-only` | `in-data-[slot=button-group]:rounded-md` | `in-*` (ancestor) selectors are web-only. |  |
| 30 | warning | `class/web-only` | `[&_svg:not([class*='size-'])]:size-3` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 30 | info | `selector/web-state` | `in-data-[slot=button-group]:rounded-md` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 32 | warning | `class/web-only` | `rounded-[min(var(--radius-md),10px)]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 32 | warning | `class/web-only` | `in-data-[slot=button-group]:rounded-md` | `in-*` (ancestor) selectors are web-only. |  |
| 32 | info | `selector/web-state` | `in-data-[slot=button-group]:rounded-md` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 54 | info | `radix/as-child` | `asChild ? Slot : html.button` | Radix `Slot` replaced with Tamagui's `asChild` on `html.button`. |  |
