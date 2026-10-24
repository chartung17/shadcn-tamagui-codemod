# shadcn-tamagui-codemod report

- Files scanned: 1
- Files changed: 1
- TODOs: 1
- Warnings: 0
- Notes: 2

## shadcn/ui/chart.tsx

| Line | Severity | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- |
| 94 | todo | `<style>` | `<style>` has no `html.*` equivalent, so it renders on web only. | Replace it with a supported `html.*` element or a Tamagui component, or keep it web-only in a `.web.tsx` file. |
| 247 | info | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 296 | info | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
