# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 40% |
| TODOs | 0 |
| Warnings | 4 |
| Notes | 2 |
| Classes (supported / web-only / unknown / unsupported) | 2 / 3 / 0 / 0 |
| Constructs (converted / flagged) | 4 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Icons

The converted files import Tamagui-generated icons. Generate them (they need `react-native-svg` and `@tamagui/helpers-icon`):

```sh
npx @tamagui/cli icons add ChevronRightIcon=ChevronRight
```

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 3 |
| `element/native-caveat` | warning | 1 |
| `icon/wrapped` | info | 1 |
| `selector/web-state` | info | 1 |

## shadcn/blocks/sidebar-07/components/nav-main.tsx

Auto-converted 100% · 0 TODO(s) · 4 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 52 | warning | `class/web-only` | `transition-transform` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 52 | warning | `class/web-only` | `duration-200` | CSS transitions are web-only. |  |
| 52 | warning | `class/web-only` | `group-data-[state=open]/collapsible:rotate-90` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 52 | info | `icon/wrapped` | `ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90!` | Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper. |  |
| 52 | info | `selector/web-state` | `group-data-[state=open]/collapsible:rotate-90` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 67 | warning | `element/native-caveat` | `<a>` | Native caveat: native has no navigation for href, target, rel, download or referrerPolicy. |  |
