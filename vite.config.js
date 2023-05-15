import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      global: true,
    }),
  ],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      //   stream: 'stream-browserify',
      //   buffer: 'buffer',
      //   utils: 'utils',
      // process: 'process/browser',
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
