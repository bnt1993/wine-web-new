import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite config tối ưu cho Vercel
export default defineConfig({
  plugins: [react()],

  // Không cần base khi deploy lên Vercel
  server: {
    port: 5173,
    open: true
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false
  }
})
