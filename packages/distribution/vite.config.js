import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
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
