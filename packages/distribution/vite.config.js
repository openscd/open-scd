import { defineConfig } from "vite";
import dynamicImport from "vite-plugin-dynamic-import";

export default defineConfig({
  plugins: [dynamicImport()],
  server: {
    cors: {
      origin: '*', // Allow all origins
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
      credentials: true,
    }
  },
  build: {
    outDir: "build",
    target: "es2022",
    module: "es2022",
    moduleResolution: "node"
  }
})
