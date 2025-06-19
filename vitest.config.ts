// vitest.config.ts
import { defineConfig } from "vitest/config"
import vue from "@vitejs/plugin-vue"
import { fileURLToPath, URL } from "url"

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // allows `~/` → project root
      "~/": fileURLToPath(new URL("./", import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
  },
})
