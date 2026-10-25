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

> **Status:** under construction. This branch contains the scaffold (CLI,
> pass runner, fixture harness). Conversion passes land milestone by milestone.

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
