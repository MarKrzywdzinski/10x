// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://10xcards.pl", // Production URL
  output: "server", // Changed from static to server since we use node adapter
  integrations: [
    react({
      include: ["**/components/**/*.tsx"],
    }),
    tailwind(),
    sitemap(),
  ],
  server: { port: 3000 },
  adapter: node({
    mode: "standalone",
  }),
  experimental: {
    session: true,
  },
});
