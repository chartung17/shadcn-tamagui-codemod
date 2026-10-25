# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **98.2%** |
| Native class coverage | 68.8% |
| TODOs | 1 |
| Warnings | 9 |
| Notes | 11 |
| Classes (supported / web-only / unknown / unsupported) | 33 / 14 / 0 / 1 |
| Constructs (converted / flagged) | 8 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Icons

The converted files import Tamagui-generated icons. Generate them (they need `react-native-svg` and `@tamagui/helpers-icon`):

```sh
npx @tamagui/cli icons add ChevronDownIcon=ChevronDown ChevronUpIcon=ChevronUp
```

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/unsupported` | todo | 1 |
| `class/web-only` | warning | 8 |
| `radix/css-variable` | warning | 1 |
| `selector/rewrite` | info | 3 |
| `selector/web-state` | info | 3 |
| `icon/wrapped` | info | 2 |
| `selector/web-color` | info | 2 |
| `selector/web-variant` | info | 1 |

## shadcn/ui/accordion.tsx

Auto-converted 98.2% · 1 TODO(s) · 9 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 52 | warning | `class/web-only` | `group-aria-expanded/accordion-trigger:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 54 | info | `selector/web-state` | `group-aria-expanded/accordion-trigger:hidden` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 55 | warning | `class/web-only` | `group-aria-expanded/accordion-trigger:inline` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 57 | info | `selector/web-state` | `group-aria-expanded/accordion-trigger:inline` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 77 | warning | `class/web-only` | `not-last:border-b` | `:not()` selectors are web-only. |  |
| 77 | info | `selector/rewrite` | `border-border` | Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
| 77 | info | `selector/web-state` | `not-last:border-b` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 89 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 94 | todo | `class/unsupported` | `focus-visible:after:border-ring` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 94 | warning | `class/web-only` | `transition-all` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 94 | warning | `class/web-only` | `**:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground` | Descendant selectors (`**:`) are web-only. |  |
| 94 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 94 | info | `selector/web-color` | `focus-visible:ring-ring/50 focus-visible:after:border-ring **:data-[slot=accordion-trigger-icon]:text-muted-foreground` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 100 | info | `icon/wrapped` | `pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden!` | Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper. |  |
| 105 | info | `icon/wrapped` | `pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline!` | Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper. |  |
| 131 | warning | `class/web-only` | `data-open:animate-accordion-down data-closed:animate-accordion-up` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 131 | info | `selector/web-variant` | `data-open:animate-accordion-down data-closed:animate-accordion-up` | Rewrote shadcn's custom variants (`data-open:`, `data-checked:`, ...) to the attributes Tamagui sets, and `dark:` to Tamagui's dark theme class: on web Tailwind compiles these classes without shadcn's CSS. |  |
| 136 | warning | `class/web-only` | `h-(--radix-accordion-content-height)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 136 | warning | `class/web-only` | `[&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 136 | warning | `radix/css-variable` | `--radix-accordion-content-height` | Tamagui `Accordion` does not set `--radix-accordion-content-height`, so classes using it fall back to their defaults. |  |
| 136 | info | `selector/web-color` | `[&_a]:hover:text-foreground` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
