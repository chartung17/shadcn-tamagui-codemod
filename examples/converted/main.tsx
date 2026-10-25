// Web entry for the converted gallery (hand-written; src/ is codemod output).
import "@fontsource-variable/inter"
import "@tamagui/core/reset.css"
import { html } from "@tamagui/tailwind"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { TamaguiProvider } from "tamagui"

import { App } from "@/App"
import config from "./tamagui.config"

// `?theme=dark` renders the dark theme (used by the screenshot script).
const theme =
  new URLSearchParams(location.search).get("theme") === "dark"
    ? "dark"
    : "light"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TamaguiProvider config={config} defaultTheme={theme}>
      {/* What the original's base CSS gives <body>. */}
      <html.div className="min-h-svh bg-background text-foreground">
        <App />
      </html.div>
    </TamaguiProvider>
  </StrictMode>
)
