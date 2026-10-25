# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 78.3% |
| TODOs | 0 |
| Warnings | 9 |
| Notes | 3 |
| Classes (supported / web-only / unknown / unsupported) | 36 / 10 / 0 / 0 |
| Constructs (converted / flagged) | 12 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Icons

The converted files import Tamagui-generated icons. Generate them (they need `react-native-svg` and `@tamagui/helpers-icon`):

```sh
npx @tamagui/cli icons add BellIcon=Bell CircleUserRoundIcon=CircleUserRound CreditCardIcon=CreditCard EllipsisVerticalIcon=EllipsisVertical LogOutIcon=LogOut
```

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 9 |
| `element/view` | info | 1 |
| `icon/wrapped` | info | 1 |
| `selector/web-color` | info | 1 |

## shadcn/blocks/dashboard-01/components/nav-user.tsx

Auto-converted 100% · 0 TODO(s) · 9 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 47 | warning | `class/web-only` | `data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 47 | info | `selector/web-color` | `data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 49 | warning | `class/web-only` | `grayscale` | Filters are dropped on native. |  |
| 53 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 54 | warning | `class/web-only` | `truncate` | `truncate` sets text-overflow and white-space, which native drops. | Use `line-clamp-1` for single-line truncation on native. |
| 57 | warning | `class/web-only` | `truncate` | `truncate` sets text-overflow and white-space, which native drops. | Use `line-clamp-1` for single-line truncation on native. |
| 61 | info | `icon/wrapped` | `ml-auto` | Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper. |  |
| 70 | warning | `class/web-only` | `w-(--radix-dropdown-menu-trigger-width)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 76 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 81 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 82 | warning | `class/web-only` | `truncate` | `truncate` sets text-overflow and white-space, which native drops. | Use `line-clamp-1` for single-line truncation on native. |
| 85 | warning | `class/web-only` | `truncate` | `truncate` sets text-overflow and white-space, which native drops. | Use `line-clamp-1` for single-line truncation on native. |
