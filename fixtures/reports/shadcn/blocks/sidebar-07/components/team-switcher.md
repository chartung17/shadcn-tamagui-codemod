# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 86.4% |
| TODOs | 0 |
| Warnings | 5 |
| Notes | 5 |
| Classes (supported / web-only / unknown / unsupported) | 38 / 6 / 0 / 0 |
| Constructs (converted / flagged) | 9 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Icons

The converted files import Tamagui-generated icons. Generate them (they need `react-native-svg` and `@tamagui/helpers-icon`):

```sh
npx @tamagui/cli icons add ChevronsUpDownIcon=ChevronsUpDown PlusIcon=Plus
```

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 5 |
| `selector/rewrite` | info | 2 |
| `element/view` | info | 1 |
| `icon/wrapped` | info | 1 |
| `selector/web-color` | info | 1 |

## shadcn/blocks/sidebar-07/components/team-switcher.tsx

Auto-converted 100% · 0 TODO(s) · 5 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 47 | warning | `class/web-only` | `data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 47 | info | `selector/web-color` | `data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 52 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 53 | warning | `class/web-only` | `truncate` | `truncate` sets text-overflow and white-space, which native drops. | Use `line-clamp-1` for single-line truncation on native. |
| 56 | warning | `class/web-only` | `truncate` | `truncate` sets text-overflow and white-space, which native drops. | Use `line-clamp-1` for single-line truncation on native. |
| 60 | info | `icon/wrapped` | `ml-auto` | Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper. |  |
| 68 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 82 | info | `selector/rewrite` | `border-border` | Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
| 91 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 91 | info | `selector/rewrite` | `border-border` | Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
