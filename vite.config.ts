import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src') //引入别名
    }
  },
  server: {
    port: 9091,
    proxy: {
      '/api': {
        target: 'https://192.168.96.101:9200/', //开发环境
        changeOrigin: false,
        secure: false, // 添加本行内容修复错误
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
