// Rebuild the example sources:
//
//   1. copy the vendored shadcn/ui components and the login-01 block from
//      ../fixtures into original/src (the unmodified shadcn app);
//   2. copy original/src to converted/src and run the codemod on it, writing
//      the Tamagui config from original/src/index.css and a report;
//   3. generate the Tamagui icons the converted code imports.
//
// Run from examples/ after building the codemod (`pnpm build` in the repo root).
import { execFileSync } from "node:child_process"
import { cpSync, mkdirSync, readFileSync, rmSync } from "node:fs"
import path from "node:path"

const root = path.resolve(import.meta.dirname, "..")
const repo = path.resolve(root, "..")
const fixtures = path.join(repo, "fixtures/input/shadcn")

const UI = [
  "accordion",
  "alert-dialog",
  "avatar",
  "badge",
  "button",
  "card",
  "checkbox",
  "dialog",
  "dropdown-menu",
  "field",
  "input",
  "label",
  "popover",
  "radio-group",
  "select",
  "separator",
  "slider",
  "switch",
  "tabs",
  "textarea",
  "toggle",
  "toggle-group",
  "tooltip",
]

const original = path.join(root, "original/src")
rmSync(path.join(original, "components"), { recursive: true, force: true })
mkdirSync(path.join(original, "components/ui"), { recursive: true })
for (const name of UI) {
  cpSync(
    path.join(fixtures, "ui", `${name}.tsx`),
    path.join(original, "components/ui", `${name}.tsx`)
  )
}
cpSync(
  path.join(fixtures, "blocks/login-01/components/login-form.tsx"),
  path.join(original, "components/login-form.tsx")
)

const converted = path.join(root, "converted")
const src = path.join(converted, "src")
rmSync(src, { recursive: true, force: true })
cpSync(original, src, {
  recursive: true,
  filter: (file) => !/(^|[\\/])(index\.css|main\.tsx)$/.test(file),
})

const run = (cmd, args) =>
  execFileSync(cmd, args, {
    cwd: root,
    stdio: ["ignore", "inherit", "inherit"],
  })

run(process.execPath, [
  path.join(repo, "dist/bin.js"),
  "converted/src",
  "--write",
  "--theme-css",
  "original/src/index.css",
  "--theme-out",
  "converted/tamagui.config.ts",
  "--report",
  "converted/codemod-report.json",
])

const report = JSON.parse(
  readFileSync(path.join(converted, "codemod-report.json"), "utf8")
)
// `npx @tamagui/cli icons add A B=C` -> the arguments after `add`
const icons = report.icons.command.split(" ").slice(4)
run("npx", [
  "tamagui",
  "icons",
  "add",
  ...icons,
  "--out",
  "converted/src/components/icons",
])
