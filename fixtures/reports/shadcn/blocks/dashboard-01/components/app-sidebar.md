# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 60% |
| TODOs | 0 |
| Warnings | 3 |
| Notes | 1 |
| Classes (supported / web-only / unknown / unsupported) | 3 / 2 / 0 / 0 |
| Constructs (converted / flagged) | 16 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Icons

The converted files import Tamagui-generated icons. Generate them (they need `react-native-svg` and `@tamagui/helpers-icon`):

```sh
npx @tamagui/cli icons add CameraIcon=Camera ChartBarIcon=ChartBar CircleHelpIcon=CircleHelp CommandIcon=Command DatabaseIcon=Database FileChartColumnIcon=FileChartColumn FileIcon=File FileTextIcon=FileText FolderIcon=Folder LayoutDashboardIcon=LayoutDashboard ListIcon=List SearchIcon=Search Settings2Icon=Settings2 UsersIcon=Users
```

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `class/web-only` | warning | 2 |
| `element/native-caveat` | warning | 1 |
| `icon/wrapped` | info | 1 |

## shadcn/blocks/dashboard-01/components/app-sidebar.tsx

Auto-converted 100% · 0 TODO(s) · 3 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 144 | warning | `class/web-only` | `size-5!` | `!important` classes are not resolved by Tamagui; they pass through to CSS on web and are dropped on native. | Remove the `!` and rely on class order (the last class wins in Tamagui). |
| 144 | info | `icon/wrapped` | `size-5!` | Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper. |  |
| 162 | warning | `class/web-only` | `data-[slot=sidebar-menu-button]:p-1.5!` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 164 | warning | `element/native-caveat` | `<a>` | Native caveat: native has no navigation for href, target, rel, download or referrerPolicy. |  |
