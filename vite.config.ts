import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@enums": path.resolve(__dirname, "src/enums"),
      "@layout": path.resolve(__dirname, "src/layout"),
      "@routes": path.resolve(__dirname, "src/routes"),
    },
  },
});
