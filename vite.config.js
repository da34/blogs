import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  // base: VITE_PUBLIC_PATH,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/vars.scss";'
      }
    }
  },
  server: {
    port: 4001,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001/api/admin/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  build: {
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
      },
    }
  },
})
