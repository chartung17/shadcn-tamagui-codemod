# shadcn-tamagui-codemod report

| | |
| --- | ---: |
| Files scanned | 1 |
| Files changed | 1 |
| **Auto-converted** | **100%** |
| Native class coverage | 100% |
| TODOs | 0 |
| Warnings | 0 |
| Notes | 0 |
| Classes (supported / web-only / unknown / unsupported) | 0 / 0 / 0 / 0 |
| Constructs (converted / flagged) | 10 / 0 |

*Auto-converted*: classes and constructs (elements, components, imports) that needed no `TODO(native)`.
*Native class coverage*: class occurrences that resolve on native as well as web.

## Icons

The converted files import Tamagui-generated icons. Generate them (they need `react-native-svg` and `@tamagui/helpers-icon`):

```sh
npx @tamagui/cli icons add AudioLinesIcon=AudioLines BookOpenIcon=BookOpen BotIcon=Bot FrameIcon=Frame GalleryVerticalEndIcon=GalleryVerticalEnd MapIcon=Map PieChartIcon=PieChart Settings2Icon=Settings2 TerminalIcon=Terminal TerminalSquareIcon=TerminalSquare
```
