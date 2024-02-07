import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // necesario para que funcione el mapeo de puertos del contenedor Docker
    strictPort: true,
    port: 8082, // puedes reemplazar este puerto por cualquier otro
  },
})