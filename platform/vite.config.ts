import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import dsv from '@rollup/plugin-dsv' 

export default defineConfig({
  plugins: [
    solidPlugin(),
    dsv(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  optimizeDeps: { include: ["mapbox-gl"] },
});
