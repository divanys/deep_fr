import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
    root: './', // корень — рабочая директория контейнера (/build)
  build: {
    outDir: 'dist'
  }
})
