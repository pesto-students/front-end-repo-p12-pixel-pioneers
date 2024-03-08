import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import proxy from "./setupProxy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Specify your desired port
  },
  configureServer: [proxy],
});
