import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
  },
  esbuild: {
    jsxImportSource: 'phaser-jsx',
  },
});
