import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { App } from "./App"

// `?theme=dark` renders the dark theme (used by the screenshot script).
if (new URLSearchParams(location.search).get("theme") === "dark") {
  document.documentElement.classList.add("dark")
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
