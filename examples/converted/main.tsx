// Web entry for the converted gallery (hand-written; src/ is codemod output).
import "@fontsource-variable/inter"
import "@tamagui/core/reset.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { TamaguiProvider } from "tamagui"

import { App } from "@/App"
import config from "./tamagui.config"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TamaguiProvider config={config} defaultTheme="light">
      <App />
    </TamaguiProvider>
  </StrictMode>
)
