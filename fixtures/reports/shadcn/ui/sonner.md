# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 0 |
| **Auto-converted** | **100%** |
| Native class coverage | 75% |
| TODOs | 0 |
| Warnings | 2 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 6 / 1 / 1 / 0 |
| Constructs (converted / flagged) | 0 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/unknown` | warning | 1 |
| `class/web-only` | warning | 1 |

## shadcn/ui/sonner.tsx

Auto-converted 100% · 0 TODO(s) · 2 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 13 | warning | `class/unknown` | `toaster` | Not a Tailwind utility or config token the codemod recognizes (a custom CSS class, or a value missing from the Tamagui config); it passes through on web and is dropped on native. |  |
| 28 | warning | `class/web-only` | `animate-spin` | CSS keyframe animations are web-only. | Use Tamagui's `transition` prop (and enter/exit styles) for native animation. |
