import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { configSvgIconsPlugin } from './vite-config/svgSprite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    proxy: {
      "/fonts": {
        target: "https://rtal.oss-on-hangzhou_aliyunos.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fonts/, ""),
      },
    },
  },
  plugins: [vue(), vueJsx(), UnoCSS(), configSvgIconsPlugin({ isBuild: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/style/color.less')}";`
        },
        javascriptEnabled: true
      }
    }
  }
})
