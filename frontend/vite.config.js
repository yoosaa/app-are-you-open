import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../backend/app/templates'
  },
  server: {
    proxy: {
      '^/api': {
        target: 'http://localhost',
        changeOrigin: true
      }
    }
  }
})
