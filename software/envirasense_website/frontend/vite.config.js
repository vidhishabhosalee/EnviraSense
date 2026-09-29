import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // data.gov.in (CPCB live stations) — mirrors the Netlify /ogd/* redirect in public/_redirects
      "/ogd": { target: "https://api.data.gov.in", changeOrigin: true, rewrite: (p) => p.replace(/^\/ogd/, "") },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          charts: ["recharts"],
          maplibre: ["maplibre-gl"],
        },
      },
    },
  },
});
