# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **96.7%** |
| Native class coverage | 62.5% |
| TODOs | 4 |
| Warnings | 67 |
| Notes | 6 |
| Classes (supported / web-only / unknown / unsupported) | 210 / 114 / 0 / 12 |
| Constructs (converted / flagged) | 31 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/unsupported` | todo | 4 |
| `class/web-only` | warning | 67 |
| `radix/as-child` | info | 5 |
| `cva/kept-as-child` | info | 1 |

## shadcn/ui/sidebar.tsx

Auto-converted 96.7% · 4 TODO(s) · 67 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 137 | warning | `class/web-only` | `has-data-[variant=inset]:bg-sidebar` | `:has()` selectors are web-only. |  |
| 168 | warning | `class/web-only` | `w-(--sidebar-width)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 186 | warning | `class/web-only` | `w-(--sidebar-width)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 186 | warning | `class/web-only` | `[&>button]:hidden` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 194 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 208 | warning | `class/web-only` | `peer` | `peer` markers drive sibling selectors, which native does not have. |  |
| 208 | warning | `class/web-only` | `md:block` | React Native has no block layout; `display: block` is dropped on native. |  |
| 219 | warning | `class/web-only` | `w-(--sidebar-width)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 219 | warning | `class/web-only` | `transition-[width]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 219 | warning | `class/web-only` | `duration-200 ease-linear` | CSS transitions are web-only. |  |
| 220 | warning | `class/web-only` | `group-data-[collapsible=offcanvas]:w-0` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 221 | warning | `class/web-only` | `group-data-[side=right]:rotate-180` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 223 | warning | `class/web-only` | `group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 224 | warning | `class/web-only` | `group-data-[collapsible=icon]:w-(--sidebar-width-icon)` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 231 | warning | `class/web-only` | `fixed` | `position: fixed` is dropped on native. | Use `absolute` inside a full-screen container, or a Tamagui overlay/Portal. |
| 231 | warning | `class/web-only` | `w-(--sidebar-width)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 231 | warning | `class/web-only` | `transition-[left,right,width]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 231 | warning | `class/web-only` | `duration-200 ease-linear` | CSS transitions are web-only. |  |
| 231 | warning | `class/web-only` | `data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 234 | warning | `class/web-only` | `group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 235 | warning | `class/web-only` | `group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 243 | warning | `class/web-only` | `group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 273 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 295 | todo | `class/unsupported` | `after:absolute after:inset-y-0 after:start-1/2 after:w-[2px] hover:after:bg-sidebar-border` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 295 | warning | `class/web-only` | `transition-all` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 295 | warning | `class/web-only` | `ease-linear` | CSS transitions are web-only. |  |
| 295 | warning | `class/web-only` | `group-data-[side=left]:-right-4 group-data-[side=right]:left-0` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 295 | warning | `class/web-only` | `ltr:-translate-x-1/2` | `ltr:` uses a `[dir]` selector, which is web-only. |  |
| 295 | warning | `class/web-only` | `rtl:-translate-x-1/2` | `rtl:` uses a `[dir]` selector, which is web-only. |  |
| 296 | warning | `class/web-only` | `in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize` | `in-*` (ancestor) selectors are web-only. |  |
| 297 | warning | `class/web-only` | `[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 298 | todo | `class/unsupported` | `group-data-[collapsible=offcanvas]:after:left-full` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 298 | warning | `class/web-only` | `group-data-[collapsible=offcanvas]:translate-x-0 hover:group-data-[collapsible=offcanvas]:bg-sidebar` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 299 | warning | `class/web-only` | `[[data-side=left][data-collapsible=offcanvas]_&]:-right-2` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 300 | warning | `class/web-only` | `[[data-side=right][data-collapsible=offcanvas]_&]:-left-2` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 316 | warning | `class/web-only` | `md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2` | `peer-*` variants use sibling selectors, which native does not have. |  |
| 389 | warning | `class/web-only` | `no-scrollbar` | Scrollbar styling is web-only. |  |
| 389 | warning | `class/web-only` | `overflow-auto` | `overflow: auto` is dropped on native; views do not scroll. | Wrap scrollable content in a ScrollView. |
| 389 | warning | `class/web-only` | `group-data-[collapsible=icon]:overflow-hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 417 | info | `radix/as-child` | `asChild ? Slot : html.div` | Radix `Slot` replaced with Tamagui's `asChild` on `html.div`. |  |
| 421 | warning | `class/web-only` | `transition-[margin,opacity]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 421 | warning | `class/web-only` | `duration-200 ease-linear` | CSS transitions are web-only. |  |
| 421 | warning | `class/web-only` | `group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 421 | warning | `class/web-only` | `[&>svg]:size-4 [&>svg]:shrink-0` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 436 | info | `radix/as-child` | `asChild ? Slot : html.button` | Radix `Slot` replaced with Tamagui's `asChild` on `html.button`. |  |
| 441 | todo | `class/unsupported` | `after:absolute after:-inset-2 md:after:hidden` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 441 | warning | `class/web-only` | `transition-transform` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 441 | warning | `class/web-only` | `group-data-[collapsible=icon]:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 441 | warning | `class/web-only` | `[&>svg]:size-4 [&>svg]:shrink-0` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 492 | info | `cva/kept-as-child` | `sidebarMenuButtonVariants = cva(...)` | Kept as cva(): the component supports `asChild`, and Tamagui's `asChild` does not forward `styled()` styles. Its classes still apply at runtime through className. |  |
| 493 | warning | `class/web-only` | `peer/menu-button` | `peer` markers drive sibling selectors, which native does not have. |  |
| 493 | warning | `class/web-only` | `transition-[width,height,padding]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 493 | warning | `class/web-only` | `group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 493 | warning | `class/web-only` | `aria-disabled:pointer-events-none aria-disabled:opacity-50` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 493 | warning | `class/web-only` | `data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 493 | warning | `class/web-only` | `[&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 499 | warning | `class/web-only` | `shadow-[0_0_0_1px_var(--sidebar-border)] hover:shadow-[0_0_0_1px_var(--sidebar-accent)]` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 504 | warning | `class/web-only` | `group-data-[collapsible=icon]:p-0!` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 530 | info | `radix/as-child` | `asChild ? Slot : html.button` | Radix `Slot` replaced with Tamagui's `asChild` on `html.button`. |  |
| 574 | info | `radix/as-child` | `asChild ? Slot : html.button` | Radix `Slot` replaced with Tamagui's `asChild` on `html.button`. |  |
| 579 | todo | `class/unsupported` | `after:absolute after:-inset-2 md:after:hidden` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 579 | warning | `class/web-only` | `transition-transform` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 579 | warning | `class/web-only` | `group-data-[collapsible=icon]:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 579 | warning | `class/web-only` | `peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1` | `peer-*` variants use sibling selectors, which native does not have. |  |
| 579 | warning | `class/web-only` | `[&>svg]:size-4 [&>svg]:shrink-0` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 581 | warning | `class/web-only` | `peer-data-active/menu-button:text-sidebar-accent-foreground` | `peer-*` variants use sibling selectors, which native does not have. |  |
| 581 | warning | `class/web-only` | `aria-expanded:opacity-100` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 599 | warning | `class/web-only` | `tabular-nums` | `font-variant-numeric` is not mapped on native. |  |
| 599 | warning | `class/web-only` | `group-data-[collapsible=icon]:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 599 | warning | `class/web-only` | `peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground` | `peer-*` variants use sibling selectors, which native does not have. |  |
| 633 | warning | `class/web-only` | `max-w-(--skeleton-width)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 654 | warning | `class/web-only` | `group-data-[collapsible=icon]:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 688 | info | `radix/as-child` | `asChild ? Slot : html.a` | Radix `Slot` replaced with Tamagui's `asChild` on `html.a`. |  |
| 694 | warning | `class/web-only` | `group-data-[collapsible=icon]:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 694 | warning | `class/web-only` | `aria-disabled:pointer-events-none aria-disabled:opacity-50` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 694 | warning | `class/web-only` | `data-[size=md]:text-sm data-[size=sm]:text-xs data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 694 | warning | `class/web-only` | `[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
