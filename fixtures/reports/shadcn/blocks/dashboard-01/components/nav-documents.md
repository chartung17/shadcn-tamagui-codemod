# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 62.5% |
| TODOs | 0 |
| Warnings | 4 |
| Notes | 1 |
| Classes (supported / web-only / unknown / unsupported) | 5 / 3 / 0 / 0 |
| Constructs (converted / flagged) | 11 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Icons

The converted files import Tamagui-generated icons. Generate them (they need `react-native-svg` and `@tamagui/helpers-icon`):

```sh
npx @tamagui/cli icons add FolderIcon=Folder MoreHorizontalIcon=MoreHorizontal ShareIcon=Share Trash2Icon=Trash2
```

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 3 |
| `element/native-caveat` | warning | 1 |
| `icon/wrapped` | info | 1 |

## shadcn/blocks/dashboard-01/components/nav-documents.tsx

Auto-converted 100% · 0 TODO(s) · 4 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 39 | warning | `class/web-only` | `group-data-[collapsible=icon]:hidden` | `group-*` variants other than interaction states (hover, press, focus, focus-visible, focus-within, disabled) use selectors that native does not have. |  |
| 45 | warning | `element/native-caveat` | `<a>` | Native caveat: native has no navigation for href, target, rel, download or referrerPolicy. |  |
| 54 | warning | `class/web-only` | `data-[state=open]:bg-accent` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 57 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 84 | info | `icon/wrapped` | `text-sidebar-foreground/70` | Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper. |  |
