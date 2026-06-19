import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
      // Resolve the workspace UI lib to its source for instant HMR in dev.
      '@blitz/ui': new URL('../../packages/ui/src/index.ts', import.meta.url)
        .pathname,
    },
  },
})
