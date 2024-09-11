/** Vendor */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/** Config https://vitejs.dev/config/ */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("src"),
    },
  },
});
