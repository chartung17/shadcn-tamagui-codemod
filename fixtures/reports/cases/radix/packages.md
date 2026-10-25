# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **90.5%** |
| Native class coverage | 81.8% |
| TODOs | 2 |
| Warnings | 3 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 9 / 2 / 0 / 0 |
| Constructs (converted / flagged) | 8 / 2 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `radix/import-style` | todo | 1 |
| `radix/unmapped` | todo | 1 |
| `class/web-only` | warning | 2 |
| `radix/unsupported-prop` | warning | 1 |

## cases/radix/packages.tsx

Auto-converted 90.5% · 2 TODO(s) · 3 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 3 | todo | `radix/import-style` | `import { Root as CheckboxRoot } from "@radix-ui/react-checkbox"` | Only namespace imports (`import * as X from "@radix-ui/react-..."`) of Radix packages are converted. | Switch to a namespace import and re-run, or convert this component by hand. |
| 5 | todo | `radix/unmapped` | `HoverCard (HoverCardPrimitive)` | There is no Tamagui mapping for Radix `HoverCard` yet, so it stays on Radix, which is web-only. | Rebuild it from Tamagui primitives, or keep this component web-only in a `.web.tsx` file. |
| 18 | warning | `class/web-only` | `fixed` | `position: fixed` is dropped on native. | Use `absolute` inside a full-screen container, or a Tamagui overlay/Portal. |
| 30 | warning | `class/web-only` | `fixed` | `position: fixed` is dropped on native. | Use `absolute` inside a full-screen container, or a Tamagui overlay/Portal. |
| 31 | warning | `radix/unsupported-prop` | `Dialog.Content onOpenAutoFocus` | Removed `onOpenAutoFocus`: Tamagui controls focus through `<Dialog.FocusScope onMountAutoFocus onUnmountAutoFocus>`. |  |
