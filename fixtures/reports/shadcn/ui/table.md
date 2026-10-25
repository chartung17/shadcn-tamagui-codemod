# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **80.5%** |
| Native class coverage | 56.3% |
| TODOs | 8 |
| Warnings | 14 |
| Notes | 4 |
| Classes (supported / web-only / unknown / unsupported) | 18 / 14 / 0 / 0 |
| Constructs (converted / flagged) | 1 / 8 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `element/unsupported` | todo | 8 |
| `class/web-only` | warning | 14 |
| `selector/rewrite` | info | 3 |
| `selector/web-color` | info | 1 |

## shadcn/ui/table.tsx

Auto-converted 80.5% · 8 TODO(s) · 14 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 9 | warning | `class/web-only` | `overflow-x-auto` | `overflow-x` is not supported on native. | Use a horizontal ScrollView. |
| 11 | todo | `element/unsupported` | `<table>` | `<table>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
| 14 | warning | `class/web-only` | `caption-bottom` | Table captions are web-only. |  |
| 23 | todo | `element/unsupported` | `<thead>` | `<thead>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
| 26 | warning | `class/web-only` | `[&_tr]:border-b` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 26 | info | `selector/rewrite` | `border-border` | Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
| 34 | todo | `element/unsupported` | `<tbody>` | `<tbody>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
| 37 | warning | `class/web-only` | `[&_tr:last-child]:border-0` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 45 | todo | `element/unsupported` | `<tfoot>` | `<tfoot>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
| 49 | warning | `class/web-only` | `[&>tr]:last:border-b-0` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 49 | info | `selector/rewrite` | `border-border` | Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
| 59 | todo | `element/unsupported` | `<tr>` | `<tr>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
| 63 | warning | `class/web-only` | `transition-colors` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 63 | warning | `class/web-only` | `has-aria-expanded:bg-muted/50` | `:has()` selectors are web-only. |  |
| 63 | warning | `class/web-only` | `data-[state=selected]:bg-muted` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 63 | info | `selector/rewrite` | `border-border` | Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
| 63 | info | `selector/web-color` | `has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 73 | todo | `element/unsupported` | `<th>` | `<th>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
| 77 | warning | `class/web-only` | `align-middle` | `vertical-align` is web-only. |  |
| 77 | warning | `class/web-only` | `whitespace-nowrap` | `white-space` is not supported on native. | Use `line-clamp-*` to limit lines on native. |
| 77 | warning | `class/web-only` | `[&:has([role=checkbox])]:pr-0` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 87 | todo | `element/unsupported` | `<td>` | `<td>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
| 91 | warning | `class/web-only` | `align-middle` | `vertical-align` is web-only. |  |
| 91 | warning | `class/web-only` | `whitespace-nowrap` | `white-space` is not supported on native. | Use `line-clamp-*` to limit lines on native. |
| 91 | warning | `class/web-only` | `[&:has([role=checkbox])]:pr-0` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 104 | todo | `element/unsupported` | `<caption>` | `<caption>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
