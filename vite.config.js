import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
    // target desarrollo
    target: 'https://fullbackevents.vercel.app',
    // target despliegue
        // target: 'http://localhost:4001',
        
        changeOrigin: true,
      },
    },
  },
});