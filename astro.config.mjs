// @ts-check
import { defineConfig } from "astro/config";
<<<<<<< HEAD

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://10xcards.pl", // Ustaw swój docelowy adres URL produkcyjny
  integrations: [react(), sitemap()],
  server: { port: 3000 },
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: node({
    mode: "standalone",
  }),
  experimental: {
    session: true,
  },
=======
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
// import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "static",
  integrations: [
    react({
      include: ["**/components/**/*.tsx"],
    }),
    tailwind(),
  ],
>>>>>>> 034686e34e475a9b379fe006e0987e4422ad57fc
});
