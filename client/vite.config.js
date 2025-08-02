import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/reviews': 'http://localhost:5000', // Proxy API requests to the backend
    },
    preview: {
      port: 3000
    }
  },
  build: {
    // Custom output directory
    outDir: 'dist', // You can change this if you want a different directory
    rollupOptions: {
      output: {
        // Control the naming of output files with hashed filenames
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
});
