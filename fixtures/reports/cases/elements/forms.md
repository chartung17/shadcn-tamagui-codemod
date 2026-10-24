# shadcn-tamagui-codemod report

- Files scanned: 1
- Files changed: 1
- TODOs: 2
- Warnings: 3
- Notes: 0

## cases/elements/forms.tsx

| Line | Severity | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- |
| 11 | warning | `<form>` | Native caveat: renders as a container on native; there is no form submission, validation or reset. |  |
| 13 | warning | `<label>` | Native caveat: native has no label association, so `for` does not focus or activate its control. |  |
| 21 | warning | `<input type={...}>` | `html.input` renders a TextInput on native; only email, number, password, search, tel, text, url types work there. |  |
| 22 | todo | `<input type="checkbox">` | `html.input` supports only text-like types on native; `type="checkbox"` is a native build error. | Use the matching Tamagui component (Checkbox, RadioGroup, Slider, Switch) or a native picker. |
| 29 | todo | `<select>` | `html.select` fails native builds because React Native has no menu-based select control. | Use the shadcn `Select` component, which the radix pass maps to Tamagui `Select`. |
