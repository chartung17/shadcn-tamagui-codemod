# shadcn-tamagui-codemod report

- Files scanned: 1
- Files changed: 1
- TODOs: 0
- Warnings: 2
- Notes: 1

## shadcn/blocks/login-01/components/login-form.tsx

| Line | Severity | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- |
| 46 | info | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 48 | warning | `<a>` | Native caveat: native has no navigation for href, target, rel, download or referrerPolicy. |  |
| 63 | warning | `<a>` | Native caveat: native has no navigation for href, target, rel, download or referrerPolicy. |  |
