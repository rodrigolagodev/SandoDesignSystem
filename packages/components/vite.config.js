import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: process.env.VITE_COMPONENTS_PORT || 5173,
    open: false
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'utils/index': resolve(__dirname, 'src/utils/index.ts'),
        'mixins/index': resolve(__dirname, 'src/mixins/index.ts'),
        'styles/shared/index': resolve(__dirname, 'src/styles/shared/index.ts'),
        'styles/tokens': resolve(__dirname, 'src/styles/tokens.ts')
      },
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'lit',
        'lit/decorators.js',
        'lit/directives/class-map.js',
        'lit/directives/style-map.js'
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js'
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  resolve: {
    alias: {
      '@sando/tokens/css': resolve(__dirname, '../tokens/dist/sando-tokens/css'),
      '@sando/tokens/ingredients': resolve(__dirname, '../tokens/dist/sando-tokens/ts/ingredients'),
      '@sando/tokens/flavors': resolve(__dirname, '../tokens/dist/sando-tokens/ts/flavors'),
      '@sando/tokens/recipes': resolve(__dirname, '../tokens/dist/sando-tokens/ts/recipes'),
      '@sando/tokens': resolve(__dirname, '../tokens/dist/sando-tokens')
    }
  }
});
