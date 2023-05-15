import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import * as path from 'path';
import { cpus } from 'os';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      global: true,
    }),
    sourcemapExclude({ excludeNodeModules: true }),
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

    rollupOptions: {
      //   sourcemap: mode === 'development' || 'hidden',

      maxParallelFileOps: 2,
      //   maxParallelFileOps: Math.max(1, cpus().length - 1),
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        sourcemapIgnoreList: (relativeSourcePath) => {
          const normalizedPath = path.normalize(relativeSourcePath);
          return normalizedPath.includes('node_modules');
        },
      },
      cache: false,
    },
  },
});

export function sourcemapExclude(opts) {
  return {
    name: 'sourcemap-exclude',
    transform(code, id) {
      if (opts?.excludeNodeModules && id.includes('node_modules')) {
        return {
          code,
          // https://github.com/rollup/rollup/blob/master/docs/plugin-development/index.md#source-code-transformations
          map: { mappings: '' },
        };
      }
    },
  };
}
