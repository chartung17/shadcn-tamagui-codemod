# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **96.7%** |
| Native class coverage | 62.5% |
| TODOs | 4 |
| Warnings | 67 |
| Notes | 45 |
| Classes (supported / web-only / unknown / unsupported) | 210 / 114 / 0 / 12 |
| Constructs (converted / flagged) | 32 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Icons

The converted files import Tamagui-generated icons. Generate them (they need `react-native-svg` and `@tamagui/helpers-icon`):

```sh
npx @tamagui/cli icons add PanelLeftIcon=PanelLeft
```

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/unsupported` | todo | 4 |
| `class/web-only` | warning | 67 |
| `selector/web-state` | info | 21 |
| `selector/web-color` | info | 11 |
| `selector/rewrite` | info | 6 |
| `radix/as-child` | info | 5 |
| `cva/kept-as-child` | info | 1 |
| `selector/web-variant` | info | 1 |

## shadcn/ui/sidebar.tsx

Auto-converted 96.7% · 4 TODO(s) · 67 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 138 | warning | `class/web-only` | `has-data-[variant=inset]:bg-sidebar` | `:has()` selectors are web-only. |  |
| 138 | info | `selector/web-color` | `has-data-[variant=inset]:bg-sidebar` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 169 | warning | `class/web-only` | `w-(--sidebar-width)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 187 | warning | `class/web-only` | `w-(--sidebar-width)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 187 | warning | `class/web-only` | `[&>button]:hidden` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 195 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 209 | warning | `class/web-only` | `peer` | `peer` markers drive sibling selectors, which native does not have. |  |
| 209 | warning | `class/web-only` | `md:block` | React Native has no block layout; `display: block` is dropped on native. |  |
| 220 | warning | `class/web-only` | `w-(--sidebar-width)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 220 | warning | `class/web-only` | `transition-[width]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 220 | warning | `class/web-only` | `duration-200 ease-linear` | CSS transitions are web-only. |  |
| 221 | warning | `class/web-only` | `group-data-[collapsible=offcanvas]:w-0` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 221 | info | `selector/web-state` | `group-data-[collapsible=offcanvas]:w-0` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 222 | warning | `class/web-only` | `group-data-[side=right]:rotate-180` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 222 | info | `selector/web-state` | `group-data-[side=right]:rotate-180` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 224 | warning | `class/web-only` | `group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 224 | info | `selector/web-state` | `group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 225 | warning | `class/web-only` | `group-data-[collapsible=icon]:w-(--sidebar-width-icon)` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 225 | info | `selector/web-state` | `group-data-[collapsible=icon]:w-(--sidebar-width-icon)` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 232 | warning | `class/web-only` | `fixed` | `position: fixed` is dropped on native. | Use `absolute` inside a full-screen container, or a Tamagui overlay/Portal. |
| 232 | warning | `class/web-only` | `w-(--sidebar-width)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 232 | warning | `class/web-only` | `transition-[left,right,width]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 232 | warning | `class/web-only` | `duration-200 ease-linear` | CSS transitions are web-only. |  |
| 232 | warning | `class/web-only` | `data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 232 | info | `selector/web-state` | `data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 235 | warning | `class/web-only` | `group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 235 | info | `selector/web-state` | `group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 236 | warning | `class/web-only` | `group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 236 | info | `selector/rewrite` | `border-border` | Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
| 236 | info | `selector/web-state` | `group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 244 | warning | `class/web-only` | `group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 244 | info | `selector/web-color` | `group-data-[variant=floating]:ring-sidebar-border` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 244 | info | `selector/web-state` | `group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 274 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 296 | todo | `class/unsupported` | `after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 296 | warning | `class/web-only` | `transition-all` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 296 | warning | `class/web-only` | `ease-linear` | CSS transitions are web-only. |  |
| 296 | warning | `class/web-only` | `group-data-[side=left]:-right-4 group-data-[side=right]:left-0` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 296 | warning | `class/web-only` | `ltr:-translate-x-1/2` | `ltr:` uses a `[dir]` selector, which is web-only. |  |
| 296 | warning | `class/web-only` | `rtl:-translate-x-1/2` | `rtl:` uses a `[dir]` selector, which is web-only. |  |
| 296 | info | `selector/web-color` | `hover:after:bg-sidebar-border` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 296 | info | `selector/web-state` | `group-data-[side=left]:-right-4 group-data-[side=right]:left-0 ltr:-translate-x-1/2 rtl:-translate-x-1/2` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 297 | warning | `class/web-only` | `in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize` | `in-*` (ancestor) selectors are web-only. |  |
| 297 | info | `selector/web-state` | `in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 298 | warning | `class/web-only` | `[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 299 | todo | `class/unsupported` | `group-data-[collapsible=offcanvas]:after:left-full` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 299 | warning | `class/web-only` | `group-data-[collapsible=offcanvas]:translate-x-0 hover:group-data-[collapsible=offcanvas]:bg-sidebar` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 299 | info | `selector/web-color` | `hover:group-data-[collapsible=offcanvas]:bg-sidebar` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 299 | info | `selector/web-state` | `group-data-[collapsible=offcanvas]:translate-x-0` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 300 | warning | `class/web-only` | `[[data-side=left][data-collapsible=offcanvas]_&]:-right-2` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 301 | warning | `class/web-only` | `[[data-side=right][data-collapsible=offcanvas]_&]:-left-2` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 317 | warning | `class/web-only` | `md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2` | `peer-*` variants use sibling selectors, which native does not have. |  |
| 317 | info | `selector/web-state` | `md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 390 | warning | `class/web-only` | `no-scrollbar` | Scrollbar styling is web-only. |  |
| 390 | warning | `class/web-only` | `overflow-auto` | `overflow: auto` is dropped on native; views do not scroll. | Wrap scrollable content in a ScrollView. |
| 390 | warning | `class/web-only` | `group-data-[collapsible=icon]:overflow-hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 390 | info | `selector/web-state` | `group-data-[collapsible=icon]:overflow-hidden` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 418 | info | `radix/as-child` | `asChild ? Slot : html.div` | Radix `Slot` replaced with Tamagui's `asChild` on `html.div`. |  |
| 422 | warning | `class/web-only` | `transition-[margin,opacity]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 422 | warning | `class/web-only` | `duration-200 ease-linear` | CSS transitions are web-only. |  |
| 422 | warning | `class/web-only` | `group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 422 | warning | `class/web-only` | `[&>svg]:size-4 [&>svg]:shrink-0` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 422 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 422 | info | `selector/web-color` | `ring-sidebar-ring` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 422 | info | `selector/web-state` | `group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 437 | info | `radix/as-child` | `asChild ? Slot : html.button` | Radix `Slot` replaced with Tamagui's `asChild` on `html.button`. |  |
| 442 | todo | `class/unsupported` | `after:absolute after:-inset-2 md:after:hidden` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 442 | warning | `class/web-only` | `transition-transform` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 442 | warning | `class/web-only` | `group-data-[collapsible=icon]:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 442 | warning | `class/web-only` | `[&>svg]:size-4 [&>svg]:shrink-0` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 442 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 442 | info | `selector/web-color` | `ring-sidebar-ring` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 442 | info | `selector/web-state` | `group-data-[collapsible=icon]:hidden` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 493 | info | `cva/kept-as-child` | `sidebarMenuButtonVariants = cva(...)` | Kept as cva(): the component supports `asChild`, and Tamagui's `asChild` does not forward `styled()` styles. Its classes still apply at runtime through className. |  |
| 494 | warning | `class/web-only` | `peer/menu-button` | `peer` markers drive sibling selectors, which native does not have. |  |
| 494 | warning | `class/web-only` | `transition-[width,height,padding]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 494 | warning | `class/web-only` | `group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 494 | warning | `class/web-only` | `aria-disabled:pointer-events-none aria-disabled:opacity-50` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 494 | warning | `class/web-only` | `data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 494 | warning | `class/web-only` | `[&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 494 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 494 | info | `selector/web-color` | `ring-sidebar-ring data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 494 | info | `selector/web-state` | `group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 494 | info | `selector/web-variant` | `data-active:font-medium` | Rewrote shadcn's custom variants (`data-open:`, `data-checked:`, ...) to the attributes Tamagui sets, and `dark:` to Tamagui's dark theme class: on web Tailwind compiles these classes without shadcn's CSS. |  |
| 500 | warning | `class/web-only` | `shadow-[0_0_0_1px_var(--sidebar-border)] hover:shadow-[0_0_0_1px_var(--sidebar-accent)]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 505 | warning | `class/web-only` | `group-data-[collapsible=icon]:p-0!` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 531 | info | `radix/as-child` | `asChild ? Slot : html.button` | Radix `Slot` replaced with Tamagui's `asChild` on `html.button`. |  |
| 575 | info | `radix/as-child` | `asChild ? Slot : html.button` | Radix `Slot` replaced with Tamagui's `asChild` on `html.button`. |  |
| 580 | todo | `class/unsupported` | `after:absolute after:-inset-2 md:after:hidden` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 580 | warning | `class/web-only` | `transition-transform` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 580 | warning | `class/web-only` | `group-data-[collapsible=icon]:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 580 | warning | `class/web-only` | `peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1` | `peer-*` variants use sibling selectors, which native does not have. |  |
| 580 | warning | `class/web-only` | `[&>svg]:size-4 [&>svg]:shrink-0` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 580 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 580 | info | `selector/web-color` | `ring-sidebar-ring peer-hover/menu-button:text-sidebar-accent-foreground` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 580 | info | `selector/web-state` | `group-data-[collapsible=icon]:hidden peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 582 | warning | `class/web-only` | `peer-data-active/menu-button:text-sidebar-accent-foreground` | `peer-*` variants use sibling selectors, which native does not have. |  |
| 582 | warning | `class/web-only` | `aria-expanded:opacity-100` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 582 | info | `selector/web-color` | `peer-data-active/menu-button:text-sidebar-accent-foreground` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 582 | info | `selector/web-state` | `aria-expanded:opacity-100` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 600 | warning | `class/web-only` | `tabular-nums` | `font-variant-numeric` is not mapped on native. |  |
| 600 | warning | `class/web-only` | `group-data-[collapsible=icon]:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 600 | warning | `class/web-only` | `peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground` | `peer-*` variants use sibling selectors, which native does not have. |  |
| 600 | info | `selector/web-color` | `peer-hover/menu-button:text-sidebar-accent-foreground peer-data-active/menu-button:text-sidebar-accent-foreground` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 600 | info | `selector/web-state` | `group-data-[collapsible=icon]:hidden peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 634 | warning | `class/web-only` | `max-w-(--skeleton-width)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 655 | warning | `class/web-only` | `group-data-[collapsible=icon]:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 655 | info | `selector/web-state` | `group-data-[collapsible=icon]:hidden` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 689 | info | `radix/as-child` | `asChild ? Slot : html.a` | Radix `Slot` replaced with Tamagui's `asChild` on `html.a`. |  |
| 695 | warning | `class/web-only` | `group-data-[collapsible=icon]:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 695 | warning | `class/web-only` | `aria-disabled:pointer-events-none aria-disabled:opacity-50` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 695 | warning | `class/web-only` | `data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 695 | warning | `class/web-only` | `[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 695 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 695 | info | `selector/web-color` | `ring-sidebar-ring data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 695 | info | `selector/web-state` | `group-data-[collapsible=icon]:hidden aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[size=md]:text-sm data-[size=sm]:text-xs` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
