import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __API_URL: JSON.stringify(
      process.env.API_URL ?? "http://127.0.0.1:8000/"
    ),
  }
})
