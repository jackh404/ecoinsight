import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',  // Replace with your desired host, e.g., 'localhost'
    port: 5174,       // Replace with your desired port

  },
})
