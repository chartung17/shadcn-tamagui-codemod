# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **99.4%** |
| Native class coverage | 59.4% |
| TODOs | 1 |
| Warnings | 25 |
| Notes | 2 |
| Classes (supported / web-only / unknown / unsupported) | 98 / 67 / 0 / 0 |
| Constructs (converted / flagged) | 3 / 1 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `radix/unmapped` | todo | 1 |
| `class/web-only` | warning | 25 |
| `element/view` | info | 2 |

## shadcn/ui/dropdown-menu.tsx

Auto-converted 99.4% · 1 TODO(s) · 25 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 4 | todo | `radix/unmapped` | `DropdownMenu (DropdownMenuPrimitive)` | There is no Tamagui mapping for Radix `DropdownMenu` yet, so it stays on Radix, which is web-only. | Rebuild it from Tamagui primitives, or keep this component web-only in a `.web.tsx` file. |
| 46 | warning | `class/web-only` | `max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) origin-(--radix-dropdown-menu-content-transform-origin)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 46 | warning | `class/web-only` | `overflow-x-hidden` | `overflow-x` is not supported on native. | Use a horizontal ScrollView. |
| 46 | warning | `class/web-only` | `overflow-y-auto` | `overflow-y` is not supported on native. | Use a ScrollView. |
| 46 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 46 | warning | `class/web-only` | `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:overflow-hidden data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 78 | warning | `class/web-only` | `cursor-default` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 78 | warning | `class/web-only` | `not-data-[variant=destructive]:focus:**:text-accent-foreground` | `:not()` selectors are web-only. |  |
| 78 | warning | `class/web-only` | `data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 data-[variant=destructive]:*:[svg]:text-destructive` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 78 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 100 | warning | `class/web-only` | `cursor-default` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 100 | warning | `class/web-only` | `focus:**:text-accent-foreground` | Descendant selectors (`**:`) are web-only. |  |
| 100 | warning | `class/web-only` | `data-inset:pl-8 data-disabled:pointer-events-none data-disabled:opacity-50` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 100 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 106 | info | `element/view` | `<span>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 143 | warning | `class/web-only` | `cursor-default` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 143 | warning | `class/web-only` | `focus:**:text-accent-foreground` | Descendant selectors (`**:`) are web-only. |  |
| 143 | warning | `class/web-only` | `data-inset:pl-8 data-disabled:pointer-events-none data-disabled:opacity-50` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 143 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 148 | info | `element/view` | `<span>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 173 | warning | `class/web-only` | `data-inset:pl-8` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 229 | warning | `class/web-only` | `cursor-default` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 229 | warning | `class/web-only` | `not-data-[variant=destructive]:focus:**:text-accent-foreground` | `:not()` selectors are web-only. |  |
| 229 | warning | `class/web-only` | `data-inset:pl-8 data-open:bg-accent data-open:text-accent-foreground` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 229 | warning | `class/web-only` | `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 248 | warning | `class/web-only` | `origin-(--radix-dropdown-menu-content-transform-origin)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 248 | warning | `class/web-only` | `duration-100` | CSS transitions are web-only. |  |
| 248 | warning | `class/web-only` | `data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
