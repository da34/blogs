import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import { visualizer } from 'rollup-plugin-visualizer';

// console.history(import.meta.env)
// const prod = import.meta.env.PROD
// https://vitejs.dev/config/

export default defineConfig({
  // base: '/dist/',
  // base: './',
  plugins: [
    vue(),
    visualizer()
  ],
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
        target: 'http://127.0.0.1:7001/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  // build: {
  //   target: 'es2015',
  //   terserOptions: {
  //     compress: {
  //       keep_infinity: true,
  //       drop_console: true,
  //     },
  //   },
  //   brotliSize: false,
  //   chunkSizeWarningLimit: 2000,
  //   rollupOptions: {
  //     plugins: [visualizer()],
  //   },
  // },
})
