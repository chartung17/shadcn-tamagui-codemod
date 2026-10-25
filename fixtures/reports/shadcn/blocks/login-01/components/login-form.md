# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 83.3% |
| TODOs | 0 |
| Warnings | 4 |
| Notes | 1 |
| Classes (supported / web-only / unknown / unsupported) | 10 / 2 / 0 / 0 |
| Constructs (converted / flagged) | 5 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 2 |
| `element/native-caveat` | warning | 2 |
| `element/view` | info | 1 |

## shadcn/blocks/login-01/components/login-form.tsx

Auto-converted 100% · 0 TODO(s) · 4 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 46 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 48 | warning | `element/native-caveat` | `<a>` | Native caveat: native has no navigation for href, target, rel, download or referrerPolicy. |  |
| 50 | warning | `class/web-only` | `inline-block` | React Native has no inline layout. |  |
| 50 | warning | `class/web-only` | `underline-offset-4` | `text-underline-offset` is web-only. |  |
| 63 | warning | `element/native-caveat` | `<a>` | Native caveat: native has no navigation for href, target, rel, download or referrerPolicy. |  |
