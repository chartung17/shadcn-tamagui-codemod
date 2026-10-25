# shadcn-tamagui-codemod report

- Files scanned: 1
- Files changed: 1
- TODOs: 1
- Warnings: 0
- Notes: 0

## cases/elements/component-variable.tsx

| Line | Severity | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- |
| 16 | todo | `"td"` | `<td>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
