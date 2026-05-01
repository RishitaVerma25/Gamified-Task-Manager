import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Gamified-Task-Manager/',
  plugins: [react()],
  esbuild: {
    include: /src\/.*\.[jt]sx?$/,
    loader: 'jsx',
  },
})