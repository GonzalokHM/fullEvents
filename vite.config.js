import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
    // target despliegue
    target: 'https://fullbackevents.vercel.app',
    // target desarrollo
        // target: 'http://localhost:4001',
        
        changeOrigin: true,
        secure: false,
      },
    },
  },
});