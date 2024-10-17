import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Esto permite que el servidor escuche en todas las interfaces de red
    port: 3000, // Cambia esto según el puerto que desees
  },
})
