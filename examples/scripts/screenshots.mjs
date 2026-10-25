// Screenshot the original and converted web builds side by side.
//
//   npm run build && npm run screenshots
//
// Uses playwright-core; point CHROMIUM_PATH at a Chromium binary, or run
// `npx playwright-core install chromium` once. Writes screenshots/<app>/*.png
// and prints any console errors from the page.
import { mkdirSync } from "node:fs"
import path from "node:path"
import { chromium } from "playwright-core"
import { preview } from "vite"

const root = path.resolve(import.meta.dirname, "..")
const APPS = ["original", "converted"]

/** Overlays to open: [name, trigger text, action]. */
const OVERLAYS = [
  ["dialog", "Open dialog", "click"],
  ["alert-dialog", "Open alert", "click"],
  ["popover", "Open popover", "click"],
  ["tooltip", "Hover for tooltip", "hover"],
  ["dropdown-menu", "Open menu", "click"],
  ["select", "Select a fruit", "click"],
]

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
})
let failed = false
for (const [index, app] of APPS.entries()) {
  const server = await preview({
    root: path.join(root, app),
    configFile: path.join(root, app, "vite.config.mts"),
    preview: { port: 4170 + index, strictPort: true },
    logLevel: "warn",
  })
  const url = server.resolvedUrls.local[0]
  const out = path.join(root, "screenshots", app)
  mkdirSync(out, { recursive: true })

  const page = await browser.newPage({ viewport: { width: 1024, height: 900 } })
  const errors = []
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text())
  })
  page.on("pageerror", (error) => errors.push(String(error)))

  const open = async () => {
    await page.goto(url, { waitUntil: "networkidle" })
    await page.evaluate(() => document.fonts.ready)
  }
  await open()
  await page.screenshot({ path: path.join(out, "gallery.png"), fullPage: true })

  for (const [name, text, action] of OVERLAYS) {
    await open()
    const trigger = page.getByText(text, { exact: true }).first()
    await trigger.scrollIntoViewIfNeeded()
    if (action === "hover") await trigger.hover()
    else await trigger.click()
    await page.waitForTimeout(800)
    await page.screenshot({ path: path.join(out, `${name}.png`) })
  }

  console.log(`${app}: ${url} -> ${path.relative(root, out)}`)
  for (const error of new Set(errors)) {
    failed = true
    console.log(`  console error: ${error.slice(0, 300)}`)
  }
  await page.close()
  await server.close()
}
await browser.close()
process.exitCode = failed ? 1 : 0
