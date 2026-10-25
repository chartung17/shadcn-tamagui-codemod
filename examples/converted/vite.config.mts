import path from "node:path"
import { tamaguiPlugin } from "@tamagui/tailwind/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// The codemod's output (src/), rendered on web with Tamagui's Tailwind frontend.
export default defineConfig({
  root: import.meta.dirname,
  plugins: [
    react(),
    tamaguiPlugin({
      config: "./tamagui.config.ts",
      components: ["tamagui", "@tamagui/tailwind"],
    }),
  ],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
})
