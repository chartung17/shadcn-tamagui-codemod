# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **94.1%** |
| Native class coverage | 91.3% |
| TODOs | 2 |
| Warnings | 5 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 21 / 2 / 0 / 0 |
| Constructs (converted / flagged) | 9 / 2 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `element/input-type` | todo | 1 |
| `element/select` | todo | 1 |
| `class/web-only` | warning | 2 |
| `element/native-caveat` | warning | 2 |
| `element/input-type` | warning | 1 |

## cases/elements/forms.tsx

Auto-converted 94.1% · 2 TODO(s) · 5 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 11 | warning | `element/native-caveat` | `<form>` | Native caveat: renders as a container on native; there is no form submission, validation or reset. |  |
| 11 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 12 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 13 | warning | `element/native-caveat` | `<label>` | Native caveat: native has no label association, so `for` does not focus or activate its control. |  |
| 21 | warning | `element/input-type` | `<input type={...}>` | `html.input` renders a TextInput on native; only email, number, password, search, tel, text, url types work there. |  |
| 22 | todo | `element/input-type` | `<input type="checkbox">` | `html.input` supports only text-like types on native; `type="checkbox"` is a native build error. | Use the matching Tamagui component (Checkbox, RadioGroup, Slider, Switch) or a native picker. |
| 29 | todo | `element/select` | `<select>` | `html.select` fails native builds because React Native has no menu-based select control. | Use the shadcn `Select` component, which the radix pass maps to Tamagui `Select`. |
