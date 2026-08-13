import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Various-E-Commerce-Store/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
}))
