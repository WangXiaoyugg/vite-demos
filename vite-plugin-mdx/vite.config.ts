import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import reactRefresh from '@vitejs/plugin-react-refresh';
import viteMdx  from './src';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ viteMdx(), vueJsx({
      include: /\.(jsx|tsx|mdx)/
    }),
  ],
  resolve: {
    alias: {
      "vite-mdx": '/src'
    }
  }
})
