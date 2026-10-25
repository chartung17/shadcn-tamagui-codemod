# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **86.7%** |
| Native class coverage | 75% |
| TODOs | 2 |
| Warnings | 2 |
| Notes | 1 |
| Classes (supported / web-only / unknown / unsupported) | 6 / 1 / 1 / 0 |
| Constructs (converted / flagged) | 5 / 2 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Icons

The converted files import Tamagui-generated icons. Generate them (they need `react-native-svg` and `@tamagui/helpers-icon`):

```sh
npx @tamagui/cli icons add CircleCheckIcon=CircleCheck InfoIcon=Info Loader2Icon=Loader2 OctagonXIcon=OctagonX TriangleAlertIcon=TriangleAlert
```

## Diagnostics by code

| Code | Severity | Count |
| --- | --- | ---: |
| `import/web-only-package` | todo | 2 |
| `class/unknown` | warning | 1 |
| `class/web-only` | warning | 1 |
| `icon/wrapped` | info | 1 |

## shadcn/ui/sonner.tsx

Auto-converted 86.7% · 2 TODO(s) · 2 warning(s)

| Line | Severity | Code | Construct | Reason | Suggested fix |
| ---: | --- | --- | --- | --- | --- |
| 4 | todo | `import/web-only-package` | `"next-themes"` | next-themes reads and writes the DOM (`document`, `localStorage`) and does not run on native. | Switch themes with Tamagui's `TamaguiProvider defaultTheme` / `Theme` and the platform color scheme. |
| 6 | todo | `import/web-only-package` | `"sonner"` | sonner (toasts) renders DOM elements and does not run on native. | Use Tamagui `Toast` (`tamagui/toast`). |
| 23 | warning | `class/unknown` | `toaster` | Not a Tailwind utility or config token the codemod recognizes (a custom CSS class, or a value missing from the Tamagui config); it passes through on web and is dropped on native. |  |
| 36 | warning | `class/web-only` | `animate-spin` | CSS keyframe animations are web-only. | Use Tamagui's `transition` prop (and enter/exit styles) for native animation. |
| 37 | info | `icon/wrapped` | `animate-spin` | Tamagui icons take size and color as props, not classes; the other classes moved to a `View asChild` wrapper. |  |
