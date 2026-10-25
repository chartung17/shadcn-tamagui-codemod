# shadcn-tamagui-codemod report

- Files scanned: 1
- Files changed: 1
- TODOs: 0
- Warnings: 1
- Notes: 0

## shadcn/ui/input.tsx

| Line | Severity | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- |
| 11 | warning | `<input type={...}>` | `html.input` renders a TextInput on native; only email, number, password, search, tel, text, url types work there. |  |
