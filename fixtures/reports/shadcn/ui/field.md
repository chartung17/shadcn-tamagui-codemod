# shadcn-tamagui-codemod report

- Files scanned: 1
- Files changed: 1
- TODOs: 1
- Warnings: 0
- Notes: 0

## shadcn/ui/field.tsx

| Line | Severity | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- |
| 31 | todo | `<legend>` | `<legend>` has no `html.*` equivalent, so it renders on web only. | Replace it with a supported `html.*` element or a Tamagui component, or keep it web-only in a `.web.tsx` file. |
