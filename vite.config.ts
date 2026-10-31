import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from 'nitro/vite'
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base:'/',
  plugins: [
    tailwindcss(),
    tanstackStart(), // Must come before react plugin
   nitro({
      preset: 'vercel',
    }),
    viteReact(),
  ],
  resolve: {
    tsconfigPaths:true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});