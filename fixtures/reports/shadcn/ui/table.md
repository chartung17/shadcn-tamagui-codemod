# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **80.5%** |
| Native class coverage | 56.3% |
| TODOs | 8 |
| Warnings | 14 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 18 / 14 / 0 / 0 |
| Constructs (converted / flagged) | 1 / 8 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `element/unsupported` | todo | 8 |
| `class/web-only` | warning | 14 |

## shadcn/ui/table.tsx

Auto-converted 80.5% · 8 TODO(s) · 14 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 9 | warning | `class/web-only` | `overflow-x-auto` | `overflow-x` is not supported on native. | Use a horizontal ScrollView. |
| 11 | todo | `element/unsupported` | `<table>` | `<table>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
| 15 | warning | `class/web-only` | `caption-bottom` | Table captions are web-only. |  |
| 24 | todo | `element/unsupported` | `<thead>` | `<thead>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
| 28 | warning | `class/web-only` | `[&_tr]:border-b` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 36 | todo | `element/unsupported` | `<tbody>` | `<tbody>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
| 40 | warning | `class/web-only` | `[&_tr:last-child]:border-0` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 48 | todo | `element/unsupported` | `<tfoot>` | `<tfoot>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
| 53 | warning | `class/web-only` | `[&>tr]:last:border-b-0` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 63 | todo | `element/unsupported` | `<tr>` | `<tr>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
| 68 | warning | `class/web-only` | `transition-colors` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 68 | warning | `class/web-only` | `has-aria-expanded:bg-muted/50` | `:has()` selectors are web-only. |  |
| 68 | warning | `class/web-only` | `data-[state=selected]:bg-muted` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 78 | todo | `element/unsupported` | `<th>` | `<th>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
| 83 | warning | `class/web-only` | `align-middle` | `vertical-align` is web-only. |  |
| 83 | warning | `class/web-only` | `whitespace-nowrap` | `white-space` is not supported on native. | Use `line-clamp-*` to limit lines on native. |
| 83 | warning | `class/web-only` | `[&:has([role=checkbox])]:pr-0` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 93 | todo | `element/unsupported` | `<td>` | `<td>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
| 98 | warning | `class/web-only` | `align-middle` | `vertical-align` is web-only. |  |
| 98 | warning | `class/web-only` | `whitespace-nowrap` | `white-space` is not supported on native. | Use `line-clamp-*` to limit lines on native. |
| 98 | warning | `class/web-only` | `[&:has([role=checkbox])]:pr-0` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 111 | todo | `element/unsupported` | `<caption>` | `<caption>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
