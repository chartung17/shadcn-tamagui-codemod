# shadcn-tamagui-codemod

A codemod that rewrites React components styled with Tailwind (including
[shadcn/ui](https://ui.shadcn.com) components and blocks) into
[Tamagui v3](https://tamagui.dev) components that run on web and native.

It targets `@tamagui/tailwind`: Tailwind classes stay on `className`, and
intrinsic elements become Tamagui's `html.*` elements (React Strict DOM
semantics), which render semantic HTML on web and React Native primitives on
native.

The tool rewrites source files in place and is meant to be reviewed as a diff.
Anything it cannot convert safely is left in place, marked with a
`// TODO(native): ...` comment, and listed in the report.

> **Status:** under construction. Implemented passes: `imports`, `elements`,
> `classes`, `cn-cva`, `selectors`, `radix`, `icons`, theme generation and the report. Example apps come next. The other passes land milestone by milestone.

## Usage

```sh
npx shadcn-tamagui-codemod <paths/globs...> [options]
```

| Option                    | Description                                                                  |
| ------------------------- | ---------------------------------------------------------------------------- |
| `--dry-run`               | Print diffs, write nothing (default).                                        |
| `--write`                 | Apply changes in place.                                                      |
| `--report <file>`         | Write `<file>.json` and `<file>.md` reports.                                 |
| `--only <passes>`         | Comma-separated subset of passes to run.                                     |
| `--theme-css <file>`      | Path to shadcn `globals.css` for theme generation.                           |
| `--theme-out <file>`      | Where to write the generated Tamagui config (default `tamagui.config.ts`).   |
| `--icons-import <module>` | Module the generated icons are imported from (default `@/components/icons`). |

Paths can be files, directories (scanned for `.tsx`, `.ts`, `.jsx`, `.js`) or
globs. `node_modules`, `dist`, `build`, `.next` and `.d.ts` files are skipped.
Changed files are formatted with the target project's Prettier config.

### Diagnostics

Every diagnostic has a severity:

| Severity  | Meaning                                                                    | Inline comment         |
| --------- | -------------------------------------------------------------------------- | ---------------------- |
| `todo`    | Cannot be converted safely; needs a human.                                 | `// TODO(native): ...` |
| `warning` | Kept as is. Works on web, but behaves differently or is dropped on native. | none                   |
| `info`    | A note about something the codemod changed.                                | none                   |

## Architecture

The codemod is a list of ordered passes. Each per-file pass is a function
`(SourceFile, PassContext) => { changed, diagnostics }` over a
[ts-morph](https://ts-morph.com) AST:

1. `imports`: `react` DOM usage, `@radix-ui/*`, `@/components/ui/*`,
   `lucide-react`, `class-variance-authority`, `@/lib/utils` (`cn`)
2. `elements`: intrinsic JSX to `html.*` / `View` / `Text`
3. `classes`: class analysis against the support table
4. `cn-cva`: `cn()` and `cva()`
5. `selectors`: state, theme and responsive variants
6. `radix`: Radix-based shadcn components to Tamagui components
7. `icons`: `lucide-react` to Tamagui's Lucide icons

Project-level steps: `theme` (shadcn `globals.css` to a Tamagui config) and
`report`.

Only files that use Tailwind or shadcn (a `className` attribute, or an import
of `radix-ui`, `@radix-ui/*`, `components/ui/*`, `lib/utils`, `cn`, `clsx`,
`tailwind-merge`, `class-variance-authority` or `lucide-react`) are touched.

### Elements

Intrinsic elements map to `html.*` from `@tamagui/tailwind`. The element table
in `src/data/html-elements.json` is generated from `@tamagui/dom` (the tables
the Tamagui compiler and runtime use) with `pnpm generate:data`, and a test
fails if it drifts from the installed version.

- Every one of the 49 `html.*` tags is mapped, and so are component variables
  (`const Comp = asChild ? Slot.Root : "button"`) and
  `React.ComponentProps<"div">`-style types (to `typeof html.div`).
- A `div`/`span` becomes `View` only when it is clearly a flex container: an
  unconditional `flex` class, only element children (React Native cannot
  render raw text inside a `View`), and no prop spread or `ref`. Because
  `View` is a column on every platform, `flex-row` is added when the classes
  rely on Tailwind's default row direction. Everything else stays `html.*`,
  whose native compiler applies browser block/flex defaults.
- `html.select`/`option`/`optgroup` and non-text `<input type>`s fail native
  builds and get a TODO. Tags with no `html.*` equivalent (`table` and its
  parts, `svg`, `small`, `legend`, `style`, ...) are left as they are with a
  TODO on the outermost one.
- Native caveats from the table (no `href` navigation, no `htmlFor`
  association, no form submission) are reported as warnings.

> `html.*` on native requires the Tamagui compiler; see the Tamagui docs on
> HTML elements.

### Class analysis and the support table

The `classes` pass reads every static class: `className` (and `*ClassName`)
props, `cn()`/`clsx()` arguments (following conditionals, `&&`, arrays and
clsx object keys, but not comparison operands), `cva()` bases and variants,
and `styled()` from `@tamagui/tailwind`. Classes are left as written; each one
is classified against `src/data/tailwind-support.json`:

| Status        | Meaning                                                                                           | Severity |
| ------------- | ------------------------------------------------------------------------------------------------- | -------- |
| `supported`   | Resolved by Tamagui on web and native.                                                            | none     |
| `web-only`    | Works on web (Tamagui or Tailwind CSS), dropped on native.                                        | warning  |
| `unknown`     | Not a utility/token the table knows (custom CSS class, Tailwind v4 value without a config token). | warning  |
| `unsupported` | Its meaning is lost on native and needs a human (`before:`/`after:` content).                     | TODO     |

Class names assembled at runtime (`` `text-${color}-500` ``) get a TODO.

The table has three parts:

- **Utilities**: exact classes (`flex`, `grid`, `sr-only`, ...).
- **Prefix rules**: a prefix plus the value kinds it accepts (spacing tokens,
  colors, fractions, arbitrary values, ...).
- **Variants**: interaction states, themes, media queries, platforms, `group-*`.

Values are checked against the token, theme and media names of the config the
theme pass generates: `@tamagui/config/v6` (see `src/data/config-tokens.json`,
generated) extended with shadcn's theme variables and Tailwind's `2xl`
breakpoint. Arbitrary values that use `var()`, `min()`, `color-mix()` and
similar functions are web-only because native cannot evaluate them; `calc()`,
`clamp()`, `rem` and viewport units do resolve on native.

**The table is tested against Tamagui itself.** `test/support-oracle.test.ts`
resolves every class in the fixtures (plus `test/oracle/extra-classes.json`)
with `@tamagui/tailwind`'s react-native build and fails if a class produces
native styles but the table does not call it `supported`, or the other way
round. Utilities and variants are checked separately.

To extend the table, add an entry, add example classes to
`test/oracle/extra-classes.json`, and run `pnpm test`.

### Report

`--report <file>` writes `<file>.json` and `<file>.md`. Each diagnostic has
the file, line and column (in the output file), severity, code, the class or
construct, the reason and a suggested fix. Totals include:

- **Auto-converted %**: classes and constructs (elements, components, imports)
  that needed no TODO, as a share of all of them.
- **Native class coverage %**: class occurrences that resolve on native as well
  as web.

Diagnostics for the same string and reason are grouped into one row.

### cn() and cva()

- `cn()`/`clsx()` calls whose arguments are all static strings are inlined
  (`className={cn("a", "b")}` becomes `className="a b"`). Calls with
  conditions keep a runtime `cn()`: it returns a class string, which Tamagui
  resolves at runtime on web and native (the last class wins, as with
  `tailwind-merge`). Unused `cn` imports are removed.
- `cva()` becomes `styled(<element>, base, { variants, defaultVariants })` from
  `@tamagui/tailwind` when it is static, has no `compoundVariants`, uses no
  TODO-level classes, is not exported, and styles exactly one `html.*`/`View`
  element. The element gets the variant props, `VariantProps<typeof x>`
  becomes `GetTailwindVariantProps<typeof Frame>`, and `cva`/`cn` imports are
  cleaned up. Otherwise the `cva()` is kept, with a warning naming the reason;
  its classes still apply at runtime through `className`.
- **`asChild` components keep `cva()`.** Tamagui's `asChild` forwards styles
  that come from `className`, but not a `styled()` component's base or variant
  styles (`test/runtime.test.ts` pins this). So shadcn's `Button`, `Badge`
  and `SidebarMenuButton` keep their `cva()` class strings and render
  `<html.button asChild={asChild} className={cn(buttonVariants(...))}>`.

### Selectors and state variants

`hover:`, `active:` (Tamagui's `press:`), `focus:`, `focus-visible:`,
`focus-within:`, `disabled:`, `dark:`, configured breakpoints and `group-hover:`
style states work as written. The `selectors` pass rewrites two cases that have
a cross-platform form:

- `inline-flex` without a direction gets `flex-row`, because native drops
  `inline-flex` and would lay the children out as a column.
- `placeholder:text-<color>` gets a `placeholder-<color>` twin, which maps to
  `placeholderTextColor` on native. The original stays for web.

`group-*` (other states), `peer-*`, `data-*`, `aria-*`, `has-*` and arbitrary
`[&...]` variants are reported as web-only; `before:`/`after:` get a TODO.

### asChild and Slot

`const Comp = asChild ? Slot.Root : html.button` plus `<Comp ...>` becomes
`<html.button asChild={asChild} ...>`: Tamagui components implement `asChild`
on web and native, while Radix `Slot` is DOM-only. Other `Slot` uses get a TODO.

### Radix components

Radix primitives are replaced with Tamagui's unstyled UI primitives from
`tamagui/unstyled` (shadcn supplies all styling as classes), using the mapping
table in `src/mappings/radix.ts`:

| Radix                                                                       | Tamagui                   | Notes                                                                                                                           |
| --------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Dialog (Root, Trigger, Portal, Overlay, Content, Title, Description, Close) | `Dialog`                  | `onOpenAutoFocus`/`onCloseAutoFocus` removed (Tamagui uses `Dialog.FocusScope`)                                                 |
| Popover (Root, Trigger, Anchor, Content, Close, Arrow; Portal removed)      | `Popover`                 | Content positioning props (`side`, `align`, `sideOffset`, ...) removed; Tamagui positions from the root (`placement`, `offset`) |
| Tooltip (Provider, Root, Trigger, Content, Arrow; Portal removed)           | `TooltipGroup`, `Tooltip` | `delayDuration` becomes `delay`; Tooltip only provides accessibility output on native                                           |
| Tabs (Root, List, Trigger, Content)                                         | `Tabs`                    | `Trigger` becomes `Tabs.Tab`                                                                                                    |
| Checkbox (Root, Indicator)                                                  | `Checkbox`                |                                                                                                                                 |
| Switch (Root, Thumb)                                                        | `Switch`                  |                                                                                                                                 |

The import keeps its local name (`import { Dialog as DialogPrimitive } from
"tamagui/unstyled"`), so `DialogPrimitive.Root` becomes `DialogPrimitive` and
`React.ComponentProps<typeof DialogPrimitive.Content>` keeps working. Both
`radix-ui` and namespace imports of `@radix-ui/react-*` are handled.

**Classes on primitives.** Tamagui UI primitives use the style-props frontend:
a raw `className` on them is passed through to the DOM but not parsed, so it
would be lost on native. Every part that receives `className` is therefore
wrapped once per file with `styled()` from `@tamagui/tailwind`, through a small
typed helper the codemod adds:

```tsx
const tw = <C extends React.ComponentType<any>>(component: C) =>
  styled(component as never) as unknown as React.ComponentType<React.ComponentProps<C>>
const StyledDialogContent = tw(DialogPrimitive.Content)
```

`test/runtime.test.ts` pins this behavior (and that Tamagui still sets
`data-state`, which shadcn's `data-open:`/`data-checked:` variants use on web).
Tamagui does not document `styled()` over UI kit components in Tailwind mode,
so this is the part of the output most likely to need attention after a
Tamagui upgrade.

Radix CSS variables are renamed where Tamagui has an equivalent
(`--radix-popover-trigger-width` to `--tamagui-popper-anchor-width`,
`...-content-available-height` to `--tamagui-popper-available-height`); the
others are reported. Radix components without a mapping (or imported part by
part) stay on Radix and get a TODO.

To extend the mappings, add an entry to `RADIX_MAPPINGS` (Tamagui part names
come from the component docs and the `tamagui/unstyled` exports), run
`pnpm test` (`test/mappings.test.ts` fails if a part does not exist), and add a
fixture.

### Icons

Tamagui v3 ships no icon package: you generate typed icon components for the
icons you use with `npx @tamagui/cli icons add ...` (they need
`react-native-svg` and `@tamagui/helpers-icon`). The `icons` pass:

- points `lucide-react` imports at the generated icons
  (`--icons-import`, default `@/components/icons`), keeping every imported
  name, and prints the generation command, e.g.
  `npx @tamagui/cli icons add ChevronDownIcon=ChevronDown XIcon=X`, in the CLI
  output and the report (`Name=Source` keeps shadcn's `...Icon` names);
- turns icon classes into icon props (`size-4` to `size={16}`,
  `text-muted-foreground` to `color="muted-foreground"`, `fill-*`,
  `opacity-*`, `stroke-*`). Tamagui icons do not take classes, so any other
  classes move to a `<View asChild className="...">` wrapper, which applies
  them to the icon on web and native;
- maps the `LucideIcon`/`LucideProps` types to `IconProps` from
  `@tamagui/helpers-icon`.

Known limitation: shadcn sizes icons inside some components with
`[&_svg:not([class*='size-'])]:size-4`. An icon whose size became a prop no
longer has a `size-*` class, so on web that rule overrides it.

### Theme

`--theme-css <file>` reads the shadcn `globals.css` (`:root`, `.dark`,
`@theme inline`) and generates a Tamagui config (`--theme-out`, default
`tamagui.config.ts`; printed as a diff in dry runs):

- `@tamagui/config/v6` (Tailwind-aligned tokens and breakpoints) as the base;
- every shadcn color variable added to every light and dark theme (sub-themes
  included), so `bg-primary` and `dark:bg-sidebar` resolve. `oklch()`/`oklab()`
  colors are converted to hex (or `rgba()` with alpha) because native cannot
  parse them; bare HSL channels from older shadcn themes become `hsl()`;
- radius tokens from `--radius-*` (`calc(var(--radius) * 0.6)` is evaluated);
- Tailwind's `2xl`/`max-2xl` breakpoints;
- `--font-sans`/`--font-heading` as the body and heading font families (these
  must also be loaded on native).

The theme's color names are also fed into the class analysis. The generated
configs for the vendored CSS are in `fixtures/theme/expected` and are
type-checked by `pnpm typecheck:fixtures`.

### Imports

The `imports` pass records where every identifier came from, so later passes
can still recognize e.g. Radix primitives after their imports are rewritten.
It flags `react-dom` imports (`createPortal`, `flushSync`, ...) and DOM-only
packages that shadcn code commonly uses (vaul, sonner, recharts, next-themes,
@dnd-kit, next/link; see `src/data/web-only-packages.json`) as TODOs.
`@/components/ui/*` imports are kept: the shadcn components themselves are
converted in place, so their import paths stay valid.

Diagnostics are anchored to AST nodes while passes run. At the end the runner
inserts TODO comments, formats with Prettier, and maps every diagnostic to its
line and column in the output file.

### Why ts-morph

ts-morph wraps the TypeScript compiler API, so the codemod parses `.tsx`
exactly as TypeScript does, including newer syntax such as `satisfies` and
`const` type parameters. Its typed node guards (`Node.isJsxAttribute`, ...) make
pass code checked by the compiler, and its import helpers (`addImportDeclaration`,
`getNamedImports`) cover most of the import rewriting. jscodeshift's
recast-based printer preserves formatting better, but this tool formats changed
files with Prettier anyway, so that advantage does not apply here.

## Development

```sh
pnpm install
pnpm check        # typecheck, lint, format check, tests
pnpm build
pnpm generate:data # regenerate src/data from installed Tamagui packages (Node >= 22.18)
node dist/bin.js fixtures/input --report /tmp/report
```

Tests are fixture-driven:

- `fixtures/input/**`: source files (vendored shadcn sources and hand-written cases)
- `fixtures/expected/**`: hand-reviewed expected output
- `fixtures/reports/**`: Markdown report snapshots

`pnpm typecheck:fixtures` type-checks the converted fixtures listed in
`fixtures/tsconfig.typecheck.json` (28 shadcn ui components and several cases)
against the real Tamagui packages. Not listed: `sidebar.tsx`, whose converted
output has four type errors that need a manual fix (DOM-typed `{...props}`
spread onto the Sheet root, `dir` typed as `string`, `hidden` on
`TooltipContent`, and a `CSSProperties` cast on a wider `style` type), and files
that need recharts, vaul, sonner, next-themes or dnd-kit.

Every fixture is also checked for idempotency (running the codemod on the
expected output changes nothing). Files in `fixtures/input/safety/` contain no
Tailwind or shadcn usage and must come out byte-for-byte unchanged.

`UPDATE_EXPECTED=1 pnpm test` regenerates `fixtures/expected` from the current
output, and `pnpm test -u` updates report snapshots. Review every regenerated
file before committing.

### Examples

[`examples/`](examples/README.md) renders a shadcn/ui gallery and the
`login-01` block three ways: the original shadcn app, the codemod's output on web
(Vite), and the same output on iOS and Android (Expo). It has a screenshot
script for comparing the two web apps and lists the differences found so far.
After a change to the codemod's output, run `npm run sync` in `examples/` and
commit the result. The Examples CI workflow fails when the committed output is
stale.

## License

MIT, see [LICENSE](LICENSE).
