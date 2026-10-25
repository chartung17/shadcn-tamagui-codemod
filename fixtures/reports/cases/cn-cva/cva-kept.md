# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **84.2%** |
| Native class coverage | 75% |
| TODOs | 2 |
| Warnings | 5 |
| Notes | 3 |
| Classes (supported / web-only / unknown / unsupported) | 12 / 1 / 0 / 3 |
| Constructs (converted / flagged) | 3 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/unsupported` | todo | 2 |
| `cva/kept` | warning | 4 |
| `class/web-only` | warning | 1 |
| `selector/rewrite` | info | 2 |
| `selector/web-color` | info | 1 |

## cases/cn-cva/cva-kept.tsx

Auto-converted 84.2% · 2 TODO(s) · 5 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 14 | warning | `cva/kept` | `chipVariants = cva(...)` | Kept as cva(): it is exported, so other modules may call it for class strings. Its classes still apply at runtime through className. | Convert it to `styled()` from `@tamagui/tailwind` by hand if it can be simplified. |
| 19 | warning | `cva/kept` | `boxVariants = cva(...)` | Kept as cva(): `styled()` has no `compoundVariants`. Its classes still apply at runtime through className. | Convert it to `styled()` from `@tamagui/tailwind` by hand if it can be simplified. |
| 22 | info | `selector/rewrite` | `border-border` | Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
| 27 | warning | `cva/kept` | `listVariants = cva(...)` | Kept as cva(): it styles `TabsPrimitive.List`, which is not an `html.*` element or `View`. Its classes still apply at runtime through className. | Convert it to `styled()` from `@tamagui/tailwind` by hand if it can be simplified. |
| 27 | warning | `class/web-only` | `inline-flex` | `display: inline-flex` is dropped on native, where elements are flex containers anyway. |  |
| 27 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 33 | warning | `cva/kept` | `markVariants = cva(...)` | Kept as cva(): it uses `after:absolute`, which cannot be converted. Its classes still apply at runtime through className. | Convert it to `styled()` from `@tamagui/tailwind` by hand if it can be simplified. |
| 33 | todo | `class/unsupported` | `after:absolute after:inset-0` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 37 | todo | `class/unsupported` | `after:bg-primary` | `::after` pseudo-elements do not exist on native, so this content is lost there. | Render the decoration as a real child element (e.g. an absolutely positioned `View`). |
| 37 | info | `selector/web-color` | `after:bg-primary` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
