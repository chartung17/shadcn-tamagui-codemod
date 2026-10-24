# shadcn-tamagui-codemod report

- Files scanned: 1
- Files changed: 1
- TODOs: 2
- Warnings: 0
- Notes: 0

## cases/elements/unsupported.tsx

| Line | Severity | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- |
| 6 | todo | `<table>` | `<table>` has no `html.*` equivalent, so it renders on web only. | Rebuild the table from html.div/View rows and cells, or keep this component web-only in a `.web.tsx` file. |
| 27 | todo | `<svg>` | `<svg>` has no `html.*` equivalent, so it renders on web only. | Use react-native-svg (or an icon component) for SVG that must render on native. |
