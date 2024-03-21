import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
      "assets": path.resolve(__dirname, './src/assets'),
      "components": path.resolve(__dirname, './src/components'),
      "constant": path.resolve(__dirname, './src/constant'),
      "hooks": path.resolve(__dirname, './src/hooks'),
      "pages": path.resolve(__dirname, './src/pages'),
      "routes": path.resolve(__dirname, './src/routes'),
      "services": path.resolve(__dirname, './src/services'),
      "store": path.resolve(__dirname, './src/store'),
      "service": path.resolve(__dirname, './src/service'),
    }
  }
})
