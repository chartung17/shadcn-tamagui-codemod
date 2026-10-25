# shadcn-tamagui-codemod report

- Files scanned: 1
- Files changed: 1
- TODOs: 1
- Warnings: 1
- Notes: 1

## cases/elements/layout.tsx

| Line | Severity | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- |
| 10 | warning | `<a>` | Native caveat: native has no navigation for href, target, rel, download or referrerPolicy. |  |
| 16 | info | `<div>` | Flex container converted to `View`. |  |
| 37 | todo | `<small>` | `<small>` has no `html.*` equivalent, so it renders on web only. | Replace it with a supported `html.*` element or a Tamagui component, or keep it web-only in a `.web.tsx` file. |
