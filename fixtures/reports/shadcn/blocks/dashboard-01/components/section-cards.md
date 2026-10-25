# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 76.4% |
| TODOs | 0 |
| Warnings | 12 |
| Notes | 6 |
| Classes (supported / web-only / unknown / unsupported) | 55 / 17 / 0 / 0 |
| Constructs (converted / flagged) | 11 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Icons

The converted files import Tamagui-generated icons. Generate them (they need `react-native-svg` and `@tamagui/helpers-icon`):

```sh
npx @tamagui/cli icons add TrendingDownIcon=TrendingDown TrendingUpIcon=TrendingUp
```

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 12 |
| `selector/web-state` | info | 5 |
| `selector/web-color` | info | 1 |

## shadcn/blocks/dashboard-01/components/section-cards.tsx

Auto-converted 100% · 0 TODO(s) · 12 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 18 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 18 | warning | `class/web-only` | `grid-cols-1 @xl/main:grid-cols-2` | CSS grid is not available on native. |  |
| 18 | warning | `class/web-only` | `*:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card` | Child selectors (`*:`) are web-only. |  |
| 18 | warning | `class/web-only` | `@5xl/main:grid-cols-4` | Only container queries named after configured media queries work on native. |  |
| 18 | info | `selector/web-color` | `dark:*:data-[slot=card]:bg-card` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 18 | info | `selector/web-state` | `@5xl/main:grid-cols-4` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 22 | warning | `class/web-only` | `tabular-nums` | `font-variant-numeric` is not mapped on native. |  |
| 22 | warning | `class/web-only` | `@[250px]/card:text-3xl` | Only container queries named after configured media queries work on native. |  |
| 22 | info | `selector/web-state` | `@[250px]/card:text-3xl` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 48 | warning | `class/web-only` | `tabular-nums` | `font-variant-numeric` is not mapped on native. |  |
| 48 | warning | `class/web-only` | `@[250px]/card:text-3xl` | Only container queries named after configured media queries work on native. |  |
| 48 | info | `selector/web-state` | `@[250px]/card:text-3xl` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 74 | warning | `class/web-only` | `tabular-nums` | `font-variant-numeric` is not mapped on native. |  |
| 74 | warning | `class/web-only` | `@[250px]/card:text-3xl` | Only container queries named after configured media queries work on native. |  |
| 74 | info | `selector/web-state` | `@[250px]/card:text-3xl` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 100 | warning | `class/web-only` | `tabular-nums` | `font-variant-numeric` is not mapped on native. |  |
| 100 | warning | `class/web-only` | `@[250px]/card:text-3xl` | Only container queries named after configured media queries work on native. |  |
| 100 | info | `selector/web-state` | `@[250px]/card:text-3xl` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
