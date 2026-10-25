# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **98%** |
| Native class coverage | 84.9% |
| TODOs | 6 |
| Warnings | 33 |
| Notes | 26 |
| Classes (supported / web-only / unknown / unsupported) | 202 / 35 / 1 / 0 |
| Constructs (converted / flagged) | 51 / 6 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Icons

The converted files import Tamagui-generated icons. Generate them (they need `react-native-svg` and `@tamagui/helpers-icon`):

```sh
npx @tamagui/cli icons add ChevronDownIcon=ChevronDown ChevronLeftIcon=ChevronLeft ChevronRightIcon=ChevronRight ChevronsLeftIcon=ChevronsLeft ChevronsRightIcon=ChevronsRight CircleCheckIcon=CircleCheck Columns3Icon=Columns3 EllipsisVerticalIcon=EllipsisVertical GripVerticalIcon=GripVertical LoaderIcon=Loader PlusIcon=Plus TrendingUpIcon=TrendingUp
```

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `import/web-only-package` | todo | 6 |
| `class/web-only` | warning | 30 |
| `element/native-caveat` | warning | 2 |
| `class/unknown` | warning | 1 |
| `element/view` | info | 14 |
| `selector/rewrite` | info | 6 |
| `selector/web-state` | info | 3 |
| `selector/web-color` | info | 2 |
| `icon/wrapped` | info | 1 |

## shadcn/blocks/dashboard-01/components/data-table.tsx

Auto-converted 98% · 6 TODO(s) · 33 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 5 | todo | `import/web-only-package` | `"@dnd-kit/core"` | @dnd-kit uses DOM pointer events and does not run on native. | Use react-native-gesture-handler/reanimated based drag and drop on native, or keep this web-only. |
| 17 | todo | `import/web-only-package` | `"@dnd-kit/modifiers"` | @dnd-kit uses DOM pointer events and does not run on native. |  |
| 19 | todo | `import/web-only-package` | `"@dnd-kit/sortable"` | @dnd-kit uses DOM pointer events and does not run on native. | Use react-native-gesture-handler/reanimated based drag and drop on native, or keep this web-only. |
| 26 | todo | `import/web-only-package` | `"@dnd-kit/utilities"` | @dnd-kit uses DOM pointer events and does not run on native. |  |
| 46 | todo | `import/web-only-package` | `"recharts"` | recharts renders SVG through the DOM and does not run on native. | Use a React Native charting library (e.g. victory-native) for native, or keep charts web-only in a `.web.tsx` file. |
| 48 | todo | `import/web-only-package` | `"sonner"` | sonner (toasts) renders DOM elements and does not run on native. | Use Tamagui `Toast` (`tamagui/toast`). |
| 159 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 173 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 185 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 218 | info | `icon/wrapped` | `dark:fill-green-400` | Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper. |  |
| 234 | warning | `element/native-caveat` | `<form>` | Native caveat: renders as a container on native; there is no form submission, validation or reset. |  |
| 244 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 258 | warning | `element/native-caveat` | `<form>` | Native caveat: renders as a container on native; there is no form submission, validation or reset. |  |
| 268 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 290 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 295 | warning | `class/unknown` | `w-38` | `38` is not a spacing/size token in the generated Tamagui config, so it is not resolved on native. | Use `w-[9.5rem]` or add a `38` token to the config. |
| 295 | warning | `class/web-only` | `**:data-[slot=select-value]:block **:data-[slot=select-value]:truncate` | Descendant selectors (`**:`) are web-only. |  |
| 321 | warning | `class/web-only` | `data-[state=open]:bg-muted` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 321 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 321 | info | `selector/web-color` | `data-[state=open]:bg-muted` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 325 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 354 | warning | `class/web-only` | `data-[dragging=true]:z-10 data-[dragging=true]:opacity-80` | `data-*` attribute selectors are web-only, so this style does not apply on native. | Drive the style from a prop or state instead (e.g. a styled() variant). |
| 354 | info | `selector/web-state` | `data-[dragging=true]:z-10 data-[dragging=true]:opacity-80` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 434 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 435 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 440 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 440 | warning | `class/web-only` | `@4xl/main:hidden` | Only container queries named after configured media queries work on native. |  |
| 440 | info | `selector/rewrite` | `flex-row` | Added `flex-row`: Tamagui views and native lay out a `flex` container as a column. |  |
| 440 | info | `selector/web-state` | `@4xl/main:hidden` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 455 | warning | `class/web-only` | `**:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1` | Descendant selectors (`**:`) are web-only. |  |
| 455 | warning | `class/web-only` | `@4xl/main:flex` | Only container queries named after configured media queries work on native. |  |
| 455 | info | `selector/web-color` | `**:data-[slot=badge]:bg-muted-foreground/30` | Theme colors in classes Tamagui leaves to Tailwind on web now read Tamagui's theme variables (`bg-(--primary)`): Tailwind compiles them with its default theme, which has no shadcn colors. |  |
| 455 | info | `selector/web-state` | `@4xl/main:flex` | Marked `!important`: Tamagui renders the base classes of a runtime className as inline styles, which a state variant (`data-*:`, `aria-*:`) has to beat on web. |  |
| 465 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 506 | warning | `class/web-only` | `lg:inline` | React Native has no inline layout; `display: inline` is dropped on native. |  |
| 512 | warning | `class/web-only` | `overflow-auto` | `overflow: auto` is dropped on native; views do not scroll. | Wrap scrollable content in a ScrollView. |
| 514 | info | `selector/rewrite` | `border-border` | Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
| 523 | warning | `class/web-only` | `sticky` | `position: sticky` is dropped on native. |  |
| 538 | warning | `class/web-only` | `**:data-[slot=table-cell]:first:w-8` | Descendant selectors (`**:`) are web-only. |  |
| 562 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 567 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 567 | warning | `class/web-only` | `lg:w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 592 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 596 | info | `element/view` | `<div>` | Flex container converted to `View`; `flex-row` added because `View` is a column by default. |  |
| 603 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 613 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 623 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 633 | warning | `class/web-only` | `sr-only` | `sr-only` relies on clipping CSS that native drops, so the element becomes visible. | Render the text only on web (e.g. `web:sr-only native:hidden`) or move it into `aria-label`. |
| 646 | info | `selector/rewrite` | `border-border` | Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
| 649 | info | `selector/rewrite` | `border-border` | Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
| 655 | info | `selector/rewrite` | `border-border` | Added `border-border`: shadcn gives every border that color in its base CSS, and native defaults to black. |  |
| 687 | warning | `class/web-only` | `w-fit` | `min-content`/`max-content`/`fit-content` sizing is dropped on native. |  |
| 698 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 698 | warning | `class/web-only` | `overflow-y-auto` | `overflow-y` is not supported on native. | Use a ScrollView. |
| 742 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 760 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 764 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 764 | warning | `class/web-only` | `grid-cols-2` | CSS grid is not available on native. |  |
| 765 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 793 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 809 | warning | `class/web-only` | `grid` | CSS grid is not available on native; grid classes are dropped there. | Use flex rows/columns (or `web:grid native:flex`) for layouts that must match on native. |
| 809 | warning | `class/web-only` | `grid-cols-2` | CSS grid is not available on native. |  |
| 810 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 814 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
| 819 | info | `element/view` | `<div>` | Flex container converted to `View`. |  |
