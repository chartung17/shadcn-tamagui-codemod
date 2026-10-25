# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 33.3% |
| TODOs | 0 |
| Warnings | 2 |
| Notes | 2 |
| Classes (supported / web-only / unknown / unsupported) | 2 / 4 / 0 / 0 |
| Constructs (converted / flagged) | 1 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 1 |
| `radix/unsupported-prop` | warning | 1 |
| `selector/native-orientation` | info | 1 |
| `selector/web-variant` | info | 1 |

## shadcn/ui/separator.tsx

Auto-converted 100% · 0 TODO(s) · 2 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 24 | warning | `radix/unsupported-prop` | `Separator.Root decorative` | Removed `decorative`: Tamagui Separator has no `decorative` option (it always renders `role="separator"`). |  |
| 29 | warning | `class/web-only` | `data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 29 | info | `selector/native-orientation` | `data-horizontal:h-px data-horizontal:w-full` | Added a `native:` copy of classes behind `data-horizontal:` (data variants are dropped on native), assuming the default horizontal orientation. Vertical components need those classes adjusted by hand on native. |  |
| 29 | info | `selector/web-variant` | `data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch` | Rewrote shadcn's custom variants (`data-open:`, `data-checked:`, ...) to the attributes Tamagui sets, and `dark:` to Tamagui's dark theme class: on web Tailwind compiles these classes without shadcn's CSS. |  |
