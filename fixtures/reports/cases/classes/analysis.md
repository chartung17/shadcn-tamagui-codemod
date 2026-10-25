# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **89.2%** |
| Native class coverage | 63.3% |
| TODOs | 2 |
| Warnings | 8 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 19 / 6 / 2 / 3 |
| Constructs (converted / flagged) | 6 / 1 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/interpolated` | todo | 1 |
| `class/unsupported` | todo | 1 |
| `class/web-only` | warning | 6 |
| `class/unknown` | warning | 2 |

## cases/classes/analysis.tsx

Auto-converted 89.2% · 2 TODO(s) · 8 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 5 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 27 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 27 | warning | `class/web-only` | `md:grid-cols-2` | CSS grid is not available on native. |  |
| 35 | todo | `class/unsupported` | `before:absolute before:inset-0 before:bg-black/10` | `::before` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 41 | todo | `class/interpolated` | `text-${color}-500` | This class name is assembled at runtime, so neither the codemod nor Tailwind can check it. | Map each value to a complete class name, e.g. `{ red: "bg-red-500" }[color]`. |
| 45 | warning | `class/web-only` | `data-[state=open]:font-bold` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 45 | warning | `class/web-only` | `aria-invalid:text-destructive` | `aria-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 48 | warning | `class/unknown` | `w-38` | `38` is not a spacing/size token in the generated Tamagui config, so it is not resolved on native. | Use `w-[9.5rem]` or add a `38` token to the config. |
| 48 | warning | `class/unknown` | `my-custom-class` | Not a Tailwind utility or config token the codemod recognizes (a custom CSS class, or a value missing from the Tamagui config); it passes through on web and is dropped on native. |  |
| 48 | warning | `class/web-only` | `placeholder:text-muted-foreground` | The `placeholder:` variant styles `::placeholder`, which native does not have. | Use the `placeholder-<color>` utility, which maps to `placeholderTextColor` on native. |
