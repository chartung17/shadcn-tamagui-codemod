# shadcn-tamagui-codemod report

- Files scanned: 1
- Files changed: 1
- TODOs: 1
- Warnings: 0
- Notes: 0

## cases/imports/react-dom.tsx

| Line | Severity | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- |
| 5 | todo | `createPortal from "react-dom"` | `react-dom` is web-only and is not available in React Native. | Render through `Portal` from `@tamagui/portal` (or a Tamagui overlay component), which works on web and native. |
