import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname),
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@workspace/personal-voice': resolve(__dirname, '../../libs/personal-voice/src/index.ts'),
      '@workspace/shared': resolve(__dirname, '../../libs/shared/src/index.ts')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 4200
  }
}); 