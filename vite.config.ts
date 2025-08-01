
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: '/src/index.tsx'
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8888'
    }
  }
});
