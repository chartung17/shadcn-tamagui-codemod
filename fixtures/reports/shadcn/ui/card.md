# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 58% |
| TODOs | 0 |
| Warnings | 16 |
| Notes | 4 |
| Classes (supported / web-only / unknown / unsupported) | 29 / 21 / 0 / 0 |
| Constructs (converted / flagged) | 7 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 16 |
| `selector/web-state` | info | 3 |
| `selector/web-color` | info | 1 |

## shadcn/ui/card.tsx

Auto-converted 100% · 0 TODO(s) · 16 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 15 | warning | `class/web-only` | `gap-(--card-spacing) py-(--card-spacing)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 15 | warning | `class/web-only` | `[--card-spacing:--spacing(6)]` | Arbitrary CSS properties (`[prop:value]`) pass through to CSS on web and are dropped on native. |  |
| 15 | warning | `class/web-only` | `has-[>img:first-child]:pt-0` | `:has()` selectors are web-only. |  |
| 15 | warning | `class/web-only` | `data-[size=sm]:[--card-spacing:--spacing(4)]` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 15 | warning | `class/web-only` | `*:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl` | Child selectors (`*:`) are web-only. |  |
| 15 | info | `selector/web-color` | `ring-foreground/10` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 15 | info | `selector/web-state` | `has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)]` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 31 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 31 | warning | `class/web-only` | `auto-rows-min` | CSS grid is not available on native. |  |
| 31 | warning | `class/web-only` | `px-(--card-spacing)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 31 | warning | `class/web-only` | `has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]` | `:has()` selectors are web-only. |  |
| 31 | warning | `class/web-only` | `[.border-b]:pb-(--card-spacing)` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
| 31 | info | `selector/web-state` | `has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 47 | warning | `class/web-only` | `group-data-[size=sm]/card:text-sm` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 47 | info | `selector/web-state` | `group-data-[size=sm]/card:text-sm` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 76 | warning | `class/web-only` | `col-start-2 row-span-2 row-start-1` | CSS grid is not available on native. |  |
| 76 | warning | `class/web-only` | `justify-self-end` | `justify-self` applies to grid; not available on native. |  |
| 91 | warning | `class/web-only` | `px-(--card-spacing)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 105 | warning | `class/web-only` | `px-(--card-spacing)` | CSS variables and functions other than `calc()`/`clamp()` do not resolve on native. | Use a token or a plain value (px, %, rem) that native can resolve. |
| 105 | warning | `class/web-only` | `[.border-t]:pt-(--card-spacing)` | Arbitrary selector variants are web-only, so this style does not apply on native. |  |
