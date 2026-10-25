# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **98.6%** |
| Native class coverage | 50.7% |
| TODOs | 1 |
| Warnings | 7 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 35 / 34 / 0 / 0 |
| Constructs (converted / flagged) | 3 / 1 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `import/web-only-package` | todo | 1 |
| `class/web-only` | warning | 7 |

## shadcn/ui/drawer.tsx

Auto-converted 98.6% · 1 TODO(s) · 7 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 4 | todo | `import/web-only-package` | `"vaul"` | vaul (Drawer) is built on the DOM and does not run on native. | Use Tamagui `Sheet` for a drawer that works on web and native. |
| 39 | warning | `class/web-only` | `fixed` | `position: fixed` is dropped on native. | Use `absolute` inside a full-screen container, or a Tamagui overlay/Portal. |
| 39 | warning | `class/web-only` | `supports-backdrop-filter:backdrop-blur-xs` | `@supports` queries are web-only. |  |
| 39 | warning | `class/web-only` | `data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 58 | warning | `class/web-only` | `fixed` | `position: fixed` is dropped on native. | Use `absolute` inside a full-screen container, or a Tamagui overlay/Portal. |
| 58 | warning | `class/web-only` | `data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-xl data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:rounded-r-xl data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:rounded-l-xl data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-xl data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=right]:sm:max-w-sm` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 63 | warning | `class/web-only` | `group-data-[vaul-drawer-direction=bottom]/drawer-content:block` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 78 | warning | `class/web-only` | `group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
