// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
// import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "static",
  // Usuwamy adapter cloudflare, bo nie jest potrzebny dla statycznego outputu
  // adapter: cloudflare(),
  integrations: [
    react({
      include: ["**/components/**/*.tsx"],
    }),
    tailwind(),
  ],
});
