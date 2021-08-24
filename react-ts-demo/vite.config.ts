import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import mdx, { Framework } from './plugins/vite-mdx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
  mdx({
    framework: Framework.React,
  }),
  reactRefresh({
    include: /\.(jsx|tsx|ts|mdx)/,
  })],
  resolve: {
    alias: {
      '@src': '/src'
    }
  }
})
