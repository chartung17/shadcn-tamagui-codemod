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
> `classes`, and the report. The other passes land milestone by milestone.

## Usage

```sh
npx shadcn-tamagui-codemod <paths/globs...> [options]
```

| Option               | Description                                        |
| -------------------- | -------------------------------------------------- |
| `--dry-run`          | Print diffs, write nothing (default).              |
| `--write`            | Apply changes in place.                            |
| `--report <file>`    | Write `<file>.json` and `<file>.md` reports.       |
| `--only <passes>`    | Comma-separated subset of passes to run.           |
| `--theme-css <file>` | Path to shadcn `globals.css` for theme generation. |

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

### Imports

The `imports` pass records where every identifier came from, so later passes
can still recognize e.g. Radix primitives after their imports are rewritten.
It flags `react-dom` imports (`createPortal`, `flushSync`, ...) as TODOs.
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

Every fixture is also checked for idempotency (running the codemod on the
expected output changes nothing). Files in `fixtures/input/safety/` contain no
Tailwind or shadcn usage and must come out byte-for-byte unchanged.

`UPDATE_EXPECTED=1 pnpm test` regenerates `fixtures/expected` from the current
output, and `pnpm test -u` updates report snapshots. Review every regenerated
file before committing.

## License

MIT
