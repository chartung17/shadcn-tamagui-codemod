# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 66.7% |
| TODOs | 0 |
| Warnings | 1 |
| Notes | 2 |
| Classes (supported / web-only / unknown / unsupported) | 2 / 1 / 0 / 0 |
| Constructs (converted / flagged) | 1 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 1 |
| `radix/local-component` | info | 1 |
| `selector/web-color` | info | 1 |

## cases/radix/toggle-namespace.tsx

Auto-converted 100% · 0 TODO(s) · 1 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 6 | info | `radix/local-component` | `@radix-ui/react-toggle (TogglePrimitive)` | Tamagui has no `@radix-ui/react-toggle`, so a small replacement built on `html.*` was added to this file in place of the Radix import. |  |
| 45 | warning | `class/web-only` | `aria-pressed:bg-muted` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 45 | info | `selector/web-color` | `aria-pressed:bg-muted` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
