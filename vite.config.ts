import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: "window",
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          charts: ["recharts"],
          websocket: ["@stomp/stompjs", "sockjs-client"],
          vendor: ["react", "react-dom", "react-router-dom"]
        }
      }
    }
  }
})
