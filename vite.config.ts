import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'node20',
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
      // Exclude GitHub Actions toolkit libraries that are available in the runtime
      external: ['@actions/core', '@actions/github'],
    },
  },
});
