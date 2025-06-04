import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  devToolbar: { enabled: false },
  i18n: {
    locales: ["es", "en", "de"],
    defaultLocale: "es",
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react()]
});
