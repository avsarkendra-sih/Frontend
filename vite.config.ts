import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), 
    },
  },
  css: {
    postcss: "./postcss.config.js",
    devSourcemap: true, // Add this
  },
  server: {
    // Add this to prevent caching during development
    headers: {
      'Cache-Control': 'no-store',
    },
  },
});