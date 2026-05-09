import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.js'],
    format: ['esm', 'cjs'],
    splitting: false,
    clean: true,
    minify: true,
    sourcemap: true,
    outDir: 'dist',
  },
  {
    entry: ['src/index.js'],
    format: ['iife'],
    globalName: 'ChaiTailwind',
    splitting: false,
    minify: true,
    sourcemap: true,
    outDir: 'dist',
    outExtension: () => ({ js: '.global.js' }),
  },
]);
