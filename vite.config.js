import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
  proxy: {
    "/api": {
      target: "https://minigram-1-nzn2.onrender.com",
      changeOrigin: true,
      secure: false,
    }
  }
}
,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
