import { defineConfig } from 'vite';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  server: {
    fs: {
      allow: [
        join(__dirname, '..', '..'),
      ],
    },
  },
  resolve: {
    alias: {
      '@sando/tokens': join(__dirname, '..', '..', 'packages', 'tokens', 'dist', 'sando-tokens'),
      '@sando/components': join(__dirname, '..', '..', 'packages', 'components', 'src'),
    },
  },
});
