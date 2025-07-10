// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://10xcards.pl",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: cloudflare({
    mode: "directory",
    functionPerRoute: true,
  }),
  experimental: {
    session: true,
  },
});
