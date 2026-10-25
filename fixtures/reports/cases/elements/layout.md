# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **98.2%** |
| Native class coverage | 94.6% |
| TODOs | 1 |
| Warnings | 3 |
| Notes | 1 |
| Classes (supported / web-only / unknown / unsupported) | 35 / 2 / 0 / 0 |
| Constructs (converted / flagged) | 18 / 1 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `element/unsupported` | todo | 1 |
| `class/web-only` | warning | 2 |
| `element/native-caveat` | warning | 1 |
| `element/view` | info | 1 |

## cases/elements/layout.tsx

Auto-converted 98.2% · 1 TODO(s) · 3 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 10 | warning | `element/native-caveat` | `<a>` | Native caveat: native has no navigation for href, target, rel, download or referrerPolicy. |  |
| 15 | warning | `class/web-only` | `space-y-4` | `space-*` uses child selectors, which native does not have. | Use `gap-y-*` on a flex container instead. |
| 16 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 25 | warning | `class/web-only` | `list-disc` | List markers are not rendered on native (or by `html.li`). |  |
| 37 | todo | `element/unsupported` | `<small>` | `<small>` has no `html.*` equivalent, so it renders on web only. | Replace it with a supported `html.*` element or a Tamagui component, or keep it web-only in a `.web.tsx` file. |
