# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 55.9% |
| TODOs | 0 |
| Warnings | 6 |
| Notes | 1 |
| Classes (supported / web-only / unknown / unsupported) | 19 / 15 / 0 / 0 |
| Constructs (converted / flagged) | 1 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 5 |
| `element/input-type` | warning | 1 |
| `selector/rewrite` | info | 1 |

## shadcn/ui/input.tsx

Auto-converted 100% · 0 TODO(s) · 6 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 11 | warning | `element/input-type` | `<input type={...}>` | `html.input` renders a TextInput on native; only email, number, password, search, tel, text, url types work there. |  |
| 15 | warning | `class/web-only` | `transition-[color,box-shadow]` | CSS transitions are web-only. | Use Tamagui's `transition` prop with an animation driver for native. |
| 15 | warning | `class/web-only` | `file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground` | `file:` styles the file selector button, which native does not have. |  |
| 15 | warning | `class/web-only` | `placeholder:text-muted-foreground` | The `placeholder:` variant styles `::placeholder`, which native does not have. | Use the `placeholder-<color>` utility, which maps to `placeholderTextColor` on native. |
| 15 | warning | `class/web-only` | `disabled:cursor-not-allowed` | Cursors other than `auto`/`pointer` are dropped on native. |  |
| 15 | warning | `class/web-only` | `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 15 | info | `selector/rewrite` | `placeholder-muted-foreground` | Added `placeholder-*`, which maps to `placeholderTextColor` on native. |  |
