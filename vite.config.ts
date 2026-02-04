import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { ghPages } from 'vite-plugin-gh-pages'

export default defineConfig({
  base: '/SaaSoft/',
  plugins: [
    vue(),
    vueDevTools(),
    ghPages({
      branch: 'gh-pages',
      repo: 'https://github.com/sergei00026/SaaSoft.git',
      dotfiles: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

})
