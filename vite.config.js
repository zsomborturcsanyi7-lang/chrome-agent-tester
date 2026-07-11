import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

// Simple plugin to copy manifest.json to dist
const copyManifest = () => ({
  name: 'copy-manifest',
  closeBundle() {
    if (!fs.existsSync('dist')) fs.mkdirSync('dist');
    fs.copyFileSync('manifest.json', 'dist/manifest.json');
    // Also copy assets if they exist
    if (fs.existsSync('assets')) {
      if (!fs.existsSync('dist/assets')) fs.mkdirSync('dist/assets');
      const files = fs.readdirSync('assets');
      files.forEach(file => {
        fs.copyFileSync(`assets/${file}`, `dist/assets/${file}`);
      });
    }
  }
});

export default defineConfig({
  base: './',
  plugins: [react(), copyManifest()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        background: resolve(__dirname, 'src/background/serviceWorker.js'),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === 'background') return 'src/background/serviceWorker.js';
          return 'assets/[name]-[hash].js';
        },
      },
    },
  },
});
