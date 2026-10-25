# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 25 |
| Files changed | 25 |
| **Auto-converted** | **98.1%** |
| Native class coverage | 58.9% |
| TODOs | 8 |
| Warnings | 294 |
| Notes | 34 |
| Classes (supported / web-only / unknown / unsupported) | 832 / 552 / 0 / 28 |
| Constructs (converted / flagged) | 162 / 2 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Theme

`converted/tamagui.config.ts` was generated from `original/src/index.css` with 31 theme colors.

- warning: `fonts`: Font families ('Inter Variable', sans-serif) must also be loaded on native (e.g. with expo-font) under the same names.

## Icons

The converted files import Tamagui-generated icons. Generate them (they need `react-native-svg` and `@tamagui/helpers-icon`):

```sh
npx @tamagui/cli icons add BoldIcon=Bold CheckIcon=Check ChevronDownIcon=ChevronDown ChevronRightIcon=ChevronRight ChevronUpIcon=ChevronUp ItalicIcon=Italic MailIcon=Mail PlusIcon=Plus UnderlineIcon=Underline XIcon=X
```

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/unsupported` | todo | 6 |
| `element/unsupported` | todo | 1 |
| `radix/unmapped` | todo | 1 |
| `class/web-only` | warning | 267 |
| `radix/unsupported-prop` | warning | 8 |
| `radix/css-variable` | warning | 7 |
| `radix/caveat` | warning | 6 |
| `cva/kept` | warning | 2 |
| `element/native-caveat` | warning | 2 |
| `class/caveat` | warning | 1 |
| `element/input-type` | warning | 1 |
| `element/view` | info | 13 |
| `selector/rewrite` | info | 11 |
| `icon/wrapped` | info | 5 |
| `cva/kept-as-child` | info | 2 |
| `radix/as-child` | info | 2 |
| `cva/styled` | info | 1 |

## converted/src/App.tsx

Auto-converted 100% · 0 TODO(s) · 0 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 109 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 117 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 131 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 159 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 163 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 168 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 172 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 232 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 260 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |

## converted/src/components/login-form.tsx

Auto-converted 100% · 0 TODO(s) · 4 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 46 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 48 | warning | `element/native-caveat` | `<a>` | Native caveat: native has no navigation for href, target, rel, download or referrerPolicy. |  |
| 50 | warning | `class/web-only` | `inline-block` | React Native has no inline layout. |  |
| 50 | warning | `class/web-only` | `underline-offset-4` | `text-underline-offset` is web-only. |  |
| 63 | warning | `element/native-caveat` | `<a>` | Native caveat: native has no navigation for href, target, rel, download or referrerPolicy. |  |

## converted/src/components/ui/accordion.tsx

Auto-converted 98.2% · 1 TODO(s) · 9 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 40 | warning | `class/web-only` | `not-last:border-b` | `:not()` selectors are web-only. |  |
| 57 | todo | `class/unsupported` | `focus-visible:after:border-ring` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 57 | warning | `class/web-only` | `transition-all` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 57 | warning | `class/web-only` | `**:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground` | Descendant selectors (`**:`) are web-only. |  |
| 57 | warning | `class/web-only` | `group-aria-expanded/accordion-trigger:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 57 | warning | `class/web-only` | `group-aria-expanded/accordion-trigger:inline` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 63 | info | `icon/wrapped` | `pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden` | Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper. |  |
| 67 | info | `icon/wrapped` | `pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline` | Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper. |  |
| 88 | warning | `class/web-only` | `data-open:animate-accordion-down data-closed:animate-accordion-up` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 93 | warning | `class/web-only` | `h-(--radix-accordion-content-height)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 93 | warning | `class/web-only` | `[&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 93 | warning | `radix/css-variable` | `--radix-accordion-content-height` | Tamagui `Accordion` does not set `--radix-accordion-content-height`, so classes using it fall back to their defaults. |  |

## converted/src/components/ui/alert-dialog.tsx

Auto-converted 100% · 0 TODO(s) · 20 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 48 | warning | `class/web-only` | `fixed` | `position: fixed` is dropped on native. | Use `absolute` inside a full-screen container, or a Tamagui overlay/Portal. |
| 48 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 48 | warning | `class/web-only` | `supports-backdrop-filter:backdrop-blur-xs` | `@supports` queries are web-only. |  |
| 48 | warning | `class/web-only` | `data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 70 | warning | `class/web-only` | `fixed` | `position: fixed` is dropped on native. | Use `absolute` inside a full-screen container, or a Tamagui overlay/Portal. |
| 70 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 70 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 70 | warning | `class/web-only` | `data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 87 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 87 | warning | `class/web-only` | `grid-rows-[auto_1fr]` | CSS grid is not available on native. |  |
| 87 | warning | `class/web-only` | `place-items-center` | `place-*` is a grid shorthand; not available on native. |  |
| 87 | warning | `class/web-only` | `has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6` | `:has()` selectors are web-only. |  |
| 87 | warning | `class/web-only` | `sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 103 | warning | `class/web-only` | `group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 119 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 119 | warning | `class/web-only` | `sm:group-data-[size=default]/alert-dialog-content:row-span-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 119 | warning | `class/web-only` | `*:[svg:not([class*='size-'])]:size-8` | Child selectors (`*:`) are web-only. |  |
| 119 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: native drops `inline-flex` and would lay the children out as a column. |  |
| 135 | warning | `class/web-only` | `sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 151 | warning | `class/web-only` | `text-balance md:text-pretty` | `text-wrap` is web-only. |  |
| 151 | warning | `class/web-only` | `*:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground` | Child selectors (`*:`) are web-only. |  |

## converted/src/components/ui/avatar.tsx

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

## converted/src/components/ui/badge.tsx

Auto-converted 100% · 0 TODO(s) · 12 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 6 | info | `cva/kept-as-child` | `badgeVariants = cva(...)` | Kept as cva(): the component supports `asChild`, and Tamagui's `asChild` does not forward `styled()` styles. Its classes still apply at runtime through className. |  |
| 7 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 7 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 7 | warning | `class/web-only` | `whitespace-nowrap` | `white-space` is not supported on native. | Use `line-clamp-*` to limit lines on native. |
| 7 | warning | `class/web-only` | `transition-all` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 7 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5` | `:has()` selectors are web-only. |  |
| 7 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 7 | warning | `class/web-only` | `[&>svg]:pointer-events-none [&>svg]:size-3!` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 7 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: native drops `inline-flex` and would lay the children out as a column. |  |
| 11 | warning | `class/web-only` | `[a]:hover:bg-primary/80` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 13 | warning | `class/web-only` | `[a]:hover:bg-secondary/80` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 15 | warning | `class/web-only` | `[a]:hover:bg-destructive/20` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 17 | warning | `class/web-only` | `[a]:hover:bg-muted [a]:hover:text-muted-foreground` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 20 | warning | `class/web-only` | `underline-offset-4` | `text-underline-offset` is web-only. |  |
| 37 | info | `radix/as-child` | `asChild ? Slot : html.span` | Radix `Slot` replaced with Tamagui's `asChild` on `html.span`. |  |

## converted/src/components/ui/button.tsx

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
| 7 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: native drops `inline-flex` and would lay the children out as a column. |  |
| 13 | warning | `class/web-only` | `aria-expanded:bg-muted aria-expanded:text-foreground` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 15 | warning | `class/web-only` | `hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 15 | warning | `class/web-only` | `aria-expanded:bg-secondary aria-expanded:text-secondary-foreground` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 17 | warning | `class/web-only` | `aria-expanded:bg-muted aria-expanded:text-foreground` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 20 | warning | `class/web-only` | `underline-offset-4` | `text-underline-offset` is web-only. |  |
| 24 | warning | `class/web-only` | `in-data-[slot=button-group]:rounded-md` | `in-*` (ancestor) selectors are web-only. |  |
| 24 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2` | `:has()` selectors are web-only. |  |
| 25 | warning | `class/web-only` | `rounded-[min(var(--radius-md),8px)]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 25 | warning | `class/web-only` | `in-data-[slot=button-group]:rounded-md` | `in-*` (ancestor) selectors are web-only. |  |
| 25 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5` | `:has()` selectors are web-only. |  |
| 25 | warning | `class/web-only` | `[&_svg:not([class*='size-'])]:size-3` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 26 | warning | `class/web-only` | `rounded-[min(var(--radius-md),10px)]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 26 | warning | `class/web-only` | `in-data-[slot=button-group]:rounded-md` | `in-*` (ancestor) selectors are web-only. |  |
| 26 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5` | `:has()` selectors are web-only. |  |
| 27 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2` | `:has()` selectors are web-only. |  |
| 30 | warning | `class/web-only` | `rounded-[min(var(--radius-md),8px)]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 30 | warning | `class/web-only` | `in-data-[slot=button-group]:rounded-md` | `in-*` (ancestor) selectors are web-only. |  |
| 30 | warning | `class/web-only` | `[&_svg:not([class*='size-'])]:size-3` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 32 | warning | `class/web-only` | `rounded-[min(var(--radius-md),10px)]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 32 | warning | `class/web-only` | `in-data-[slot=button-group]:rounded-md` | `in-*` (ancestor) selectors are web-only. |  |
| 54 | info | `radix/as-child` | `asChild ? Slot : html.button` | Radix `Slot` replaced with Tamagui's `asChild` on `html.button`. |  |

## converted/src/components/ui/card.tsx

Auto-converted 100% · 0 TODO(s) · 16 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 15 | warning | `class/web-only` | `gap-(--card-spacing) py-(--card-spacing)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 15 | warning | `class/web-only` | `[--card-spacing:--spacing(6)]` | Arbitrary CSS properties (`[prop:value]`) pass through to CSS on web and are dropped on native. |  |
| 15 | warning | `class/web-only` | `has-[>img:first-child]:pt-0` | `:has()` selectors are web-only. |  |
| 15 | warning | `class/web-only` | `data-[size=sm]:[--card-spacing:--spacing(4)]` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 15 | warning | `class/web-only` | `*:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl` | Child selectors (`*:`) are web-only. |  |
| 31 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 31 | warning | `class/web-only` | `auto-rows-min` | CSS grid is not available on native. |  |
| 31 | warning | `class/web-only` | `px-(--card-spacing)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 31 | warning | `class/web-only` | `has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]` | `:has()` selectors are web-only. |  |
| 31 | warning | `class/web-only` | `[.border-b]:pb-(--card-spacing)` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 47 | warning | `class/web-only` | `group-data-[size=sm]/card:text-sm` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 76 | warning | `class/web-only` | `col-start-2 row-span-2 row-start-1` | CSS grid is not available on native. |  |
| 76 | warning | `class/web-only` | `justify-self-end` | `justify-self` applies to grid; not available on native. |  |
| 91 | warning | `class/web-only` | `px-(--card-spacing)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 105 | warning | `class/web-only` | `px-(--card-spacing)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 105 | warning | `class/web-only` | `[.border-t]:pt-(--card-spacing)` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |

## converted/src/components/ui/checkbox.tsx

Auto-converted 93.2% · 1 TODO(s) · 11 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 24 | todo | `class/unsupported` | `after:absolute after:-inset-x-3 after:-inset-y-2` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 24 | warning | `class/web-only` | `peer` | `peer` markers drive sibling selectors, which native does not have. |  |
| 24 | warning | `class/web-only` | `transition-shadow` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 24 | warning | `class/web-only` | `group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input group-has-[:focus-visible]/field-label:data-checked:border-primary` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 24 | warning | `class/web-only` | `disabled:cursor-not-allowed` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 24 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 24 | warning | `class/web-only` | `data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 31 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 31 | warning | `class/web-only` | `place-content-center` | `place-*` is a grid shorthand; not available on native. |  |
| 31 | warning | `class/web-only` | `text-current` | `currentColor` and `inherit` are not resolved on native. | Use a theme color such as `foreground`. |
| 31 | warning | `class/web-only` | `transition-none` | CSS transitions are web-only. |  |
| 31 | warning | `class/web-only` | `[&>svg]:size-3.5` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |

## converted/src/components/ui/dialog.tsx

Auto-converted 100% · 0 TODO(s) · 10 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 50 | warning | `class/web-only` | `fixed` | `position: fixed` is dropped on native. | Use `absolute` inside a full-screen container, or a Tamagui overlay/Portal. |
| 50 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 50 | warning | `class/web-only` | `supports-backdrop-filter:backdrop-blur-xs` | `@supports` queries are web-only. |  |
| 50 | warning | `class/web-only` | `data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 75 | warning | `class/web-only` | `fixed` | `position: fixed` is dropped on native. | Use `absolute` inside a full-screen container, or a Tamagui overlay/Portal. |
| 75 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 75 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 75 | warning | `class/web-only` | `data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 89 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 159 | warning | `class/web-only` | `*:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground` | Child selectors (`*:`) are web-only. |  |

## converted/src/components/ui/dropdown-menu.tsx

Auto-converted 100% · 0 TODO(s) · 29 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 4 | warning | `radix/caveat` | `Menu` | Tamagui Menu highlights items with `focus:` (shadcn already uses it); Radix `data-highlighted` and `data-side` attributes are not set. |  |
| 4 | warning | `radix/caveat` | `Menu` | On native, Tamagui Menu renders a popover by default; platform-native menus need the Expo UI or Zeego adapter (see the Tamagui Menu docs). |  |
| 57 | warning | `radix/unsupported-prop` | `DropdownMenu.Content sideOffset` | Removed `sideOffset`: Tamagui positions this content from the root (`placement`, `offset`, `allowFlip`, `stayInFrame` on the root component). |  |
| 57 | warning | `radix/unsupported-prop` | `DropdownMenu.Content align` | Removed `align`: Tamagui positions this content from the root (`placement`, `offset`, `allowFlip`, `stayInFrame` on the root component). |  |
| 60 | warning | `class/web-only` | `max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) origin-(--radix-dropdown-menu-content-transform-origin)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 60 | warning | `class/web-only` | `overflow-x-hidden` | `overflow-x` is not supported on native. | Use a horizontal ScrollView. |
| 60 | warning | `class/web-only` | `overflow-y-auto` | `overflow-y` is not supported on native. | Use a ScrollView. |
| 60 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 60 | warning | `class/web-only` | `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:overflow-hidden data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 95 | warning | `class/web-only` | `cursor-default` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 95 | warning | `class/web-only` | `not-data-[variant=destructive]:focus:**:text-accent-foreground` | `:not()` selectors are web-only. |  |
| 95 | warning | `class/web-only` | `data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 data-[variant=destructive]:*:[svg]:text-destructive` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 95 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 120 | warning | `class/web-only` | `cursor-default` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 120 | warning | `class/web-only` | `focus:**:text-accent-foreground` | Descendant selectors (`**:`) are web-only. |  |
| 120 | warning | `class/web-only` | `data-inset:pl-8 data-disabled:pointer-events-none data-disabled:opacity-50` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 120 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 126 | info | `element/view` | `<span>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 166 | warning | `class/web-only` | `cursor-default` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 166 | warning | `class/web-only` | `focus:**:text-accent-foreground` | Descendant selectors (`**:`) are web-only. |  |
| 166 | warning | `class/web-only` | `data-inset:pl-8 data-disabled:pointer-events-none data-disabled:opacity-50` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 166 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 171 | info | `element/view` | `<span>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 196 | warning | `class/web-only` | `data-inset:pl-8` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 255 | warning | `class/web-only` | `cursor-default` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 255 | warning | `class/web-only` | `not-data-[variant=destructive]:focus:**:text-accent-foreground` | `:not()` selectors are web-only. |  |
| 255 | warning | `class/web-only` | `data-inset:pl-8 data-open:bg-accent data-open:text-accent-foreground` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 255 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 261 | info | `icon/wrapped` | `ml-auto` | Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper. |  |
| 276 | warning | `class/web-only` | `origin-(--radix-dropdown-menu-content-transform-origin)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 276 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 276 | warning | `class/web-only` | `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |

## converted/src/components/ui/field.tsx

Auto-converted 99.2% · 1 TODO(s) · 30 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 17 | warning | `class/web-only` | `has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3` | `:has()` selectors are web-only. |  |
| 31 | todo | `element/unsupported` | `<legend>` | `<legend>` has no `html.*` equivalent, so it renders on web only. | Replace it with a supported `html.*` element or a Tamagui component, or keep it web-only in a `.web.tsx` file. |
| 36 | warning | `class/web-only` | `data-[variant=label]:text-sm data-[variant=legend]:text-base` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 52 | warning | `class/web-only` | `data-[slot=checkbox-group]:gap-3` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 52 | warning | `class/web-only` | `*:data-[slot=field-group]:gap-4` | Child selectors (`*:`) are web-only. |  |
| 60 | info | `cva/styled` | `fieldVariants = cva(...)` | Converted to `FieldFrame = styled(html.div, ...)` with the same variants. |  |
| 62 | warning | `class/web-only` | `data-[invalid=true]:text-destructive` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 66 | warning | `class/web-only` | `*:w-full` | Child selectors (`*:`) are web-only. |  |
| 66 | warning | `class/web-only` | `[&>.sr-only]:w-auto` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 68 | warning | `class/web-only` | `has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px` | `:has()` selectors are web-only. |  |
| 68 | warning | `class/web-only` | `*:data-[slot=field-label]:flex-auto` | Child selectors (`*:`) are web-only. |  |
| 70 | warning | `class/caveat` | `@md/field-group:flex-row @md/field-group:items-center` | Tamagui resolves `@<size>:` container queries against the media query of that name (e.g. `@md` is 768px), while Tailwind's container sizes are smaller (`@md` is 28rem); check the breakpoint. |  |
| 70 | warning | `class/web-only` | `*:w-full @md/field-group:*:w-auto @md/field-group:*:data-[slot=field-label]:flex-auto` | Child selectors (`*:`) are web-only. |  |
| 70 | warning | `class/web-only` | `@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px` | `:has()` selectors are web-only. |  |
| 70 | warning | `class/web-only` | `[&>.sr-only]:w-auto` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 121 | warning | `class/web-only` | `peer/field-label` | `peer` markers drive sibling selectors, which native does not have. |  |
| 121 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 121 | warning | `class/web-only` | `group-data-[disabled=true]/field:opacity-50` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 121 | warning | `class/web-only` | `has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-muted/50 has-[>[data-slot=field]]:has-[:focus-visible]:border-ring has-[>[data-slot=field]]:has-[:focus-visible]:ring-3 has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/50 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10` | `:has()` selectors are web-only. |  |
| 121 | warning | `class/web-only` | `*:data-[slot=field]:p-3` | Child selectors (`*:`) are web-only. |  |
| 122 | warning | `class/web-only` | `has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col` | `:has()` selectors are web-only. |  |
| 138 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 138 | warning | `class/web-only` | `group-data-[disabled=true]/field:opacity-50` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 154 | warning | `class/web-only` | `group-has-data-horizontal/field:text-balance` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 154 | warning | `class/web-only` | `[[data-variant=legend]+&]:-mt-1.5` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 155 | warning | `class/web-only` | `last:mt-0` | Structural pseudo-classes (`:last-child`) are web-only. |  |
| 155 | warning | `class/web-only` | `nth-last-2:-mt-1` | Structural pseudo-classes are web-only. |  |
| 156 | warning | `class/web-only` | `[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 176 | warning | `class/web-only` | `group-data-[variant=outline]/field-group:-mb-2` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 184 | warning | `class/web-only` | `block` | React Native has no block layout; `display: block` is dropped on native. |  |
| 184 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 220 | warning | `class/web-only` | `list-disc` | List markers are not rendered on native (or by `html.li`). |  |

## converted/src/components/ui/input.tsx

Auto-converted 100% · 0 TODO(s) · 6 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 11 | warning | `element/input-type` | `<input type={...}>` | `html.input` renders a TextInput on native; only email, number, password, search, tel, text, url types work there. |  |
| 15 | warning | `class/web-only` | `transition-[color,box-shadow]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 15 | warning | `class/web-only` | `file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground` | `file:` styles the file selector button, which native does not have. |  |
| 15 | warning | `class/web-only` | `placeholder:text-muted-foreground` | The `placeholder:` variant styles `::placeholder`, which native does not have. | Use the `placeholder-<color>` utility, which maps to `placeholderTextColor` on native. |
| 15 | warning | `class/web-only` | `disabled:cursor-not-allowed` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 15 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 15 | info | `selector/rewrite` | `placeholder-muted-foreground` | Added `placeholder-*`, which maps to `placeholderTextColor` on native. |  |

## converted/src/components/ui/label.tsx

Auto-converted 100% · 0 TODO(s) · 2 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 20 | warning | `class/web-only` | `group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 20 | warning | `class/web-only` | `peer-disabled:cursor-not-allowed peer-disabled:opacity-50` | `peer-*` variants use sibling selectors, which native does not have. |  |

## converted/src/components/ui/popover.tsx

Auto-converted 100% · 0 TODO(s) · 7 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 4 | warning | `radix/caveat` | `Popover` | Tamagui Popover sets `data-placement` instead of Radix `data-side`/`data-align`, so `data-[side=...]:` classes no longer match. |  |
| 19 | warning | `radix/unsupported-prop` | `Popover.Content align` | Removed `align`: Tamagui positions this content from the root (`placement`, `offset`, `allowFlip`, `stayInFrame` on the root component). |  |
| 19 | warning | `radix/unsupported-prop` | `Popover.Content sideOffset` | Removed `sideOffset`: Tamagui positions this content from the root (`placement`, `offset`, `allowFlip`, `stayInFrame` on the root component). |  |
| 22 | warning | `class/web-only` | `origin-(--radix-popover-content-transform-origin)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 22 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 22 | warning | `class/web-only` | `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 35 | warning | `radix/css-variable` | `--radix-popover-content-transform-origin` | Tamagui `Popover` does not set `--radix-popover-content-transform-origin`, so classes using it fall back to their defaults. |  |

## converted/src/components/ui/radio-group.tsx

Auto-converted 94.2% · 1 TODO(s) · 6 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 21 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 36 | todo | `class/unsupported` | `after:absolute after:-inset-x-3 after:-inset-y-2` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 36 | warning | `class/web-only` | `peer` | `peer` markers drive sibling selectors, which native does not have. |  |
| 36 | warning | `class/web-only` | `group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input group-has-[:focus-visible]/field-label:data-checked:border-primary` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 36 | warning | `class/web-only` | `disabled:cursor-not-allowed` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 36 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 36 | warning | `class/web-only` | `data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |

## converted/src/components/ui/select.tsx

Auto-converted 100% · 0 TODO(s) · 32 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 6 | warning | `radix/caveat` | `Select` | On native, Tamagui Select renders its items inline unless an `Adapt` target (e.g. a Sheet) is active; add `<Select.Adapt>` for a native picker experience. |  |
| 35 | warning | `class/web-only` | `scroll-my-1` | Scroll snapping/margins are web-only. |  |
| 60 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 60 | warning | `class/web-only` | `whitespace-nowrap` | `white-space` is not supported on native. | Use `line-clamp-*` to limit lines on native. |
| 60 | warning | `class/web-only` | `transition-[color,box-shadow]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 60 | warning | `class/web-only` | `disabled:cursor-not-allowed` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 60 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 60 | warning | `class/web-only` | `data-placeholder:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 60 | warning | `class/web-only` | `*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5` | Child selectors (`*:`) are web-only. |  |
| 60 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 60 | warning | `class/web-only` | `max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 60 | warning | `class/web-only` | `overflow-x-hidden` | `overflow-x` is not supported on native. | Use a horizontal ScrollView. |
| 60 | warning | `class/web-only` | `overflow-y-auto` | `overflow-y` is not supported on native. | Use a ScrollView. |
| 60 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 60 | warning | `class/web-only` | `data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 67 | info | `icon/wrapped` | `pointer-events-none` | Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper. |  |
| 68 | warning | `radix/unsupported-prop` | `Select.Content position` | Removed `position`: Tamagui Select always renders a floating list (or an adapted Sheet). |  |
| 68 | warning | `radix/unsupported-prop` | `Select.Content align` | Removed `align`: Tamagui positions this content from the root (`placement`, `offset`, `allowFlip`, `stayInFrame` on the root component). |  |
| 82 | warning | `class/web-only` | `data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 94 | warning | `radix/css-variable` | `--radix-select-content-available-height` | Tamagui `Select` does not set `--radix-select-content-available-height`, so classes using it fall back to their defaults. |  |
| 94 | warning | `radix/css-variable` | `--radix-select-content-transform-origin` | Tamagui `Select` does not set `--radix-select-content-transform-origin`, so classes using it fall back to their defaults. |  |
| 94 | warning | `class/web-only` | `data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 105 | warning | `radix/css-variable` | `--radix-select-trigger-width` | Tamagui `Select` does not set `--radix-select-trigger-width`, so classes using it fall back to their defaults. |  |
| 105 | warning | `radix/css-variable` | `--radix-select-trigger-height` | Tamagui `Select` does not set `--radix-select-trigger-height`, so classes using it fall back to their defaults. |  |
| 138 | warning | `class/web-only` | `cursor-default` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 138 | warning | `class/web-only` | `not-data-[variant=destructive]:focus:**:text-accent-foreground` | `:not()` selectors are web-only. |  |
| 138 | warning | `class/web-only` | `data-disabled:pointer-events-none data-disabled:opacity-50` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 138 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 138 | warning | `class/web-only` | `*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2` | Child selectors (`*:`) are web-only. |  |
| 143 | info | `element/view` | `<span>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 144 | info | `icon/wrapped` | `pointer-events-none` | Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper. |  |
| 176 | warning | `class/web-only` | `cursor-default` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 176 | warning | `class/web-only` | `[&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 194 | warning | `class/web-only` | `cursor-default` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 194 | warning | `class/web-only` | `[&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |

## converted/src/components/ui/separator.tsx

Auto-converted 100% · 0 TODO(s) · 2 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 24 | warning | `radix/unsupported-prop` | `Separator.Root decorative` | Removed `decorative`: Tamagui Separator has no `decorative` option (it always renders `role="separator"`). |  |
| 29 | warning | `class/web-only` | `data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |

## converted/src/components/ui/slider.tsx

Auto-converted 100% · 0 TODO(s) · 6 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 43 | warning | `class/web-only` | `touch-none` | `touch-action` is web-only. |  |
| 43 | warning | `class/web-only` | `data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 50 | warning | `class/web-only` | `data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 54 | warning | `class/web-only` | `data-horizontal:h-full data-vertical:w-full` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 61 | warning | `class/web-only` | `block` | React Native has no block layout; `display: block` is dropped on native. |  |
| 61 | warning | `class/web-only` | `transition-[color,box-shadow]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |

## converted/src/components/ui/switch.tsx

Auto-converted 94% · 1 TODO(s) · 10 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 28 | todo | `class/unsupported` | `after:absolute after:-inset-x-3 after:-inset-y-2` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 28 | warning | `class/web-only` | `peer` | `peer` markers drive sibling selectors, which native does not have. |  |
| 28 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 28 | warning | `class/web-only` | `transition-all` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 28 | warning | `class/web-only` | `group-has-[:focus-visible]/field-label:border-transparent group-has-[:focus-visible]/field-label:ring-0` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 28 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 28 | warning | `class/web-only` | `data-[size=default]:h-[18.4px] data-[size=default]:w-[32px] data-[size=sm]:h-[14px] data-[size=sm]:w-[24px] data-checked:bg-primary data-unchecked:bg-input dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 28 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: native drops `inline-flex` and would lay the children out as a column. |  |
| 35 | warning | `class/web-only` | `block` | React Native has no block layout; `display: block` is dropped on native. |  |
| 35 | warning | `class/web-only` | `transition-transform` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 35 | warning | `class/web-only` | `group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 35 | warning | `class/web-only` | `dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |

## converted/src/components/ui/tabs.tsx

Auto-converted 86.6% · 1 TODO(s) · 14 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 26 | warning | `class/web-only` | `data-horizontal:flex-col` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 34 | warning | `cva/kept` | `tabsListVariants = cva(...)` | Kept as cva(): it is exported, so other modules may call it for class strings. Its classes still apply at runtime through className. | Convert it to `styled()` from `@tamagui/tailwind` by hand if it can be simplified. |
| 35 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 35 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 35 | warning | `class/web-only` | `group-data-horizontal/tabs:h-9 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 35 | warning | `class/web-only` | `data-[variant=line]:rounded-none` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 35 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: native drops `inline-flex` and would lay the children out as a column. |  |
| 74 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 74 | warning | `class/web-only` | `whitespace-nowrap` | `white-space` is not supported on native. | Use `line-clamp-*` to limit lines on native. |
| 74 | warning | `class/web-only` | `transition-all` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 74 | warning | `class/web-only` | `group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 74 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5` | `:has()` selectors are web-only. |  |
| 74 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 74 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: native drops `inline-flex` and would lay the children out as a column. |  |
| 75 | warning | `class/web-only` | `group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 76 | warning | `class/web-only` | `data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 77 | todo | `class/unsupported` | `after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |

## converted/src/components/ui/textarea.tsx

Auto-converted 100% · 0 TODO(s) · 5 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 13 | warning | `class/web-only` | `field-sizing-content` | `field-sizing` is web-only. |  |
| 13 | warning | `class/web-only` | `transition-[color,box-shadow]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 13 | warning | `class/web-only` | `placeholder:text-muted-foreground` | The `placeholder:` variant styles `::placeholder`, which native does not have. | Use the `placeholder-<color>` utility, which maps to `placeholderTextColor` on native. |
| 13 | warning | `class/web-only` | `disabled:cursor-not-allowed` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 13 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 13 | info | `selector/rewrite` | `placeholder-muted-foreground` | Added `placeholder-*`, which maps to `placeholderTextColor` on native. |  |

## converted/src/components/ui/toggle-group.tsx

Auto-converted 100% · 0 TODO(s) · 5 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 54 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 54 | warning | `class/web-only` | `gap-[--spacing(var(--gap))]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 54 | warning | `class/web-only` | `data-[spacing=0]:data-[variant=outline]:shadow-xs data-vertical:flex-col data-vertical:items-stretch` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 85 | warning | `class/web-only` | `group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-[spacing=0]/toggle-group:shadow-none group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-md group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-md group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-md group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-md group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 85 | warning | `class/web-only` | `data-[state=on]:bg-muted` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |

## converted/src/components/ui/toggle.tsx

Auto-converted 97.9% · 1 TODO(s) · 9 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 7 | todo | `radix/unmapped` | `Toggle (TogglePrimitive)` | There is no Tamagui mapping for Radix `Toggle` yet, so it stays on Radix, which is web-only. | Rebuild it from Tamagui primitives, or keep this component web-only in a `.web.tsx` file. |
| 9 | warning | `cva/kept` | `toggleVariants = cva(...)` | Kept as cva(): it is exported, so other modules may call it for class strings. Its classes still apply at runtime through className. | Convert it to `styled()` from `@tamagui/tailwind` by hand if it can be simplified. |
| 10 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 10 | warning | `class/web-only` | `whitespace-nowrap` | `white-space` is not supported on native. | Use `line-clamp-*` to limit lines on native. |
| 10 | warning | `class/web-only` | `transition-[color,box-shadow]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 10 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 10 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 10 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: native drops `inline-flex` and would lay the children out as a column. |  |
| 19 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2` | `:has()` selectors are web-only. |  |
| 20 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5` | `:has()` selectors are web-only. |  |
| 21 | warning | `class/web-only` | `has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2` | `:has()` selectors are web-only. |  |

## converted/src/components/ui/tooltip.tsx

Auto-converted 100% · 0 TODO(s) · 10 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 5 | warning | `radix/caveat` | `Tooltip` | Tamagui Tooltip does not render on native; there it only provides accessibility output. |  |
| 5 | warning | `radix/caveat` | `Tooltip` | Tamagui Tooltip sets `data-placement` instead of Radix `data-side`, so `data-[side=...]:` classes no longer match. |  |
| 34 | warning | `radix/unsupported-prop` | `Tooltip.Content sideOffset` | Removed `sideOffset`: Tamagui positions this content from the root (`placement`, `offset`, `allowFlip`, `stayInFrame` on the root component). |  |
| 36 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 36 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 36 | warning | `class/web-only` | `origin-(--radix-tooltip-content-transform-origin)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 36 | warning | `class/web-only` | `has-data-[slot=kbd]:pr-1.5` | `:has()` selectors are web-only. |  |
| 36 | warning | `class/web-only` | `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 36 | warning | `class/web-only` | `**:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm` | Descendant selectors (`**:`) are web-only. |  |
| 36 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: native drops `inline-flex` and would lay the children out as a column. |  |
| 52 | warning | `radix/css-variable` | `--radix-tooltip-content-transform-origin` | Tamagui `Tooltip` does not set `--radix-tooltip-content-transform-origin`, so classes using it fall back to their defaults. |  |
