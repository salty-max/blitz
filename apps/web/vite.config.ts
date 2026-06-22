import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  // Proxy API calls to the Hono server so the SPA and API share an origin in
  // dev — the session cookie works without CORS. Only `/api/*` is proxied; the
  // SPA owns app routes like `/teams`, and team/league data lives under `/api`.
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
