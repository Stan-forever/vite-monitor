import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
  ],
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
      },
      '/wikipedia-api': {
        target: 'http://112.5.142.51:14007/api',
        changeOrigin: true,
        rewrite: (path) => path.replace('/wikipedia-api', '')
      }
    }
  },
  esbuild: {
    pure: ['console.log', 'debugger']
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
    // minify: "terser",
    // terserOptions: {
    // 	compress: {
    // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
    // 		drop_debugger: true
    // 	}
    // },
    sourcemap: false,
    // 禁用 gzip 压缩大小报告，可略微减少打包时间
    reportCompressedSize: false,
    // 规定触发警告的 chunk 大小
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // Static resource classification and packaging
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
