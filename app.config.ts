import { defineConfig } from '@tanstack/start/config'
import viteReact from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: { preset: 'vercel' },
  vite: { plugins: [viteReact(), tsconfigPaths()] },
})
