import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: [
        "src/types.ts",
        "src/db/database.types.ts",
        "src/pages/**",
        "**/*.d.ts",
      ],
    },
  },
});
