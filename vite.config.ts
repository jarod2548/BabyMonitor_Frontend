import { defineConfig } from 'vitest/config'
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],

  define: {
    global: "window",
  },
  test: {
  environment: "jsdom",
  setupFiles: "./src/test/setup.ts",
  globals: true,

  coverage: {
    provider: "v8",
    reporter: ["text", "html", "lcov"],
    reportsDirectory: "./coverage",
    include: ["src/**/*"],
    exclude: [
      "src/test/**",
      "**/*.d.ts",
    ],
  },
},

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          charts: ["recharts"],
          websocket: ["@stomp/stompjs", "sockjs-client"],
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },

  
});