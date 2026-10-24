# shadcn-tamagui-codemod report

- Files scanned: 1
- Files changed: 1
- TODOs: 0
- Warnings: 2
- Notes: 14

## shadcn/blocks/dashboard-01/components/data-table.tsx

| Line | Severity | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- |
| 166 | info | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 178 | info | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 222 | warning | `<form>` | Native caveat: renders as a container on native; there is no form submission, validation or reset. |  |
| 246 | warning | `<form>` | Native caveat: renders as a container on native; there is no form submission, validation or reset. |  |
| 422 | info | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 453 | info | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 544 | info | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 549 | info | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 578 | info | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 678 | info | `<div>` | Flex container converted to `View`. |  |
| 737 | info | `<div>` | Flex container converted to `View`. |  |
| 742 | info | `<div>` | Flex container converted to `View`. |  |
| 770 | info | `<div>` | Flex container converted to `View`. |  |
| 787 | info | `<div>` | Flex container converted to `View`. |  |
| 791 | info | `<div>` | Flex container converted to `View`. |  |
| 796 | info | `<div>` | Flex container converted to `View`. |  |
