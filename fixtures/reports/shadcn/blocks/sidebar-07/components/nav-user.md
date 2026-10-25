# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 78% |
| TODOs | 0 |
| Warnings | 8 |
| Notes | 2 |
| Classes (supported / web-only / unknown / unsupported) | 32 / 9 / 0 / 0 |
| Constructs (converted / flagged) | 13 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Icons

The converted files import Tamagui-generated icons. Generate them (they need `react-native-svg` and `@tamagui/helpers-icon`):

```sh
npx @tamagui/cli icons add BadgeCheckIcon=BadgeCheck BellIcon=Bell ChevronsUpDownIcon=ChevronsUpDown CreditCardIcon=CreditCard LogOutIcon=LogOut SparklesIcon=Sparkles
```

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 8 |
| `element/view` | info | 1 |
| `icon/wrapped` | info | 1 |

## shadcn/blocks/sidebar-07/components/nav-user.tsx

Auto-converted 100% · 0 TODO(s) · 8 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 47 | warning | `class/web-only` | `data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 53 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 54 | warning | `class/web-only` | `truncate` | `truncate` sets text-overflow and white-space, which native drops. | Use `line-clamp-1` for single-line truncation on native. |
| 57 | warning | `class/web-only` | `truncate` | `truncate` sets text-overflow and white-space, which native drops. | Use `line-clamp-1` for single-line truncation on native. |
| 59 | info | `icon/wrapped` | `ml-auto` | Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper. |  |
| 65 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 71 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 76 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 77 | warning | `class/web-only` | `truncate` | `truncate` sets text-overflow and white-space, which native drops. | Use `line-clamp-1` for single-line truncation on native. |
| 80 | warning | `class/web-only` | `truncate` | `truncate` sets text-overflow and white-space, which native drops. | Use `line-clamp-1` for single-line truncation on native. |
