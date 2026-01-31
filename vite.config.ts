// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// NOTE: Với GitHub Pages ở https://<user>.github.io/<repo>/ cần base = '/<repo>/'
export default defineConfig({
  plugins: [react()],
  base: '/wine-web-new/',     // <== thay bằng đúng tên repo của bạn
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false
  }
})
