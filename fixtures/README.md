# Fixtures

## `input/shadcn`

Vendored, unmodified shadcn/ui sources.

- shadcn CLI: `shadcn@4.22.1`
- Style: `radix-vega` (preset `vega`, base `radix`), base color `neutral`
- Vendored on: 2026-10-24

How they were produced:

```sh
# ui components (Vite template)
npx shadcn@4.22.1 init -t vite -b radix -p vega -n app --no-monorepo -y
npx shadcn@4.22.1 add button badge card input label separator textarea dialog \
  alert-dialog popover tooltip dropdown-menu select sheet tabs accordion checkbox \
  switch radio-group slider avatar login-01 dashboard-01 sidebar-07 -y -o
# -> input/shadcn/ui is src/components/ui (includes the blocks' dependencies)

# blocks (Next template, so block pages are installed; one block at a time so
# blocks that share file names do not overwrite each other)
npx shadcn@4.22.1 init -t next -b radix -p vega -n nextapp --no-monorepo -y
npx shadcn@4.22.1 add login-01 -y -o      # -> input/shadcn/blocks/login-01
npx shadcn@4.22.1 add dashboard-01 -y -o  # -> input/shadcn/blocks/dashboard-01
npx shadcn@4.22.1 add sidebar-07 -y -o    # -> input/shadcn/blocks/sidebar-07
```

Only the files each block added (excluding `components/ui`, which comes from
the first project) were copied for that block. `data.json` was not copied.

Notes on this shadcn version:

- `cn` is imported from the `cn` npm package (`import { cn } from "cn"`);
  `@/lib/utils` only re-exports it.
- Radix primitives come from the unified `radix-ui` package
  (`import { Dialog as DialogPrimitive } from "radix-ui"`).

## `theme`

The generated `globals.css` / `index.css` from the two projects above, used by
the theme generator tests.

## `input/cases`

Small hand-written inputs that exercise one feature each.

## `input/safety`

Files without Tailwind or shadcn usage. They must come out byte-for-byte
unchanged.

## `expected`, `reports`

`expected/**` mirrors `input/**` with the converted output. `reports/**` holds
the Markdown report for each fixture. Both are reviewed by hand; see the
README for how to regenerate them.
