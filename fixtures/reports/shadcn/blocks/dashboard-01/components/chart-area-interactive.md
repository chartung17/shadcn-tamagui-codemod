# shadcn-tamagui-codemod report

- Files scanned: 1
- Files changed: 1
- TODOs: 1
- Warnings: 0
- Notes: 0

## shadcn/blocks/dashboard-01/components/chart-area-interactive.tsx

| Line | Severity | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- |
| 215 | todo | `<defs>` | `<defs>` has no `html.*` equivalent, so it renders on web only. | Use react-native-svg (or an icon component) for SVG that must render on native. |
