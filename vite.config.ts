import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // This is the crucial line for v4

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})