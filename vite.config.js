import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
    // target desarrollo
    target: 'http://localhost:4001',
    // target despliegue
        // target: 'https://full1.vercel.app',
        
        changeOrigin: true,
      },
    },
  },
});